import { Checkbox, ChoiceGroup, CommandBarButton, DefaultButton, Dialog, DialogFooter, DialogType, IChoiceGroupOption, MessageBar, MessageBarType, PrimaryButton } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { IQuickLinkListProps } from './Actions';
import { buttonStyles } from './QuickLinkButton';

function updatePageLayout(siteUrl: string, serverRequestPath: string, layout: any) {

  fetch(siteUrl + '/_api/contextinfo', {
    method: 'POST',
    headers: {
      accept: 'application/json;odata=nometadata',
      'content-type': 'application/json;odata=nometadata',
      'X-ClientService-ClientTag': 'SPEDITOR'
    }
  })
    .then(response => response.json())
    .then((r) => {

      fetch(siteUrl + "/_api/web/getFileByServerRelativeUrl('" + serverRequestPath + "')/listItemAllFields", {
        method: 'POST',
        headers: {
          accept: 'application/json;odata=nometadata',
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': '*',
          'X-RequestDigest': r.FormDigestValue,
          'content-type': 'application/json;odata=nometadata',
          'X-ClientService-ClientTag': 'SPEDITOR'
        },
        body: JSON.stringify({
          PageLayoutType: layout
        })
      }).then(() => {
        return true
      })
    });
}

const ChangePageLayout = ({ plo, tabId, ctx }: IQuickLinkListProps) => {

  const options: IChoiceGroupOption[] = [
    { key: 'Home', text: 'Home' },
    { key: 'Article', text: 'Article' },
    { key: 'SingleWebPartAppPage', text: 'SingleWebPartAppPage' },
    { key: 'RepostPage', text: 'RepostPage', disabled: true },
    { key: 'HeaderlessSearchResults', text: 'HeaderlessSearchResults', disabled: true },
    { key: 'Spaces', text: 'Spaces', disabled: true },
    { key: 'Topic', text: 'Topic', disabled: true },
  ];
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Change pagelayout',
    subText: "Change the pagelayout of the current page. Enable `I know what I´m doing` for more pagelayouts.",
  };

  const [hideDialog, setHideDialog] = useState(true);
  const [showDisabled, setShowDisabled] = useState(false);
  const [selected, setSelected] = useState(plo.PageLayoutType);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }, [showSuccess])


  return (<>
    <CommandBarButton
      text={'Change pagelayout'}
      iconProps={{ iconName: 'Edit' }}
      styles={buttonStyles}
      disabled={!plo.PageLayoutType}
      onClick={() => setHideDialog(false)}
    />
    <Dialog
      hidden={hideDialog}
      onDismiss={() => setHideDialog(false)}
      dialogContentProps={dialogContentProps}
      modalProps={modelProps}>
      <ChoiceGroup
        defaultSelectedKey={plo.PageLayoutType}
        options={options.map((e) => !showDisabled ? e : { ...e, disabled: false })}
        onChange={(e, option) => setSelected(option!.key)}
      />
      <Checkbox styles={{ root: { marginTop: 10 } }}
        label="Enable more options please, I know what I'm doing!"
        onChange={(e, checked) => setShowDisabled(checked || false)}
        checked={showDisabled}
      />
      {showSuccess ? <MessageBar messageBarType={MessageBarType.success}>
        Pagelayout changed, reload the page.
      </MessageBar> : <div style={{ height: 32 }}></div>}
      <DialogFooter>
        <PrimaryButton onClick={() => chrome.scripting.executeScript({
          target: { tabId: tabId },
          world: 'MAIN',
          args: [ctx.webAbsoluteUrl, ctx.serverRequestPath, selected],
          func: updatePageLayout,
        }).then(injectionResults => {
          //console.log(injectionResults);
          setShowSuccess(true);
        })}
          text="Save"
          disabled={plo.PageLayoutType === selected} />
        <DefaultButton onClick={() => setHideDialog(true)} text="Close" />
      </DialogFooter>
    </Dialog>
  </>
  )
}

export default ChangePageLayout;