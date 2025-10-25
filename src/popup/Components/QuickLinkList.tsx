import {
  IScrollablePaneStyles,
  ISeparatorStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Separator,
} from '@fluentui/react';
import QuickLinkButton from './QuickLinkButton';
import coffee from '../../components/default-yellow.png';

export interface IQuickLinkListProps {
  ctx: any;
  appCatalogUrl: string;
  tabUrl: string;
}

const separatorStyles: ISeparatorStyles = {
  root: {
    fontWeight: 'bold',
  },
  content: undefined,
};

const scrollablePaneStyles: IScrollablePaneStyles = {
  root: {
    marginTop: 50,
  },
  stickyAbove: undefined,
  stickyBelow: undefined,
  stickyBelowItems: undefined,
  contentContainer: undefined,
};

const QuickLinkList = ({ ctx, appCatalogUrl, tabUrl }: IQuickLinkListProps) => {
  return ctx ? (
    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scrollablePaneStyles}>
      <Separator alignContent="start" styles={separatorStyles}>
        SPFx
      </Separator>
      <QuickLinkButton
        text={'Load debug manifest to current url'}
        iconName={'Code'}
        disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
        url={
          tabUrl
            ? tabUrl +
              (tabUrl.indexOf('?') > -1 ? '&' : '?') +
              'loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js'
            : ''
        }
        newWTab={false}
      />
      <QuickLinkButton
        text={'Load SPFx 1.21+ debug manifest to current url'}
        iconName={'Code'}
        disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
        url={
          tabUrl
            ? tabUrl +
              (tabUrl.indexOf('?') > -1 ? '&' : '?') +
              'loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/build/manifests.js'
            : ''
        }
        newWTab={false}
      />
      <QuickLinkButton
        text={'Remote workbench'}
        iconName={'Code'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/workbench.aspx' : ''}
      />
      <QuickLinkButton
        text={'Local workbench'}
        iconName={'Code'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={'https://localhost:4321/workbench'}
      />
      <Separator alignContent="start" styles={separatorStyles}>
        Tenant
      </Separator>
      <QuickLinkButton
        text={'Admin center'}
        iconName={'Admin'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              '/_layouts/15/online/AdminHome.aspx#/home'
            : ''
        }
      />
      <QuickLinkButton
        text={'User profiles'}
        iconName={'People'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              '/_layouts/15/tenantprofileadmin/manageuserprofileserviceapplication.aspx'
            : ''
        }
      />
      <QuickLinkButton
        text={'Term store'}
        iconName={'Tag'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              '/_layouts/15/online/AdminHome.aspx#/termStoreAdminCenter'
            : ''
        }
      />
      <QuickLinkButton
        text={'Search administration'}
        iconName={'Search'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              '/_layouts/15/searchadmin/TA_SearchAdministration.aspx'
            : ''
        }
      />
      <QuickLinkButton
        text={'API access'}
        iconName={'AzureAPIManagement'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              '/_layouts/15/online/AdminHome.aspx#/webApiPermissionManagement'
            : ''
        }
      />
      <QuickLinkButton
        text={'Teams admin'}
        iconName={'TeamsLogo'}
        disabled={false}
        url={'https://admin.teams.microsoft.com/dashboard'}
      />
      <QuickLinkButton
        text={'App catalog'}
        iconName={'AppIconDefaultList'}
        disabled={!appCatalogUrl}
        url={appCatalogUrl ? appCatalogUrl + '/_layouts/15/tenantAppCatalog.aspx/manageApps' : ''}
      />
      <QuickLinkButton
        text={'Classic app catalog'}
        iconName={'AppIconDefaultList'}
        disabled={!appCatalogUrl}
        url={appCatalogUrl ? appCatalogUrl + '/AppCatalog/Forms/AllItems.aspx' : ''}
      />
      <Separator alignContent="start" styles={separatorStyles}>
        Current site
      </Separator>
      <QuickLinkButton
        text={'Site settings'}
        iconName={'Settings'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx && ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/15/settings.aspx' : ''}
      />
      <QuickLinkButton
        text={'Tenant site settings'}
        iconName={'Settings'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl || !ctx.siteId}
        url={
          ctx && ctx.isSPO && ctx.portalUrl && ctx.siteId
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') +
              `/_layouts/15/online/AdminHome.aspx#/siteManagement/:/SiteDetails/${ctx.siteId.replace(
                /[{}]/g,
                ''
              )}/Settings`
            : ''
        }
      />
      <QuickLinkButton
        text={'Site contents'}
        iconName={'ThumbnailView'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx && ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/15/viewlsts.aspx' : ''}
      />
      <QuickLinkButton
        text={'Recycle bin'}
        iconName={'RecycleBin'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx && ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/15/AdminRecycleBin.aspx?view=5' : ''}
      />
      <QuickLinkButton
        text={'All People'}
        iconName={'People'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx && ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/people.aspx?MembershipGroupId=0' : ''}
      />
      <QuickLinkButton
        text={'Storage metrics'}
        iconName={'StackedBarChart'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={ctx && ctx.webAbsoluteUrl ? ctx.webAbsoluteUrl + '/_layouts/15/storman.aspx' : ''}
      />
      <Separator alignContent="start" styles={separatorStyles}>
        Current user
      </Separator>
      <QuickLinkButton
        text={'Edit user profile'}
        iconName={'EditContact'}
        disabled={!ctx || !ctx.isSPO || !ctx.portalUrl}
        url={
          ctx && ctx.isSPO && ctx.portalUrl
            ? ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-my.sharepoint.') +
              '_layouts/15/editprofile.aspx?UserSettingsProvider=dfb95e82-8132-404b-b693-25418fdac9b6'
            : ctx?.ProfileUrl || ''
        }
      />
      <QuickLinkButton
        text={'Login as another user'}
        iconName={'Signin'}
        disabled={!ctx || !ctx.webAbsoluteUrl}
        url={
          ctx && ctx.webAbsoluteUrl
            ? ctx.webAbsoluteUrl +
              '/_layouts/closeConnection.aspx?loginasanotheruser=true&source=' +
              encodeURIComponent(ctx.webAbsoluteUrl)
            : ''
        }
        newWTab={false}
      />
      <Separator alignContent="start" styles={separatorStyles}>
        Modes
      </Separator>
      <QuickLinkButton
        text={'?MaintenanceMode=true'}
        iconName={'Repair'}
        disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
        url={tabUrl ? tabUrl + (tabUrl.indexOf('?') > -1 ? '&' : '?') + 'maintenancemode=true' : ''}
      />
      <QuickLinkButton
        text={'?env=WebView'}
        iconName={'Repair'}
        disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
        url={tabUrl ? tabUrl + (tabUrl.indexOf('?') > -1 ? '&' : '?') + 'env=WebView' : ''}
      />
      <QuickLinkButton
        text={'?env=WebViewList'}
        iconName={'Repair'}
        disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
        url={tabUrl ? tabUrl + (tabUrl.indexOf('?') > -1 ? '&' : '?') + 'env=WebViewList' : ''}
      />
      <Separator alignContent="center" styles={separatorStyles}>
        Thanks!
      </Separator>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="https://buymeacoffee.com/speditor" target="_blank" rel="noopener noreferrer">
          <img src={coffee} alt="coffee" style={{ marginRight: '10px', height: '40px' }} />
        </a>
      </div>
    </ScrollablePane>
  ) : (
    <></>
  );
};

export default QuickLinkList;
