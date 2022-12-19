import { AuthenticationResult, BrowserUtils } from '@azure/msal-browser'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { CommandBar, Icon, IIconStyles, Persona, PersonaSize } from '@fluentui/react'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../../..'
import { IRootState } from '../../../store'
import { setEditPanel, setScopes, setUser } from '../../../store/graphsdkconsole/actions'
import { GraphClient } from '../../../services/graph-client/graph-client'

const GraphSDKCommands = () => {
  const dispatch = useDispatch()
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const iconStyles: Partial<IIconStyles> = { root: { marginRight: 5 } };

  const { spuoser } = useSelector(
    (state: IRootState) => state.graphsdkconsole,
  )

  return (
    <CommandBar
      items={[
        {
          key: 'Signin',
          text: 'Signin',
          iconProps: { iconName: 'Signin' },
          disabled: isAuthenticated,
          onClick: () => {
            (async () => {

              if (!isAuthenticated) {

                let response: AuthenticationResult;
                try {
                  response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0],
                  })
                }
                catch {
                  response = await instance.acquireTokenPopup({
                    ...loginRequest,
                    account: accounts[0],
                    prompt: 'select_account'
                  })
                }

                dispatch(setScopes(response.scopes))
                GraphClient.createInstance(instance, accounts[0])
              }

              var client = GraphClient.createInstance(instance, accounts[0])
              const org = await client.api('organization').get()
              const user = await client.api('me/profile').version('beta').get()
  
              var image: string;
              try {
                const photo = await client.api('me/photo/$value').version('beta').get()
                const buffer = await photo.arrayBuffer();
                const blob = new Blob([buffer], { type: 'image/jpeg' });
                image = URL.createObjectURL(blob)
              } catch (e) {
              }          
  
              var payload = {
                Name: user.names[0].displayName,
                Initials: '',
                TenantName: org.value[0].displayName,
                TenantId: org.value[0].id,
                userId: user.account[0].userPrincipalName,
                imageUrl: image
              }
              dispatch(setUser(payload))

            })();
          }
        },
        {
          key: 'Signout',
          text: 'Signout',
          iconProps: { iconName: 'Signout' },
          onClick: () => {
            instance.logoutRedirect({
              account: instance.getActiveAccount(),
              onRedirectNavigate: () => !BrowserUtils.isInIframe()
            })
            dispatch(setScopes([]))
            dispatch(setUser(undefined))

          },
          disabled: !isAuthenticated
        },
        {
          key: 'manageScopes',
          text: 'Manage Scopes',
          iconProps: { iconName: 'PageEdit' },
          onClick: () => {
            dispatch(setEditPanel(true))
          },
          disabled: !isAuthenticated,
        }
      ]}
      farItems={isAuthenticated ? [
        {
          key: 'app2',
          commandBarButtonAs: () => (<Persona
            imageInitials={spuoser?.Name?.split(" ").map((n) => n[0]).join("")}
            text={spuoser?.Name}
            optionalText={'kukkuu'}
            secondaryText={spuoser?.TenantName}
            imageUrl={spuoser?.imageUrl}
            size={PersonaSize.size40}
            imageAlt="Annie Lindqvist, status is away"
            onRenderSecondaryText={(props) => (
              <div>
                <Icon iconName="Globe" styles={iconStyles} />
                {props?.secondaryText}
              </div>
            )}
          />)
        },
      ] : []}
    />
  )
}

export default GraphSDKCommands
