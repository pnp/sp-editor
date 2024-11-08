import {
  CommandBarButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  IModalProps,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import { useState } from 'react';
import { IQuickLinkListProps } from '../Actions';
import { buttonStyles } from '../QuickLinkButton';
import {
  TranslationsStatus,
  TranslationsResponses,
} from './types';
import { getTranslations, updateTranslationValues } from './services';

const CommonIssuesLink = "https://support.microsoft.com/en-gb/office/create-multilingual-sharepoint-sites-pages-and-news-2bb7d610-5453-41c6-a0e8-6f40b3ed750c#bkmk_commonissues_1";

const UpdateTranslations = ({ plo, tabId, ctx }: IQuickLinkListProps) => {
  const modalProps: IModalProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps: IDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Update translations',    
    subText:
      'Translation pages can be displayed incorrectly in the News web part and Highlighted content web parts. You can use this action to remedy this common issue.',
    isMultiline: true
  };

  const [hideDialog, setHideDialog] = useState(true);
  const [status, setStatus] = useState<TranslationsStatus | undefined>(undefined)
  const [translations, setTranslations] = useState<TranslationsResponses | undefined>(undefined);


  return (
    <>
      <CommandBarButton
        text={'Update translations'}
        iconProps={{ iconName: 'LocaleLanguage' }}
        styles={buttonStyles}
        disabled={!plo.PageLayoutType}
        onClick={() => {
          setHideDialog(false);
          setStatus({
            pending: true
          })
          chrome.scripting
            .executeScript({
              target: { tabId },
              world: 'MAIN',
              func: getTranslations,
              args: [ctx.webAbsoluteUrl, plo.Id, ctx.pageListId],
            })
            .then((ir) => {
              if (ir[0].result) {
                if (!ir[0].result.error) {
                  setTranslations(ir[0].result as TranslationsResponses);
                  setStatus({
                    pending: false
                  })
                } else {
                  setStatus({
                    type: MessageBarType.error,
                    text: ir[0].result.error,
                    pending: true
                  })
                }
              }
            })
        }}
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={() => setHideDialog(true)}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <div style={{marginBottom: 20 }}>
        <Link href={CommonIssuesLink} target="_blank">See common issues</Link>
        </div>
        <TextField label="Translations API" readOnly value={translations?.translationsAPI?.join(', ')} />
        <TextField label="Item API (_SPTranslatedLanguages)" readOnly value={translations?.itemAPI?.join(', ')} />
        <TextField label="Search API (SPTranslatedLanguages)" readOnly value={translations?.searchAPI?.join(', ')} />
        {status ? (
          <MessageBar styles={{ root: { marginTop: 10, marginBottom: 10}}}messageBarType={status.type}>
            {status.text}
          </MessageBar>
        ) : (
          undefined
        )}
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              setStatus({
                pending: true
              })
              chrome.scripting
                .executeScript({
                  target: { tabId: tabId },
                  world: 'MAIN',
                  args: [ctx.webAbsoluteUrl, plo.Id],
                  func: updateTranslationValues,
                })
                .then((ir) => {
                  setStatus({
                    pending: false
                  })
                  if (ir[0].result === true) {
                    setStatus({
                      type: MessageBarType.success,
                      text: 'Translations updated!'
                    })
                  }
                });
            }}
            text="Update"
            disabled={status?.pending}
          />
          <DefaultButton onClick={() => setHideDialog(true)} text="Close" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateTranslations;
