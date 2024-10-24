import { CommandBarButton, IButtonStyles } from '@fluentui/react';

export interface IQuickLinkButtonProps {
  text: string,
  iconName: string,
  disabled: boolean,
  url: string
  newWTab?: boolean
}

export const buttonStyles: IButtonStyles = {
  root: {
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
};

const QuickLinkButton = ({ text, iconName, disabled, url, newWTab = true }: IQuickLinkButtonProps) => {
  return (
    <CommandBarButton
      text={text}
      iconProps={{ iconName: iconName }}
      styles={buttonStyles}
      disabled={disabled}
      onClick={() => newWTab ?
        chrome.tabs.create({ url: url }) :
        chrome.tabs.update({ url: url })}
    />
  )
}

export default QuickLinkButton
