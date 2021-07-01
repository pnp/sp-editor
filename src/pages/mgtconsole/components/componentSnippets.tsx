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
/* CTRL/CMD + D to render changes */
import React from 'react'
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
      key: 'login-templates',
      text: 'Login component with custom teplates',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'
import { Login, MgtTemplateProps } from '@microsoft/mgt-react'

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
  {
    option: {
      key: 'login-msal',
      text: 'Login component with msal configuration',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { LoginType, MsalProvider, MsalUserAgentApplicationConfig } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'
import { Login } from '@microsoft/mgt-react'
import { UserAgentApplication } from 'msal'

() => {

  const msalConf: MsalUserAgentApplicationConfig = {
    userAgentApplication: new UserAgentApplication({
      auth: {
        clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    }),
    loginType: LoginType.Popup,
    scopes: [
      'calendars.read',
      'user.read',
      'openid',
      'profile',
      'people.read',
      'user.readbasic.all',
    ],
  }

  Providers.globalProvider = new MsalProvider(msalConf)

  return (
    <Login className={'mgt-dark'} />
  )
}
`.trim(),
  },
  {
    option: {
      key: 'login-events',
      text: 'Login component events',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React, { useState } from 'react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'
import { Login } from '@microsoft/mgt-react'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  })

  const [events, setEvents] = useState([])

  const logEvent = (s: Event) => {
    setEvents((logs) => logs.concat(s.type))
  }

  const EventWriter = () => {
    return (
      <ol>
        {events.map((event) => (
          <li>{event}</li>
        ))}
      </ol>
    )
  }

  return (
    <>
      <Login
        className={'mgt-dark'}
        loginInitiated={logEvent}
        loginCompleted={logEvent}
        loginFailed={logEvent}
        logoutInitiated={logEvent}
        logoutCompleted={logEvent}
      />
      <EventWriter />
    </>
  )
}
`.trim(),
  },
  {
    option: {
      key: 'header-get',
      text: 'MGT Get samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'get-basic',
      text: 'Get component with "/me" resouce',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Get, Login } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
    scopes: [
      'user.read',
    ],
  });

  const Template = (props) => {
    const displayName = props.dataContext.displayName
    const formatted = JSON.stringify(props.dataContext, null, 2)
    return (
      <>
        <h3 style={{ color: 'palevioletred' }}>
          Hello {displayName}, this is your data.
        </h3>
        <pre style={{
          background: 'papayawhip',
          color: '#000',
          height: '100vh',
          width: '100vh',
          overflow: 'auto'
        }}>{formatted}</pre>
      </>
    )
  }

  return (
    <>
      <Login className={'mgt-dark'} />
      <Get className={'mgt-dark'} resource={"/me"}>
        <Template />
      </Get>
    </>
  )
}`.trim(),
  },
  {
    option: {
      key: 'header-person',
      text: 'MGT Person samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'person-basic',
      text: 'Person component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, Person } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <Person className={'mgt-dark'}
        personQuery={'me'}
        avatarSize={'large'}
        showPresence
      />
    </>
  )
}`.trim(),
  },
  {
    option: {
      key: 'header-people',
      text: 'MGT People samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'people-basic',
      text: 'People component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, People } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <People className={'mgt-dark'}
        showPresence
        showMax={3}
      />
    </>
  )
}`.trim(),
  },
  {
    option: {
      key: 'header-person-card',
      text: 'MGT Person card samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'person-card-basic',
      text: 'Person Card component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, PersonCard } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <PersonCard className={'mgt-dark'}
        personQuery={'me'}
        showPresence
      />
    </>
  )
}`.trim(),
  },
  {
    option: {
      key: 'header-people-picker',
      text: 'MGT People picker samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'people-picker-basic',
      text: 'People Picker component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { PeoplePicker, People, Login } from '@microsoft/mgt-react';
import { LoginType, MsalProvider } from '@microsoft/mgt';
import { Providers } from '@microsoft/mgt-element';

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <PeoplePicker className={'mgt-dark'} />
    </>
  )
}`.trim(),
  },
  {
    option: {
      key: 'people-picker-selected',
      text: 'People Picker component with People component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React, { useState } from "react"
import { PeoplePicker, People, Login } from '@microsoft/mgt-react';
import { LoginType, MsalProvider } from '@microsoft/mgt';
import { Providers } from '@microsoft/mgt-element';

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  const [people, setPeople] = useState([]);

  const SelectedPeople = () => (
    <h4 style={{ color: 'palevioetred' }}>
      Selected people:
    </h4>
  )

  const handleSelectionChanged = (e) => {
    setPeople(e.target.selectedPeople);
  };

  return (
    <>
      <Login
        className={'mgt-dark'}
      />
      <PeoplePicker
        className={'mgt-dark'}
        selectionChanged={handleSelectionChanged}
      />
      {
        people.length > 0 &&
        <div>
          <SelectedPeople />
          <People className={'mgt-dark'} people={people} />
        </div>
      }
    </>
  )
}`.trim(),
  },

  {
    option: {
      key: 'header-teams-channel-picker',
      text: 'MGT Teams Channel Picker samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'teams-channel-picker-basic',
      text: 'Teams Channel Picker component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, TeamsChannelPicker } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <TeamsChannelPicker className={'mgt-dark'}
      />
    </>
  )
}`.trim(),
  },

  {
    option: {
      key: 'header-agenda',
      text: 'MGT Agenda component samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'agenda-basic',
      text: 'Agenda component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, Agenda } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <Agenda className={'mgt-dark'} />
    </>
  )
}`.trim(),
  },

  {
    option: {
      key: 'header-tasks',
      text: 'MGT Tasks component samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'tasks-basic',
      text: 'Tasks component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, Tasks } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <Tasks className={'mgt-dark'} />
    </>
  )
}`.trim(),
  },

  {
    option: {
      key: 'header-todo',
      text: 'MGT Todo component samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'todo-basic',
      text: 'Todo component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'
import { Login, Todo } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  return (
    <>
      <Login className={'mgt-dark'} />
      <Todo className={'mgt-dark'} />
    </>
  )
}`.trim(),
  },

  {
    option: {
      key: 'header-filelist',
      text: 'MGT File and FileList component samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'todo-filelist',
      text: 'File and FileList component',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React, { useState } from 'react'
import { Login, FileList, File, ViewType } from '@microsoft/mgt-react'
import { LoginType, MsalProvider } from '@microsoft/mgt'
import { Providers } from '@microsoft/mgt-element'

() => {

  const [file, setFile] = useState(null);

  Providers.globalProvider = new MsalProvider({
    clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
    loginType: LoginType.Popup,
  });

  const selectItem = (selectedFile: any) => {
    setFile(selectedFile.detail)
  }

  return (
    <div className={'mgt-dark'}>
      <Login />
      <FileList itemClick={selectItem} />
      <File fileDetails={file} view={ViewType.threelines} />
    </div>
  )
}`.trim(),
  },

  {
    option: {
      key: 'class-components',
      text: 'Class Component samples',
      itemType: SelectableOptionMenuItemType.Header,
    },
  },
  {
    option: {
      key: 'class-component-timer',
      text: 'Class Component timer',
      itemType: SelectableOptionMenuItemType.Normal,
    },
    snippet: `
/* CTRL/CMD + D to render changes */
import React from 'react'

interface CounterProps {}

interface CounterState {
  count: number
}

class Counter extends React.Component<CounterProps, CounterState> {
  private interval: number

  constructor(props: CounterProps) {
    super(props)
    this.state = { count: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => ({ count: state.count + 1 }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <h3>{this.state.count}</h3>
  }
}`.trim(),
  },
]
