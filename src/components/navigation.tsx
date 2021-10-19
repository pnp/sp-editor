import { FontIcon, Nav, ScrollablePane, TooltipDelay, TooltipHost } from '@fluentui/react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import { DarkCustomizations, DefaultCustomizations } from '@uifabric/theme-samples'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { IRootState } from '../store'
import { setDarkMode, setLoading, setTheme } from '../store/home/actions'

export const FabricNav = withRouter(({ history }: RouteComponentProps) => {

  const dispatch = useDispatch()

  const navLinks = [
    {
      name: 'Home',
      url: '/',
      key: 'key1',
    },
    {
      name: 'Scriptlinks',
      url: '/scriptlinks',
      key: 'key2',
    },
    {
      name: 'PnP JS Console',
      url: '/pnpjsconsole',
      key: 'key3',
    },
    {
      name: 'Graph SDK Console',
      url: '/graphsdkconsole',
      key: 'key4',
    },
    {
      name: 'MGT React Playground',
      url: '/mgtconsole',
      key: 'key17',
      disabled: false,
    },
    {
      name: 'Web Properties',
      url: '/webproperties',
      key: 'key5',
    },
    {
      name: 'List Properties',
      url: '/listproperties',
      key: 'key6',
      disabled: false,
    },
    {
      name: 'SP Shooter',
      url: '/spshooter',
      key: 'key7',
      disabled: false,
    },
    {
      name: 'Webhooks',
      url: '/webhooks',
      key: 'key8',
      disabled: false,
    },
    {
      name: 'File Explorer',
      url: '/FileExplorer',
      key: 'key9',
      disabled: true,
    },
    {
      name: 'Search',
      url: '/search',
      key: 'key10',
      disabled: true,
    },
    {
      name: 'Page editor',
      url: '/pageeditor',
      key: 'key11',
      disabled: true,
    },
    {
      name: 'File editor',
      url: '/fileeditor',
      key: 'key12',
      disabled: true,
    },
    {
      name: 'Modern properties',
      url: '/modernproperties',
      key: 'key13',
      disabled: true,
    },
    {
      name: 'Site designs',
      url: '/sitedesigns',
      key: 'key14',
      disabled: true,
    },
    {
      name: 'Site scripts',
      url: '/sitescripts',
      key: 'key15',
      disabled: true,
    },
    {
      name: 'App catalog',
      url: '/appcatalog',
      key: 'key16',
      disabled: true,
    },
  ]

  const currentLink = navLinks.find(x => x.url === history.location.pathname)
  const [selectedKey, setSelectedKey] = useState(currentLink?.key ?? 'key1')
  const { isDark } = useSelector((state: IRootState) => state.home)

  const toggleDarkTheme = () => {
    document.body.classList.toggle('dark', !isDark)
    dispatch(setTheme(!isDark ? DarkCustomizations : DefaultCustomizations))
    dispatch(setDarkMode(!isDark))
  }

  return (
    <IonMenu contentId='main'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
            <TooltipHost content={!isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode'} delay={TooltipDelay.zero} >
              <IonToggle onClick={toggleDarkTheme} color='success' checked={isDark}/>
            </TooltipHost>
            <TooltipHost content='Reload SP Editor' delay={TooltipDelay.zero} >
              <IonButton onClick={() => document.location.reload()}>
                <FontIcon iconName='Refresh' />
              </IonButton>
            </TooltipHost>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class='no-scroll' no-bounce>
      <ScrollablePane>
        <Nav
          selectedKey={selectedKey}
          onLinkClick={(event, element) => {
            if (event && element) {
              const menu = document.querySelector('ion-menu') as any
              menu && menu.close()
              event.preventDefault()
              if (element.key && selectedKey !== element.key) {
                dispatch(setLoading(false))
                history.push(element.url)
                setSelectedKey(element.key)
              }
            }
          }}
          groups={[
            {
              links: navLinks,
            },
          ]}
        />
        </ScrollablePane>
      </IonContent>
    </IonMenu>
  )
})
