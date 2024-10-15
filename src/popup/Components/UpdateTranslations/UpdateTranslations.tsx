import {
  CommandBarButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { IQuickLinkListProps } from '../Actions';
import { buttonStyles } from '../QuickLinkButton';
import {
  TranslationsResponses,
} from './types';
import { getTranslations, updateTranslationValues } from './services';

const CommonIssuesLink = "https://support.microsoft.com/en-gb/office/create-multilingual-sharepoint-sites-pages-and-news-2bb7d610-5453-41c6-a0e8-6f40b3ed750c#bkmk_commonissues_1";

const UpdateTranslations = ({ plo, tabId, ctx }: IQuickLinkListProps) => {
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Update translations',
    subText:
      'Translation pages can be displayed incorrectly in the News web part and Highlighted content web parts. You can use this action to call updateTranslationLanguages API to remedy this common issue.',
  };

  const [hideDialog, setHideDialog] = useState(true);
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [translations, setTranslations] = useState<TranslationsResponses | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, [showSuccess]);

  return (
    <>
      <CommandBarButton
        text={'Update translations'}
        iconProps={{ iconName: 'LocaleLanguage' }}
        styles={buttonStyles}
        disabled={!plo.PageLayoutType}
        onClick={() => {
          setHideDialog(false);
          setPending(true);
          chrome.scripting
            .executeScript({
              target: { tabId },
              world: 'MAIN',
              func: getTranslations,
              args: [ctx.webAbsoluteUrl, plo.Id, ctx.pageListId],
            })
            .then((ir) => {
              if (ir[0].result && ir[0].result.isTranslationMasterPage) {
                setPending(false);
                setTranslations(ir[0].result);
              } else {
                setShowError(true);
              }
            });
        }}
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={() => setHideDialog(true)}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <Link href={CommonIssuesLink}>See documentation about common issues</Link>
        <TextField label="Translations API" readOnly value={translations?.translationsAPI?.join(', ')} />
        <TextField label="Item API - _SPTranslatedLanguages" readOnly value={translations?.itemAPI?.join(', ')} />
        <TextField label="Search API - SPTranslatedLanguages" readOnly value={translations?.searchAPI?.join(', ')} />
        {showSuccess ? (
          <MessageBar messageBarType={MessageBarType.success}>
            Called updateTranslationLanguages API successfully.
          </MessageBar>
        ) : (
          <div style={{ height: 32 }}></div>
        )}
        {showError ? (
          <MessageBar messageBarType={MessageBarType.error}>
            This functionality can only be used when translations are enabled and on the original page.
          </MessageBar>
        ) : undefined}
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              setPending(true);
              chrome.scripting
                .executeScript({
                  target: { tabId: tabId },
                  world: 'MAIN',
                  args: [ctx.webAbsoluteUrl, plo.Id],
                  func: updateTranslationValues,
                })
                .then((ir) => {
                  setPending(false);
                  if (ir[0].result === true) {
                    setShowSuccess(true);
                  }
                });
            }}
            text="Update"
            disabled={pending}
          />
          <DefaultButton onClick={() => setHideDialog(true)} text="Close" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateTranslations;
