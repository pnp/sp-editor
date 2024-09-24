import {
  CommandBarButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { IQuickLinkListProps } from './Actions';
import { buttonStyles } from './QuickLinkButton';
import {
  TranslationsSearchAPIResponse,
  TranslationsItemAPIResponse,
  TranslationsAPIResponse,
  TranslationsResponses,
} from './types';

async function getTranslations(siteUrl: string, pageId: number, pageListId: string): Promise<TranslationsResponses> {
  //return "This is broken";
  const DEFAULTHEADERS = {
    accept: 'application/json;odata=nometadata',
    'content-type': 'application/json;odata=nometadata',
    'X-ClientService-ClientTag': 'SPEDITOR',
  };

  const translationsAPI: TranslationsAPIResponse = await fetch(
    siteUrl + `/_api/sitepages/pages(${pageId})/translations`,
    {
      method: 'GET',
      headers: DEFAULTHEADERS,
    }
  ).then((response) => response.json());

  const itemAPI: TranslationsItemAPIResponse = await fetch(
    siteUrl + `/_api/web/lists('${pageListId}')/items(${pageId})?$select=OData__SPTranslatedLanguages,UniqueId`,
    {
      method: 'GET',
      headers: DEFAULTHEADERS,
    }
  ).then((response) => response.json());

  const searchAPI: TranslationsSearchAPIResponse = await fetch(
    siteUrl +
      `/_api/search/query?querytext='NormUniqueID:${itemAPI.UniqueId}'&selectproperties='SPTranslatedLanguages'`,
    {
      method: 'GET',
      headers: DEFAULTHEADERS,
    }
  ).then((response) => response.json());

  const languagesFromSearch = searchAPI.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells.filter(
    (c) => c.Key === 'SPTranslatedLanguages'
  )[0].Value.split(' ');

  return {
    translationsAPI: translationsAPI.Items.map((i) => i.Culture),
    itemAPI: itemAPI.OData__SPTranslatedLanguages,
    searchAPI: languagesFromSearch,
  } as any;
  // const pagesAPI = await fetch(siteUrl + `_api/sitepages/pages(${pageId})?$select=`, { method: 'GET', headers: DEFAULTHEADERS })

  // return "Miksi et toimi" as any;
}

async function updateTranslationValues(siteUrl: string, pageId: number) {
  const DEFAULTHEADERS = {
    accept: 'application/json;odata=nometadata',
    'content-type': 'application/json;odata=nometadata',
    'X-ClientService-ClientTag': 'SPEDITOR',
  };

  const ctxInfo = await fetch(siteUrl + '/_api/contextinfo', {
    method: 'POST',
    headers: DEFAULTHEADERS,
  }).then((response) => response.json());
  const requestDigest = ctxInfo.FormDigestValue;

  await fetch(siteUrl + `/_api/sitepages/pages(${pageId})/translations/updateTranslationLanguages`, {
    method: 'POST',
    headers: { 'X-RequestDigest': requestDigest, ...DEFAULTHEADERS },
  }).then((response) => response.json());
  return true;
}

const UpdateTranslations = ({ plo, tabId, ctx }: IQuickLinkListProps) => {
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Update translations',
    subText:
      'Translation data can get out of sync. You can use this action to call updateTranslationLanguages API to remedy this issue.',
  };

  const [hideDialog, setHideDialog] = useState(true);
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
            setPending(false);
            if (ir[0].result) {
              setTranslations(ir[0].result);
            }
          });
          }
        }
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={() => setHideDialog(true)}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <TextField label="Translations API" readOnly value={translations?.translationsAPI?.join(', ')} />
        <TextField label="Item API - _SPTranslatedLanguages" readOnly value={translations?.itemAPI?.join(', ')} />
        <TextField label="Search API - SPTranslatedLanguages" readOnly value={translations?.searchAPI?.join(', ')} />
        {showSuccess ? (
          <MessageBar messageBarType={MessageBarType.success}>Called updateTranslationLanguages API successfully.</MessageBar>
        ) : (
          <div style={{ height: 32 }}></div>
        )}
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
