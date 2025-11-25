import { CommandBarButton, DefaultButton, Dialog, DialogFooter, DialogType, MessageBar, MessageBarType, Stack, Text } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { IQuickLinkListProps } from './Actions';
import { buttonStyles } from './QuickLinkButton';

function fetchSitePermissions(hostname: string, siteId: string, webId: string) {
  const apiUrl = `https://${hostname}/_api/v2.1/sites/${hostname},${siteId},${webId}/permissions`;

  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-ClientService-ClientTag': 'SPEDITOR'
    },
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch permissions: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => data.value || [])
    .catch(err => {
      throw err;
    });
}

const SitesSelectedPermissions = ({ plo, tabId, ctx }: IQuickLinkListProps) => {

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 600 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Site Selected Permissions',
    subText: "Applications with permissions to access this site.",
  };

  const [hideDialog, setHideDialog] = useState(true);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hideDialog && ctx) {
      loadPermissions();
    }
  }, [hideDialog, ctx]);

  const loadPermissions = async () => {
    if (!ctx?.siteId || !ctx?.webId) {
      setError('Site ID or Web ID not available');
      return;
    }

    if (!ctx?.webAbsoluteUrl) {
      setError('Web absolute URL not available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract hostname from context
      const hostname = new URL(ctx.webAbsoluteUrl).hostname;
      
      if (!hostname) {
        throw new Error('Failed to extract hostname from URL');
      }

      // Execute the fetch in the page context
      const results = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        world: 'MAIN',
        args: [hostname, ctx.siteId, ctx.webId],
        func: fetchSitePermissions,
      });

      if (results && results[0] && results[0].result) {
        setPermissions(results[0].result);
      } else {
        setPermissions([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch permissions');
      console.error('Error fetching site permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <CommandBarButton
      text={'Select Sites Permissions'}
      iconProps={{ iconName: 'Permissions' }}
      styles={buttonStyles}
      onClick={() => setHideDialog(false)}
    />
    <Dialog
      hidden={hideDialog}
      onDismiss={() => setHideDialog(true)}
      dialogContentProps={dialogContentProps}
      modalProps={modelProps}>

      {loading && <MessageBar messageBarType={MessageBarType.info}>Loading permissions...</MessageBar>}
      
      {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

      {!loading && !error && permissions.length === 0 && (
        <MessageBar messageBarType={MessageBarType.warning}>No permissions found</MessageBar>
      )}

      {!loading && permissions.length > 0 && (
        <Stack tokens={{ childrenGap: 12 }} styles={{ root: { marginTop: 16, maxHeight: '400px', overflowY: 'auto' } }}>
          {permissions.map((permission, index) => {
            const app = permission.grantedToIdentities?.[0]?.application;
            return (
              <Stack key={index}>
                <Stack tokens={{ childrenGap: 8 }}>
                  <Text variant="medium" styles={{ root: { fontWeight: 600, color: '#323130' } }}>
                    {app?.displayName || 'Unknown Application'}
                  </Text>
                  <Stack tokens={{ childrenGap: 4 }}>
                    <Text variant="small" styles={{ root: { color: '#605e5c', fontWeight: 600 } }}>
                      Application ID:
                    </Text>
                    <Text variant="small" styles={{ root: { color: '#323130', fontFamily: 'monospace', fontSize: '11px' } }}>
                      {app?.id || 'N/A'}
                    </Text>
                  </Stack>
                  <Stack tokens={{ childrenGap: 4 }}>
                    <Text variant="small" styles={{ root: { color: '#605e5c', fontWeight: 600 } }}>
                      Roles:
                    </Text>
                    <Text variant="small" styles={{ root: { color: '#323130' } }}>
                      {permission.roles?.join(', ') || 'No roles assigned'}
                    </Text>
                  </Stack>
                </Stack>
                {index < permissions.length - 1 && (
                  <div style={{ 
                    borderBottom: '1px solid #edebe9', 
                    marginTop: '12px' 
                  }} />
                )}
              </Stack>
            );
          })}
        </Stack>
      )}

      <DialogFooter>
        <DefaultButton onClick={() => setHideDialog(true)} text="Close" />
      </DialogFooter>
    </Dialog>
  </>
  )
}

export default SitesSelectedPermissions;