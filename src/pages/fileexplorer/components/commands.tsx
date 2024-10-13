import { AuthenticationResult, BrowserUtils } from '@azure/msal-browser';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import {
  CommandBar,
  ContextualMenuItemType,
  Icon,
  IIconStyles,
  Text,
  ITextProps,
  Persona,
  PersonaSize,
  Toggle,
  TooltipDelay,
  TooltipHost,
  VerticalDivider,
  Breadcrumb,
  CommandButton,
  IContextualMenuProps,
  IBreadcrumbItem,
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
} from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../..';
import { IRootState } from '../../../store';
import { setEditPanel, setScopes, setUser } from '../../../store/graphsdkconsole/actions';
import { GraphClient } from '../../../services/graph-client/graph-client';
import { IonToggle } from '@ionic/react';
import { MessageBarColors } from '../../../store/home/types';
import * as rootActions from '../../../store/home/actions';
import { useState } from 'react';
import { addFolder, removeFolder, updateFileContent } from '../chrome/chrome-actions';
import { IFile } from '../../../store/fileexplorer/types';

const FileEditorCommands = () => {
  const dispatch = useDispatch();
  const { selectedFile, selectedFolder, webServerRelativeUrl } = useSelector(
    (state: IRootState) => state.fileexplorer
  );

  const [showCreateFileDialog, setShowCreateFileDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [showUploadFileDialog, setShowUploadFileDialog] = useState(false);
  const [showDeleteFileDialog, setShowDeleteFileDialog] = useState(false);

  const iconStyles: Partial<IIconStyles> = { root: { marginRight: 5 } };
  /*const processedUrl = selectedFolder?.ServerRelativeUrl.startsWith('/sites')
  ? selectedFolder.ServerRelativeUrl.split('/').slice(3).join('/')
  : selectedFolder?.ServerRelativeUrl;*/
  const relativeUrl = selectedFolder?.ServerRelativeUrl
    ? selectedFolder.ServerRelativeUrl.split('/')
    : webServerRelativeUrl.split('/');

  if (webServerRelativeUrl === '/') {
    relativeUrl.unshift('root');
  }

  function downloadFile() {
    const filename = selectedFile?.ServerRelativeUrl.split('/').pop();
    const extension = filename!.split('.').pop();
    const url = `data:text/${extension};base64, ${btoa(selectedFile?.content || '')}`;

    chrome.downloads
      .download({
        url: url,
        filename: filename,
      })
      .then(() => {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: 'File downloaded successfully!',
            color: MessageBarColors.success,
          })
        );
      })
      .catch((error) => {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: 'File download failed!',
            color: MessageBarColors.danger,
          })
        );
      });
  }

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'newfile',
        text: 'Create File',
        iconProps: { iconName: 'PageAdd' },
        onClick: () => setShowCreateFileDialog(true),
        //'data-automation-id': 'newEmailButton', // optional
      },
      {
        key: 'newfolder',
        text: 'Create Folder',
        iconProps: { iconName: 'FabricNewFolder' },
        onClick: () => addFolder(dispatch, selectedFolder as IFile, 'NewFolder'),
      },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      {
        key: 'deletefolder',
        text: 'Delete Folder',
        iconProps: { iconName: 'Delete' },
        onClick: () => {
          if (selectedFolder && selectedFolder.parentFile) {
            removeFolder(dispatch, selectedFolder as IFile);
          }
        },
        disabled: !selectedFolder || !selectedFolder.parentFile,
      },
      // {
      //   key: 'upload',
      //   text: 'Upload file',
      //   iconProps: { iconName: 'Upload' },
      //   onClick: () => setShowUploadFileDialog(true),
      // },
    ],
    // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
    // shouldFocusOnMount: false
  };
  
  return (
    <>
      <CommandBar
        items={[
          {
            key: 'save',
            text: 'Save',
            iconProps: { iconName: 'Save' },
            onClick: () => updateFileContent(dispatch, selectedFile as IFile, selectedFile?.content || ''),
            disabled: !selectedFile || selectedFile?.content === selectedFile?.loadedContent,
          },
          {
            key: 'delete',
            text: 'Delete',
            iconProps: { iconName: 'Delete' },
            onClick: () => setShowDeleteFileDialog(true),
            disabled: !selectedFile,
          },
          // { key: 'divider1', itemType: ContextualMenuItemType.Divider, onRender: () => <VerticalDivider /> },
          // {
          //   key: 'checkout',
          //   text: 'Check out',
          //   iconProps: { iconName: 'PageCheckedOut' },
          //   onClick: () => {},
          //   disabled: !selectedFile,
          // },
          // {
          //   key: 'checkin',
          //   text: 'Check in',
          //   iconProps: { iconName: 'PageCheckedIn' },
          //   onClick: () => {},
          //   disabled: !selectedFile,
          // },
        ]}
        farItems={[
          {
            key: 'download',
            text: 'Download file',
            iconProps: { iconName: 'Download' },
            onClick: () => downloadFile(),
            disabled: !selectedFile,
          },
          // {
          //   key: 'showpanel',
          //   onRender: () => (
          //     <TooltipHost content={'Show details panel'} delay={TooltipDelay.zero}>
          //       <IonToggle color="success" style={{ marginTop: '16px', marginLeft: '6px' }}/>
          //     </TooltipHost>
          //   ),
          // },

          /* {
          key: 'app2',
          commandBarButtonAs: () => (<Persona
            imageInitials={spuoser?.Name?.split(" ").map((n) => n[0]).join("")}
            text={spuoser?.Name}
            optionalText={'kukkuu'}
            secondaryText={spuoser?.TenantName}
            imageUrl={spuoser?.imageUrl}
            size={PersonaSize.size40}
            imageAlt="Annie Lindqvist, status is away"
            onRenderSecondaryText={(props) => (
              <div>
                <Icon iconName="Globe" styles={iconStyles} />
                {props?.secondaryText}
              </div>
            )}
          />)
        },*/
        ]}
      />
      <Breadcrumb
        styles={{ root: { marginLeft: '28px', marginTop: '0px', marginBottom: '5px' } }}
        items={[
          ...relativeUrl
            .filter((part) => part) // Filter out empty parts
            .map((part, index, arr) => {
              const isLastItem = index === arr.length - 1;
              return {
                target: '_blank',
                text: part, // Use part directly since empty parts are filtered out
                key: part + index, // Unique key for each breadcrumb item
                href:
                  selectedFolder && isLastItem && index !== 0
                    ? `${selectedFolder.portalUrl}/${selectedFolder.ServerRelativeUrl}`
                    : undefined, // Only add href for the last item
              } as IBreadcrumbItem;
            }),
          {
            key: 'commandButton',
            text: 'New', // Add the text property to conform to IBreadcrumbItem
            onRender: () => (
              <span>
                <CommandButton iconProps={{ iconName: 'Add' }} text="New" menuProps={menuProps} />
              </span>
            ),
          } as IBreadcrumbItem,
        ]}
      />
      <Dialog
        hidden={!showCreateFileDialog}
        // onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        // modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Create" />
          <DefaultButton onClick={() => setShowCreateFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showCreateFolderDialog}
        // onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        // modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Create" />
          <DefaultButton onClick={() => setShowCreateFolderDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showUploadFileDialog}
        // onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        // modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Upload" />
          <DefaultButton onClick={() => setShowUploadFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showDeleteFileDialog}
        // onDismiss={toggleHideDialog}
        // dialogContentProps={dialogContentProps}
        // modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Delete" />
          <DefaultButton onClick={() => setShowDeleteFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FileEditorCommands;
