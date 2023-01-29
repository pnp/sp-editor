import * as React from 'react';

import { useId } from '@fluentui/react-hooks';
import { classNamesFunction, IButton, ITagItemProps, ITagItemStyleProps, ITagItemStyles, styled } from '@fluentui/react';
import { getStyles } from '@fluentui/react/lib/components/pickers/TagPicker/TagItem.styles';

const getClassNames = classNamesFunction<ITagItemStyleProps, ITagItemStyles>();

/**
 * {@docCategory TagPicker}
 */
export const TagItemBase = (props: ITagItemProps) => {
  const {
    theme,
    styles,
    selected,
    disabled,
    enableTagFocusInDisabledPicker,
    children,
    className,
    index,
    title = typeof props.children === 'string' ? props.children : props.item.name,
  } = props;

  const buttonRef = React.createRef<IButton>();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    buttonRef.current?.focus();
  };

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected,
    disabled,
  });

  const itemId = useId();

  const disabledAttrs = enableTagFocusInDisabledPicker
    ? {
        'aria-disabled': disabled,
        tabindex: 0,
      }
    : {
        disabled: disabled,
      };

  return (
    <div data-selection-index={index} className={classNames.root} role={'listitem'} key={index} onClick={handleClick}>
      <span className={classNames.text} title={title} id={`${itemId}-text`}>
        {children}
      </span>
    </div>
  );
};

export const TagItemCustom = styled<ITagItemProps, ITagItemStyleProps, ITagItemStyles>(TagItemBase, getStyles, undefined, {
  scope: 'TagItemCustom',
});
