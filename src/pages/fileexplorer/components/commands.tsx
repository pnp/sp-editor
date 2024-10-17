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
} from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { MessageBarColors } from '../../../store/home/types';
import * as rootActions from '../../../store/home/actions';
import { useState } from 'react';
import { addFolder, removeFolder } from '../chrome/chrome-actions';
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

  const relativeUrl = selectedFolder?.ServerRelativeUrl
    ? selectedFolder.ServerRelativeUrl.split('/')
    : webServerRelativeUrl.split('/');

  if (webServerRelativeUrl === '/') {
    relativeUrl.unshift('rootSite');
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
      },
      {
        key: 'newfolder',
        text: 'Create Folder',
        iconProps: { iconName: 'FabricNewFolder' },
        onClick: () => addFolder(dispatch, selectedFolder as IFile, 'NewFolder'),
      },
      {
        key: 'openfolder',
        text: 'Open in SharePoint',
        iconProps: { iconName: 'OpenInNewTab' },
        onClick: () => {
          if (selectedFolder?.portalUrl && selectedFolder?.ServerRelativeUrl) {
            const url = `${selectedFolder.portalUrl}${selectedFolder.ServerRelativeUrl.replace(/^\//, '')}`;
            chrome.tabs.create({ url: url });
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
            removeFolder(dispatch, selectedFolder as IFile);
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
        hidden={!showCreateFileDialog}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Create" />
          <DefaultButton onClick={() => setShowCreateFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showCreateFolderDialog}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Create" />
          <DefaultButton onClick={() => setShowCreateFolderDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showUploadFileDialog}
      >
        <DialogFooter>
          <PrimaryButton /*onClick={toggleHideDialog}*/ text="Upload" />
          <DefaultButton onClick={() => setShowUploadFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={!showDeleteFileDialog}
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
