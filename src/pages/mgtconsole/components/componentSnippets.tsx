import { SelectableOptionMenuItemType } from '@fluentui/react'

export const componentSnippets = [
  {
    option: {
      key: 'header-login',
      text: 'MGT Login samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'login',
      text: 'Login component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
import React from "react"
import { Login } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <Login className={'mgt-dark'} />
  )
}`.trim(),
  },
  {
    option: {
      key: 'login-tepmlates',
      text: 'Login component with custom teplates',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'
import { Login, MgtTemplateProps } from '@microsoft/mgt-react'
import React from 'react'

() => {
  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  })

  const SignedOutButton = (props: MgtTemplateProps) => {
    return (
      <button
        style={{
          backgroundColor: '#00b894',
          fontWeight: 'bold',
          padding: '10px',
          margin: '15px 0',
          border: 'transparent',
          borderRadius: '5px',
          outline: 'none',
          fontSize: '100%',
        }}
      >
        Login
      </button>
    )
  }

  const SignedInButton = (props: MgtTemplateProps) => {
    const { personDetails } = props.dataContext
    const imgStyles = {
      width: 40,
      height: 40,
    }
    return (
      <>
        <div>
          <img src={personDetails.personImage} style={imgStyles} />
          <div></div>
          {personDetails.displayName}
        </div>
      </>
    )
  }

  const FlyOutDetails = (props: MgtTemplateProps) => {
    const { personDetails } = props.dataContext
    const imgStyles = {
      width: 60,
      height: 60,
    }
    return (
      <>
        <div>{personDetails.displayName}</div>
        <div>
          <img src={personDetails.personImage} style={imgStyles} />
        </div>
        <div>{personDetails.mail}</div>
      </>
    )
  }

  const FlyOutCommands = (props: MgtTemplateProps) => {
    const { handleSignOut } = props.dataContext
    return (
      <a onClick={handleSignOut} style={{ cursor: 'pointer' }}>
        Click me to signout
      </a>
    )
  }

  return (
    <Login className={'mgt-dark'}>
      <SignedOutButton template='signed-out-button-content' />
      <SignedInButton template='signed-in-button-content' />
      <FlyOutDetails template='flyout-person-details' />
      <FlyOutCommands template='flyout-commands' />
    </Login>
  )
}
`.trim(),
  },
]
