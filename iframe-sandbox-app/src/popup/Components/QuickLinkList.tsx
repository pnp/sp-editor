import { IScrollablePaneStyles, ISeparatorStyles, ScrollablePane, ScrollbarVisibility, Separator } from '@fluentui/react';
import QuickLinkButton from './QuickLinkButton';

export interface IQuickLinkListProps {
  ctx: any,
  appCatalogUrl: string,
  tabUrl: string
}

const separatorStyles: ISeparatorStyles = {
  root: {
    fontWeight: 'bold'
  },
  content: undefined
}

const scrollablePaneStyles: IScrollablePaneStyles = {
  root: {
    marginTop: 50
  },
  stickyAbove: undefined,
  stickyBelow: undefined,
  stickyBelowItems: undefined,
  contentContainer: undefined
}

const QuickLinkList = ({ ctx, appCatalogUrl, tabUrl }: IQuickLinkListProps) => {

  return (
    ctx ?
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scrollablePaneStyles}>
        <Separator alignContent="start" styles={separatorStyles}>Tenant</Separator>
        <QuickLinkButton
          text={'Admin center'}
          iconName={'Admin'}
          disabled={!ctx || !ctx.portalUrl}
          url={ctx.isSPO && ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') + "/_layouts/15/online/AdminHome.aspx#/home"}
        />
        <QuickLinkButton
          text={'User profiles'}
          iconName={'People'}
          disabled={!ctx || !ctx.portalUrl}
          url={ctx.isSPO && ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') + "/_layouts/15/tenantprofileadmin/manageuserprofileserviceapplication.aspx"}
        />
        <QuickLinkButton
          text={'Term store'}
          iconName={'Tag'}
          disabled={!ctx || !ctx.portalUrl}
          url={ctx.isSPO && ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') + "/_layouts/15/online/AdminHome.aspx#/termStoreAdminCenter"}
        />
        <QuickLinkButton
          text={'Search administration'}
          iconName={'Search'}
          disabled={!ctx || !ctx.portalUrl}
          url={ctx.isSPO && ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-admin.sharepoint.') + "/_layouts/15/searchadmin/TA_SearchAdministration.aspx"}
        />
        <QuickLinkButton
          text={'App catalog'}
          iconName={'AppIconDefaultList'}
          disabled={!appCatalogUrl}
          url={appCatalogUrl + '/_layouts/15/tenantAppCatalog.aspx/manageApps'}
        />
        <QuickLinkButton
          text={'Classic app catalog'}
          iconName={'AppIconDefaultList'}
          disabled={!appCatalogUrl}
          url={appCatalogUrl + '/AppCatalog/Forms/AllItems.aspx'}
        />
        <Separator alignContent="start" styles={separatorStyles}>Current site</Separator>
        <QuickLinkButton
          text={'Site settings'}
          iconName={'Settings'}
          disabled={!ctx || !ctx.webAbsoluteUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/15/settings.aspx"}
        />
        <QuickLinkButton
          text={'Site contents'}
          iconName={'ThumbnailView'}
          disabled={!ctx || !ctx.webAbsoluteUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/15/viewlsts.aspx"}
        />
        <QuickLinkButton
          text={'Recycle bin'}
          iconName={'RecycleBin'}
          disabled={!ctx || !ctx.webAbsoluteUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/15/AdminRecycleBin.aspx?view=5"}
        />
        <QuickLinkButton
          text={'All People'}
          iconName={'People'}
          disabled={!ctx || !ctx.webAbsoluteUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/people.aspx?MembershipGroupId=0"}
        />
        <Separator alignContent="start" styles={separatorStyles}>Current user</Separator>
        <QuickLinkButton
          text={'Edit user profile'}
          iconName={'EditContact'}
          disabled={!ctx}
          url={ctx.isSPO ? ctx.portalUrl && ctx.portalUrl.toLocaleLowerCase().replace('.sharepoint.', '-my.sharepoint.') + "_layouts/15/editprofile.aspx?UserSettingsProvider=dfb95e82-8132-404b-b693-25418fdac9b6" : ctx.ProfileUrl }
        />
        <QuickLinkButton
          text={'Login as another user'}
          iconName={'Signin'}
          disabled={!ctx || !ctx.webAbsoluteUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/closeConnection.aspx?loginasanotheruser=true&source=" + encodeURIComponent(ctx.webAbsoluteUrl)}
          newWTab={false}
        />
        <Separator alignContent="start" styles={separatorStyles} >SPFx</Separator>
        <QuickLinkButton
          text={'Load debug manifest to current url'}
          iconName={'Code'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={tabUrl + (tabUrl && tabUrl.indexOf('?') > -1 ? '&' : '?') + "loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js"}
          newWTab={false}
        />
        <QuickLinkButton
          text={'Remote workbench'}
          iconName={'Code'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={ctx.webAbsoluteUrl + "/_layouts/workbench.aspx"}
        />
        <QuickLinkButton
          text={'Local workbench'}
          iconName={'Code'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={"https://localhost:4321/workbench"}
        />
        <Separator alignContent="start" styles={separatorStyles} >Modes</Separator>
        <QuickLinkButton
          text={'?MaintenanceMode=true'}
          iconName={'Repair'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={tabUrl + (tabUrl && tabUrl.indexOf('?') > -1 ? '&' : '?') + "maintenancemode=true"}
        />
        <QuickLinkButton
          text={'?env=WebView'}
          iconName={'Repair'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={tabUrl + (tabUrl && tabUrl.indexOf('?') > -1 ? '&' : '?') + "env=WebView"}
        />
        <QuickLinkButton
          text={'?env=WebViewList'}
          iconName={'Repair'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={tabUrl + (tabUrl && tabUrl.indexOf('?') > -1 ? '&' : '?') + "env=WebViewList"}
        />
        <QuickLinkButton
          text={'?disable3PCode=1'}
          iconName={'Repair'}
          disabled={!ctx || !ctx.webAbsoluteUrl || !tabUrl}
          url={tabUrl + (tabUrl && tabUrl.indexOf('?') > -1 ? '&' : '?') + "disable3PCode=1"}
        />
      </ScrollablePane>
      : <></>
  )
}

export default QuickLinkList
