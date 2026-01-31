import { CommandBarButton, IButtonStyles } from '@fluentui/react';
import { trackPopupLinkClick } from '../../services/analytics';

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

// Convert text to a snake_case link name for tracking
const toLinkName = (text: string): string => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const QuickLinkButton = ({ text, iconName, disabled, url, newWTab = true }: IQuickLinkButtonProps) => {
  return (
    <CommandBarButton
      text={text}
      iconProps={{ iconName: iconName }}
      styles={buttonStyles}
      disabled={disabled}
      onClick={() => {
        trackPopupLinkClick(toLinkName(text));
        newWTab ?
          chrome.tabs.create({ url: url }) :
          chrome.tabs.update({ url: url })
      }}
    />
  )
}

export default QuickLinkButton
