import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

// Note: LogLevel and ContentSource are defined inline because this runs in chrome context
// and cannot use imports from the store

export interface ICrawlLogParams {
  logLevel: number; // -1=All, 0=Success, 1=Warning, 2=Error
  contentSource: string; // 'Sites' or 'UserProfiles'
  rowLimit: number;
  filter: string;
  startDate: string;
  endDate: string;
}

export const getCrawlLog = (params: ICrawlLogParams, extPath: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    // if we are in a modern page we need to get the _spPageContextInfo from the module loader
    if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
      (window as any).moduleLoaderPromise.then((e: any) => {
        (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
      });
    }

    function SPSoapHandler() {
      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse(),
          pnpsp.RequestDigest()
        );

        // fix url for SOAP call
        instance.on.pre.prepend(async (url, init, result) => {
          if (url.indexOf('/_vti_bin/client.svc/ProcessQuery') > -1) {
            url = url.replace(/_api.*_vti_bin/, '_vti_bin');
          }
          return [url, init, result];
        });
        return instance;
      };
    }

    let digest: string = '';

    const SPEditor = (props?: SP.ISPBrowserProps) => {
      return (instance: Queryable.Queryable) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse()
        );

        instance.on.pre.prepend(async (url, init, result) => {
          url = props?.baseUrl
            ? new URL(url, props.baseUrl.endsWith('/') ? props.baseUrl : props.baseUrl + '/').toString()
            : url;

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const modifiedUrl = url.toString().replace(/_api.*|_vti_.*/g, '');
              const response = await fetch(`${modifiedUrl}_api/contextinfo`, {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              });
              const data = await response.json();
              digest = data.d.GetContextWebInformation.FormDigestValue;
            }

            init.headers = {
              'X-RequestDigest': digest,
              ...init.headers,
            };
          }

          return [url, init, result];
        });
        return instance;
      };
    };

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(SPEditor({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(SPSoapHandler())
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      );

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response
        .clone()
        .json()
        .then((error: any) => {
          return {
            success: false,
            result: null,
            errorMessage: error.error.message.value,
            source: 'chrome-sp-editor',
          };
        });
    });

    pnplogging.Logger.subscribe(listener);

    // Check if we're on the admin site - DocumentCrawlLog only works from admin site
    const currentUrl = (window as any)._spPageContextInfo.webAbsoluteUrl || '';
    const isAdminSite = currentUrl.includes('-admin.sharepoint.');

    if (!isAdminSite) {
      const tenantMatch = currentUrl.match(/https:\/\/([^.-]+)/);
      const tenant = tenantMatch ? tenantMatch[1] : '<tenant>';
      return {
        success: false,
        entries: [],
        errorMessage: `Crawl Log is only available from the SharePoint Admin Center. ` +
          `Please open the DevTools on your tenant admin site ` +
          `(https://${tenant}-admin.sharepoint.com) and try again.\n\n` +
          `You also need crawl log permissions: ` +
          `https://${tenant}-admin.sharepoint.com/_layouts/15/searchadmin/crawllogreadpermission.aspx`,
      };
    }

    // Get the host name for filter construction
    const getHostName = (): string => {
      const url = new URL((window as any)._spPageContextInfo.webAbsoluteUrl);
      return url.hostname
        .replace('-admin', '')
        .replace('-public', '')
        .replace('-my', '')
        .replace(/\.sharepoint\.(com|us|de|cn)$/, '');
    };

    // Get SharePoint domain suffix
    const getDomainSuffix = (): string => {
      const url = new URL((window as any)._spPageContextInfo.webAbsoluteUrl);
      const match = url.hostname.match(/\.sharepoint\.(\w+)$/);
      return match ? match[1] : 'com';
    };

    const hostName = getHostName();
    const domainSuffix = getDomainSuffix();

    // Build the filter if not provided
    // For UserProfiles, PnP PowerShell first discovers the contentSourceId using sps3s:// protocol
    let urlFilter = params.filter;
    let postFilter = ''; // For post-query filtering (used with UserProfiles)
    let originalRowLimit = params.rowLimit;
    let effectiveRowLimit = params.rowLimit;
    let contentSourceId = -1; // -1 means all content sources
    
    if (!urlFilter && params.contentSource === 'Sites') {
      urlFilter = `https://${hostName}.sharepoint.${domainSuffix}`;
    }
    
    // For UserProfiles, we need to first discover the contentSourceId
    // by querying with sps3s:// protocol, then use that ID in the main query
    const discoverContentSourceId = (): Promise<number> => {
      if (params.contentSource !== 'UserProfiles') {
        return Promise.resolve(-1);
      }
      
      const discoveryPayload = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
  <Actions>
    <ObjectPath Id="2" ObjectPathId="1" />
    <ObjectPath Id="4" ObjectPathId="3" />
    <ObjectPath Id="6" ObjectPathId="5" />
    <Query Id="7" ObjectPathId="5">
      <Query SelectAllProperties="true">
        <Properties />
      </Query>
    </Query>
    <Method Name="GetCrawledUrls" Id="8" ObjectPathId="5">
      <Parameters>
        <Parameter Type="Boolean">false</Parameter>
        <Parameter Type="Int64">100</Parameter>
        <Parameter Type="String">sps3s://${hostName}-my.sharepoint.${domainSuffix}</Parameter>
        <Parameter Type="Boolean">true</Parameter>
        <Parameter Type="Int32">-1</Parameter>
        <Parameter Type="Int32">-1</Parameter>
        <Parameter Type="Int32">-1</Parameter>
        <Parameter Type="DateTime">${new Date('2020-01-01').toISOString()}</Parameter>
        <Parameter Type="DateTime">${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}</Parameter>
      </Parameters>
    </Method>
  </Actions>
  <ObjectPaths>
    <StaticProperty Id="1" TypeId="{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}" Name="Current" />
    <Property Id="3" ParentId="1" Name="Site" />
    <Constructor Id="5" TypeId="{5c5cfd42-0712-4c00-ae49-23b33ba34ecc}">
      <Parameters>
        <Parameter ObjectPathId="3" />
      </Parameters>
    </Constructor>
  </ObjectPaths>
</Request>`;

      return pnpsp
        .spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: discoveryPayload })
        .then((r: any) => {
          // Find the result with rows
          for (const item of r) {
            if (item && (item.Rows || item._Child_Items_)) {
              const rows = item.Rows || item._Child_Items_ || [];
              if (rows.length > 0) {
                const csId = parseInt(rows[0].ContentSourceID || rows[0].ContentSourceId || '-1', 10);
                return csId;
              }
            }
          }
          return -1;
        })
        .catch(() => -1);
    };
    
    if (params.contentSource === 'UserProfiles') {
      // Save user's filter for post-filtering
      postFilter = params.filter || '';
      // Use https:// with -my domain (the contentSourceId will filter to profiles)
      urlFilter = `https://${hostName}-my.sharepoint.${domainSuffix}`;
      effectiveRowLimit = 100000; // Fetch max, then filter
    }

    // Map LogLevel to API values
    const logLevelValue = params.logLevel;

    // Format dates for CSOM
    const startDateStr = params.startDate;
    const endDateStr = params.endDate;

    // Helper function to escape XML special characters
    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // Build CSOM request XML for DocumentCrawlLog.GetCrawledUrls
    // TypeId for Site: {3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}
    // TypeId for DocumentCrawlLog: {5c5cfd42-0712-4c00-ae49-23b33ba34ecc}
    const buildPayload = (csId: number) => `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPEditor" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
  <Actions>
    <ObjectPath Id="2" ObjectPathId="1" />
    <ObjectPath Id="4" ObjectPathId="3" />
    <ObjectPath Id="6" ObjectPathId="5" />
    <Query Id="7" ObjectPathId="5">
      <Query SelectAllProperties="true">
        <Properties />
      </Query>
    </Query>
    <Method Name="GetCrawledUrls" Id="8" ObjectPathId="5">
      <Parameters>
        <Parameter Type="Boolean">false</Parameter>
        <Parameter Type="Int64">${effectiveRowLimit}</Parameter>
        <Parameter Type="String">${escapeXml(urlFilter || '')}</Parameter>
        <Parameter Type="Boolean">true</Parameter>
        <Parameter Type="Int32">${csId}</Parameter>
        <Parameter Type="Int32">${logLevelValue}</Parameter>
        <Parameter Type="Int32">-1</Parameter>
        <Parameter Type="DateTime">${startDateStr}</Parameter>
        <Parameter Type="DateTime">${endDateStr}</Parameter>
      </Parameters>
    </Method>
  </Actions>
  <ObjectPaths>
    <StaticProperty Id="1" TypeId="{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}" Name="Current" />
    <Property Id="3" ParentId="1" Name="Site" />
    <Constructor Id="5" TypeId="{5c5cfd42-0712-4c00-ae49-23b33ba34ecc}">
      <Parameters>
        <Parameter ObjectPathId="3" />
      </Parameters>
    </Constructor>
  </ObjectPaths>
</Request>`;

    // First discover contentSourceId if needed, then run main query
    return discoverContentSourceId().then((discoveredCsId: number) => {
      contentSourceId = discoveredCsId;
      const payload = buildPayload(contentSourceId);
      
      return pnpsp
        .spPost(pnpsp.Web(sp.web, `/_vti_bin/client.svc/ProcessQuery`), { body: payload })
        .then((r: any) => {
          // Check for errors in response
          if (r[0]?.ErrorInfo?.ErrorMessage) {
            return {
              success: false,
              entries: [],
              errorMessage: r[0].ErrorInfo.ErrorMessage,
          };
        }

        // Find the result object with Rows data
        // The response is an array, and we need to find the object with the crawl data
        let crawlData: any = null;
        for (const item of r) {
          if (item && item.Rows) {
            crawlData = item;
            break;
          }
          if (item && item._Child_Items_) {
            crawlData = item;
            break;
          }
        }

        if (!crawlData) {
          return {
            success: true,
            entries: [],
            totalCount: 0,
          };
        }

        const rows = crawlData.Rows || crawlData._Child_Items_ || [];

        // Helper function to parse SharePoint date format \/Date(timestamp)\/
        // Returns ISO string instead of Date object for proper serialization
        const parseSpDate = (dateStr: any): string => {
          if (!dateStr) return new Date().toISOString();
          if (dateStr instanceof Date) return dateStr.toISOString();
          if (typeof dateStr === 'string') {
            // Handle \/Date(timestamp)\/ format
            const match = dateStr.match(/\/Date\((\d+)\)\//);
            if (match) {
              return new Date(parseInt(match[1], 10)).toISOString();
            }
            // Handle \/Date(year,month,day,hour,min,sec,ms)\/ format
            const match2 = dateStr.match(/\/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)\//);
            if (match2) {
              return new Date(
                parseInt(match2[1], 10),
                parseInt(match2[2], 10),
                parseInt(match2[3], 10),
                parseInt(match2[4], 10),
                parseInt(match2[5], 10),
                parseInt(match2[6], 10),
                parseInt(match2[7], 10)
              ).toISOString();
            }
            // Try parsing as ISO string
            const parsed = Date.parse(dateStr);
            if (!isNaN(parsed)) {
              return new Date(parsed).toISOString();
            }
          }
          return new Date().toISOString();
        };

        const entries = rows.map((row: any) => {
          // Map to ICrawlEntry format
          // LogLevel from ErrorLevel: 0=Success, 1=Warning, 2=Error
          // But if there's any status message OR error code != 0, treat as Warning (per PnP PowerShell)
          const errorLevel = parseInt(row.ErrorLevel || '0', 10);
          const errorCode = parseInt(row.ErrorCode || '0', 10);
          const statusMessage = (row.StatusMessage || '') + (row.ErrorDesc || '');
          
          // Start with ErrorLevel, but override to Warning if there's status text or error code
          let logLevel = errorLevel;
          if (statusMessage !== '' || errorCode !== 0) {
            // Per PnP PowerShell: if status is not empty OR errorCode != 0, set to Warning
            if (logLevel === 0) {
              logLevel = 1; // Warning
            }
          }

          // Parse item time from file time if available - return as ISO string
          let itemTime: string | undefined;
          const lastModified = row.LastRepositoryModifiedTime;
          if (lastModified) {
            const ticks = parseInt(lastModified, 10);
            if (ticks !== 0) {
              try {
                // Convert from Windows file time
                itemTime = new Date(ticks / 10000 - 11644473600000).toISOString();
              } catch {
                // Ignore parse errors
              }
            }
          }

          // Parse GUIDs from /Guid(...)\/ format
          const parseGuid = (guidStr: any): string | undefined => {
            if (!guidStr) return undefined;
            const match = String(guidStr).match(/\/Guid\(([^)]+)\)\//i);
            return match ? match[1] : String(guidStr);
          };

          return {
            ItemId: parseInt(row.URLID || row.UrlId || row.DocID || '0', 10),
            ContentSourceId: parseInt(row.ContentSourceID || row.ContentSourceId || '-1', 10),
            Url: (row.FullUrl || row.Url || '').replace(/\\u002f/g, '/'),
            CrawlTime: parseSpDate(row.TimeStampUtc || row.TimeStamp),
            ItemTime: itemTime,
            LogLevel: logLevel,
            Status: statusMessage,
            IsDeleted: row.IsDeleted || false,
            NoIndex: row.NoIndex || false,
            ErrorCode: parseInt(row.ErrorCode || '0', 10),
            ChildrenCount: parseInt(row.ChildrenCount || '0', 10),
            DatabaseName: row.DatabaseName || undefined,
            SiteId: parseGuid(row.SiteID),
            WebId: parseGuid(row.WebID),
            ParentDocId: parseInt(row.ParentDocID || '0', 10) || undefined,
            AccessData: row.AccessData || undefined,
            RawData: row,
          };
        });

        // Filter for UserProfiles if needed
        let filteredEntries = entries;
        if (params.contentSource === 'UserProfiles') {
          // Per PnP PowerShell: when contentSourceId is -1, filter for :443/person URLs
          // This filters to just Person.aspx profile pages
          if (contentSourceId === -1) {
            filteredEntries = filteredEntries.filter((e: any) => {
              const decodedUrl = decodeURIComponent(e.Url).toLowerCase();
              return decodedUrl.includes(':443/person');
            });
          }
          
          // Apply user's filter as post-filter for UserProfiles
          if (postFilter) {
            filteredEntries = filteredEntries.filter((e: any) =>
              decodeURIComponent(e.Url).toLowerCase().includes(postFilter.toLowerCase())
            );
          }
        }

        // Sort by crawl time descending
        filteredEntries.sort((a: any, b: any) =>
          new Date(b.CrawlTime).getTime() - new Date(a.CrawlTime).getTime()
        );

        return {
          success: true,
          entries: filteredEntries.slice(0, originalRowLimit),
          totalCount: entries.length,
        };
      })
      .catch((error: any) => {
        const tenantMatch = currentUrl.match(/https:\/\/([^.-]+)/);
        const tenant = tenantMatch ? tenantMatch[1] : '<tenant>';
        return {
          success: false,
          entries: [],
          errorMessage:
            error.message ||
            `Failed to retrieve crawl log. Make sure you have access to the crawl log via the SharePoint search admin center at https://${tenant}-admin.sharepoint.com/_layouts/15/searchadmin/crawllogreadpermission.aspx`,
        };
      });
    }); // Close discoverContentSourceId().then()
  });

  function moduleLoader(extPath: string) {
    type libTypes = [typeof SP, typeof Logging, typeof Queryable];
    /*** load systemjs ***/
    return new Promise<libTypes>((resolve) => {
      const s = document.createElement('script');
      s.src = extPath + 'bundles/system.js';
      (document.head || document.documentElement).appendChild(s);
      s.onload = () =>
        /*** load pnpjs modules ***/
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          // if we are in a modern page we need to get the _spPageContextInfo from the module loader
          if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
            (window as any).moduleLoaderPromise.then((e: any) => {
              (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
              resolve(modules);
            });
          } else {
            resolve(modules);
          }
        });
    });
  }
};
