import { useMsal } from '@azure/msal-react'
import {
  IBasePicker,
  IOverlayProps,
  ITag,
  ITagItemProps,
  Label,
  Panel,
  PanelType,
  PrimaryButton,
  TagPicker,
} from '@fluentui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setEditPanel, setScopes } from '../../../store/graphsdkconsole/actions'
import { useId } from '@fluentui/react-hooks';
import { TagItemCustom } from './tag'
import someJson from '../utils/permissions'

const GraphMSALPanel = () => {

  const { editpanel } = useSelector((state: IRootState) => state.graphsdkconsole)

  const dispatch = useDispatch()

  const { isDark } = useSelector((state: IRootState) => state.home)
  const { scopes } = useSelector((state: IRootState) => state.graphsdkconsole)

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }

  const [localScopes, setLocalScopes] = useState<string>(scopes.join(', '))

  const { instance, accounts } = useMsal();

  const picker = useRef<IBasePicker<ITag>>(null);

  let selectedTags: ITag[] 

  selectedTags = scopes.map(item => ({ key: item, name: item[0].toUpperCase() + item.slice(1)}));

  useEffect(() => {
    setLocalScopes(scopes.join(',\r\n'))
  }, [editpanel, scopes])

  useEffect(() => {
    selectedTags = scopes.map(item => ({ key: item, name: item[0].toUpperCase() + item.slice(1)}));
  }, [scopes])

  const testTags2: ITag[] = someJson.delegatedScopesList.map(item => ({ key: item.value, name: item.value }));

  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    var tags = tagList.concat(selectedTags)
    if (!tags || !tags.length || tags.length === 0) {
      return false;
    }
    return tags.concat(selectedTags).some(compareTag => compareTag.key.toString().toLowerCase() === tag.key.toString().toLowerCase());
  };

  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? testTags2.filter(
        tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList),
      )
      : [];
  };

  const _onRenderNewFooterContent = () => {

    return (
      <PrimaryButton
        onClick={async () => {

          if (picker.current.items.length > 0) {
            const response = await instance.acquireTokenPopup({
              account: accounts[0],
              prompt: 'consent',
              scopes: picker.current.items.map(x => x.key as string),
            })
            dispatch(setScopes(response.scopes))
            picker.current.items.length = 0;
          }

        }
        }
        style={{ marginRight: '8px' }}
        text={'Consent'}
      />
    )
  }

  const consentedId = useId('consented-picker');
  const newScopesId = useId('new-scopes-picker');

  const getTextFromItem = (item: ITag) => item.name;

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => { dispatch(setEditPanel(false)) }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText='Manage Scopes'
      closeButtonAriaLabel='Close'
      overlayProps={panelOverlayProps}
      onRenderFooterContent={_onRenderNewFooterContent}
    >
      <Label htmlFor={consentedId}>Consented Permissions:</Label>
      <TagPicker
       selectedItems={selectedTags}
        onRenderItem={(props: ITagItemProps) => <TagItemCustom { ...props }>{props.item.name}</TagItemCustom>}
        disabled
        onResolveSuggestions={(filter: string, selectedItems?: ITag[]): ITag[] | PromiseLike<ITag[]> => {
          throw new Error('Function not implemented.')
        }}
        inputProps={{
          id: consentedId,
        }}
      />

      <Label htmlFor={newScopesId}>Add New Permissions:</Label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected scopes"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerCalloutProps={{ doNotLayer: true, hidden: true }}
        inputProps={{
          id: newScopesId,
        }}
        componentRef={picker}
      />
    </Panel >
  )
}

export default GraphMSALPanel
