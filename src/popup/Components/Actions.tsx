import {
  IScrollablePaneStyles,
  ISeparatorStyles,
  ScrollablePane,
  ScrollbarVisibility,
  Separator,
} from '@fluentui/react';
import ChangePageLayout from './ChangePageLayout';
import UpdateTranslations from './UpdateTranslations/UpdateTranslations';
import SitesSelectedPermissions from './SitesSelectedPermissions';

export interface IQuickLinkListProps {
  ctx: any;
  plo: any;
  tabId: number;
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
const Actions = ({ ctx, plo, tabId }: IQuickLinkListProps) => {
  return ctx && plo ? (
    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scrollablePaneStyles}>
      <Separator alignContent="start" styles={separatorStyles}>
        Page actions
      </Separator>
      <ChangePageLayout ctx={ctx} plo={plo} tabId={tabId} />
      <UpdateTranslations ctx={ctx} plo={plo} tabId={tabId} />
      <SitesSelectedPermissions ctx={ctx} plo={plo} tabId={tabId} />
    </ScrollablePane>
  ) : (
    <></>
  );
};

export default Actions;
