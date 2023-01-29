import { Checkbox, ChoiceGroup, CommandBarButton, DefaultButton, Dialog, DialogFooter, DialogType, IChoiceGroupOption, IScrollablePaneStyles, ISeparatorStyles, MessageBar, MessageBarType, PrimaryButton, ScrollablePane, ScrollbarVisibility, Separator } from '@fluentui/react';
import { useEffect, useState } from 'react';
import ChangePageLayout from './ChangePageLayout';
import QuickLinkButton, { buttonStyles } from './QuickLinkButton';

export interface IQuickLinkListProps {
  ctx: any,
  plo: any,
  tabId: number,
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
const Actions = ({ ctx, plo, tabId }: IQuickLinkListProps) => {

  return (
    ctx && plo ?
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scrollablePaneStyles}>
        <Separator alignContent="start" styles={separatorStyles}>Page actions</Separator>
        <ChangePageLayout ctx={ctx} plo={plo} tabId={tabId} />
      </ScrollablePane>
      : <></>
  )
}

export default Actions
