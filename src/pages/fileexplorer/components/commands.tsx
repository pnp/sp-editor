import {
  ContextualMenuItemType,
  Breadcrumb,
  CommandButton,
  IContextualMenuProps,
  IBreadcrumbItem,
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  TextField,
  DialogType,
  Text
} from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { useState } from 'react';
import { addFile, addFolder, removeFolder } from '../chrome/chrome-actions';
import { IFile } from '../../../store/fileexplorer/types';

const FileEditorCommands = () => {
  const dispatch = useDispatch();
  const { selectedFolder, webServerRelativeUrl } = useSelector(
    (state: IRootState) => state.fileexplorer
  );

  const [showCreateFileDialog, setShowCreateFileDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [showDeleteFolderDialog, setShowDeleteFolderDialog] = useState(false);

  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');

  const relativeUrl = selectedFolder?.ServerRelativeUrl
    ? selectedFolder.ServerRelativeUrl.split('/')
    : webServerRelativeUrl.split('/');

  if (webServerRelativeUrl === '/') {
    relativeUrl.unshift('rootSite');
  }

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'newfile',
        text: 'Create File',
        iconProps: { iconName: 'PageAdd' },
        onClick: () => setShowCreateFileDialog(true),
      },
      {
        key: 'newfolder',
        text: 'Create Folder',
        iconProps: { iconName: 'FabricNewFolder' },
        onClick: () => setShowCreateFolderDialog(true)
      },
      {
        key: 'openfolder',
        text: 'Open in SharePoint',
        iconProps: { iconName: 'OpenInNewTab' },
        onClick: () => {
          if (selectedFolder?.portalUrl && selectedFolder?.ServerRelativeUrl) {
            const url = `${selectedFolder.portalUrl}${selectedFolder.ServerRelativeUrl.replace(/^\//, '')}`;
            
            // Detect if running in Firefox
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            
            if (isFirefox) {
              // Firefox: Send message to background script (DevTools panel can't access tabs API)
              chrome.runtime.sendMessage({
                type: 'OPEN_TAB',
                url: url
              }).catch((error) => {
                console.error('Failed to send message to background:', error);
              });
            } else {
              // Chrome: Direct tab creation (works from DevTools panel)
              chrome.tabs.create({ url: url });
            }
          }
        },
      },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      {
        key: 'deletefolder',
        text: 'Delete Folder',
        iconProps: { iconName: 'Delete' },
        onClick: () => {
          if (selectedFolder && selectedFolder.parentFile) {
            setShowDeleteFolderDialog(true)
          }
        },
        disabled: !selectedFolder || !selectedFolder.parentFile,
      },
    ],
  };
  
  return (
    <>
      <Breadcrumb
        styles={{ root: { marginLeft: '28px', marginTop: '0px', marginBottom: '5px' } }}
        items={[
          ...relativeUrl
            .filter((part) => part) // Filter out empty parts
            .map((part, index, arr) => {
              const isLastItem = index === arr.length - 1;
              return {
                onRender: isLastItem
                  ? () => (
                      <span>
                        <CommandButton
                          text={part}
                          menuProps={menuProps}
                          styles={{
                            root: {
                              fontSize: '18px', // Adjust the font size as needed
                            },
                          }}
                        />
                      </span>
                    )
                  : undefined,
                text: part, // Use part directly since empty parts are filtered out
                key: part + index, // Unique key for each breadcrumb item
              } as IBreadcrumbItem;
            }),
        ]}
      />
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Create new file',
          closeButtonAriaLabel: 'Close',
        }}
        hidden={!showCreateFileDialog}
      >
        <TextField label="File name" value={fileName} onChange={(e, newValue) => setFileName(newValue || '')} />
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              addFile(dispatch, selectedFolder as IFile, fileName);
              setFileName('');
              setShowCreateFileDialog(false);
            }}
            text="Create"
            disabled={!fileName}
          />{' '}
          <DefaultButton
            onClick={() => {
              setShowCreateFileDialog(false);
              setFileName('');
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Create folder',
          closeButtonAriaLabel: 'Close',
        }}
        hidden={!showCreateFolderDialog}
      >
        <TextField label="Folder name" value={folderName} onChange={(e, newValue) => setFolderName(newValue || '')} />
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              addFolder(dispatch, selectedFolder as IFile, folderName);
              setFolderName('');
              setShowCreateFolderDialog(false);
            }}
            text="Create"
            disabled={!folderName}
          />
          <DefaultButton
            onClick={() => {
              setFolderName('');
              setShowCreateFolderDialog(false);
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete folder',
          closeButtonAriaLabel: 'Close',
          subText: 'Are you sure you want to delete this folder?',
        }}
        hidden={!showDeleteFolderDialog}
      >
        <Text>{selectedFolder?.ServerRelativeUrl}</Text>

        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              removeFolder(dispatch, selectedFolder as IFile);
              setShowDeleteFolderDialog(false);
            }}
            text="Delete"
          />
          <DefaultButton onClick={() => setShowDeleteFolderDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FileEditorCommands;
