import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@vscode/codicons/dist/codicon.css';
import { Text, CommandBar, DefaultButton, Dialog, DialogFooter, PrimaryButton, ScrollablePane, ScrollbarVisibility, Stack, DialogType } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { getAllFiles, getFile, removeFile, updateFileContent } from '../chrome/chrome-actions';
import { IFile } from '../../../store/fileexplorer/types';
import * as actions from '../../../store/fileexplorer/actions';
import * as rootActions from '../../../store/home/actions';
import { MessageBarColors } from '../../../store/home/types';
import { setSelectedFileContent } from '../../../store/fileexplorer/actions';

const FolderTree: React.FC = () => {
  const { isDark } = useSelector((state: IRootState) => state.home);
  const dispatch = useDispatch();

  const { files, selectedFile, selectedFolder } = useSelector((state: IRootState) => state.fileexplorer);

  const fileEditorDiv = useRef<null | HTMLDivElement>(null);
  const fileEditorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

  const [showDeleteFileDialog, setShowDeleteFileDialog] = useState(false);

  function getLanguageFromExtension(selectedFile: IFile | undefined) {
    let language = 'plaintext';
    switch (selectedFile?.ServerRelativeUrl?.split('.').pop()) {
      case 'js':
        language = 'javascript';
        break;
      case 'themedcss':
      case 'preview':
      case 'css':
        language = 'css';
        break;
      case 'html':
      case 'master':
      case 'aspx':
        language = 'html';
        break;
      case 'xoml':
      case 'rules':
      case 'spfont':
      case 'spcolor':
      case 'xsl':
      case 'xml':
      case 'xaml':
      case 'svg':
      case 'webpart':
      case 'dwp':
        language = 'xml';
        break;
      case 'json':
        language = 'json';
        break;
      default:
        language = 'plainText';
        break;
    }
    return language;
  }

  // load initial data
  useEffect(() => {
    if (files.length === 0) {
      getAllFiles(dispatch);
    }
    const model = fileEditorRef.current?.getModel();
    if (model && selectedFile) {
      monaco.editor.setModelLanguage(model, 'plaintext');
      fileEditorRef.current?.setValue(selectedFile.content || '');
      fileEditorRef?.current?.setScrollTop(0);
      fileEditorRef?.current?.setScrollLeft(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFolder = (selected: IFile) => {
    if (selected.id === 'root') {
      //dispatch(actions.updateToggle(selected.id));
    } else {
      if (!selected.toggled) {
        getAllFiles(dispatch, selected.id, selected.webId, selected.type, selected.ServerRelativeUrl);
      } else {
        dispatch(actions.updateToggle(selected.id));
      }
    }
    dispatch(actions.setSelectedFolder(selected));
  };

  useEffect(() => {
    let language = getLanguageFromExtension(selectedFile);
    const model = fileEditorRef.current?.getModel();
    if (!selectedFile) {
      fileEditorRef.current?.setValue('');
    } else if (model && selectedFile) {
      monaco.editor.setModelLanguage(model, language);
      fileEditorRef.current?.setValue(selectedFile.content || '');
    }
    fileEditorRef?.current?.setScrollTop(0);
    fileEditorRef?.current?.setScrollLeft(0);
  }, [selectedFile?.id]);

  const renderTree = (nodes: IFile[]): JSX.Element[] => {
    return nodes.map((node, index) => {
      if (node.type === 'folder' || node.type === 'web') {
        return (
          <div key={`${node.id}-${index}`} style={{ paddingLeft: '20px' }}>
            <div
              onClick={() => toggleFolder(node)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '4px' }}
            >
              <i
                className={`codicon ${
                  node.loading
                    ? 'codicon-loading codicon-modifier-spin'
                    : node.toggled
                    ? 'codicon-chevron-down'
                    : 'codicon-chevron-right'
                }`}
                style={{ marginRight: '5px' }}
              ></i>
              <i
                className={`codicon ${
                  node.id === 'root' ? 'codicon-globe' : node.type === 'folder' ? node.toggled ? 'codicon-folder-opened' : 'codicon-folder' : 'codicon-globe'
                }`}
                style={{ marginRight: '5px' }}
              ></i>
              <span
                title={node.ServerRelativeUrl}
                style={{
                  marginLeft: '5px',
                  fontSize: '16px',
                  display: 'inline',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  fontWeight: 'normal', // Highlight if selected
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.fontWeight = 'bold';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.fontWeight = 'normal';
                }}
              >
                {node.name}
              </span>
            </div>
            {node.toggled && node.children && renderTree(node.children)}
          </div>
        );
      }
      return (
        <div
          title={node.ServerRelativeUrl}
          key={node.id}
          style={{
            cursor: 'pointer',
            paddingLeft: '41px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4px',
            fontWeight: selectedFile && node.id === selectedFile.id ? 'bold' : 'normal', // Highlight if selected
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.fontWeight = 'bold';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.fontWeight =
              selectedFile && node.id === selectedFile.id ? 'bold' : 'normal';
          }}
        >
          <i
            className="codicon codicon-file"
            style={{
              marginRight: '5px',
              color:
                node.fileInfo?.CustomizedPageStatus === 1
                  ? 'red'
                  : node.fileInfo?.CustomizedPageStatus === 2
                  ? 'yellow'
                  : undefined,
            }}
          ></i>
          <span
            style={{
              marginLeft: '5px',
              display: 'inline',
              whiteSpace: 'nowrap',
              overflow: 'visible',
            }}
            onClick={() => {
              fileEditorRef.current?.setValue('');
              fileEditorRef?.current?.setScrollTop(0);
              fileEditorRef?.current?.setScrollLeft(0);
              getFile(dispatch, node);
            }}
          >
            {node.name}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    const resizeListener = () => {
      if (fileEditorRef && fileEditorRef.current) {
        fileEditorRef.current.layout();
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
  }, [isDark]);

  const selectedFileRef = useRef<IFile | undefined>(selectedFile);

  useEffect(() => {
    selectedFileRef.current = selectedFile;
  }, [selectedFile]);

  const initFileEditor = useCallback(() => {
    if (fileEditorDiv.current) {
      fileEditorRef.current = monaco.editor.create(fileEditorDiv.current, {
        value: '',
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly: false,
        fontSize: 16,
        suggestOnTriggerCharacters: true,
        colorDecorators: true,
        automaticLayout: true,
        minimap: {
          enabled: true,
        },
      });
      if (fileEditorRef.current && selectedFile) {
        fileEditorRef.current.setValue(selectedFile.content || '');
        let language = getLanguageFromExtension(selectedFile);
        const model = fileEditorRef.current?.getModel();
        if (model) {
          monaco.editor.setModelLanguage(model, language);
        }
      }
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1);

      fileEditorRef.current.onDidChangeModelContent(() => {
        const content = fileEditorRef.current!.getValue();
        if (content !== selectedFileRef.current?.content) {
          dispatch(setSelectedFileContent(content));
        }
      });

      // Save file on Ctrl+S
      fileEditorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        updateFileContent(dispatch, selectedFileRef.current as IFile, fileEditorRef.current?.getValue() || '');
      });

      fileEditorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
        downloadFile();

      });
    }
  }, []);

  useEffect(() => {
    initFileEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function downloadFile() {
    const filename = selectedFileRef.current?.ServerRelativeUrl.split('/').pop();
    const extension = filename!.split('.').pop();
    const url = `data:text/${extension};base64, ${btoa(fileEditorRef?.current?.getValue() || '')}`;

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
  return (
    <Stack grow horizontal style={{ height: '100%' }}>
      <Stack style={{ minWidth: '350px' }}>
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.auto}
          style={{
            width: '350px',
            marginLeft: '5px',
            marginTop: '5px',
            marginBottom: '5px',
            color: isDark ? '#fff' : '#000',
            fontWeight: '600',
            userSelect: 'none',
          }}
        >
          {renderTree(files)}
        </ScrollablePane>
      </Stack>
      <Stack
        style={{
          flexGrow: 1,
          flexShrink: 1,
          marginLeft: '10px',
          marginRight: '10px',
          minWidth: 'calc(100% - 350px)',
        }}
      >
        <CommandBar
          items={[
            {
              key: 'close',
              text: 'Close',
              iconProps: { iconName: 'ChromeClose' },
              disabled: !selectedFile,
              onClick: () => {
                dispatch(actions.setSelectedFile(undefined));
                dispatch(actions.setSelectedFileContent('', ''));
              },
            },
            {
              key: 'save',
              text: 'Save',
              iconProps: { iconName: 'Save' },
              onClick: () => updateFileContent(dispatch, selectedFile as IFile, selectedFile?.content || ''),
              disabled: !selectedFile || selectedFile?.content === selectedFile?.loadedContent,
            },
            {
              key: 'filename',
              onRender: () => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '8px',
                    paddingBottom: '3px',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Text block={true} nowrap={false} variant="large" title={selectedFile?.ServerRelativeUrl}>{selectedFile?.name}</Text>
                </div>
              ),
            },
          ]}
          farItems={[
            {
              key: 'delete',
              text: 'Delete',
              iconProps: { iconName: 'Delete' },
              onClick: () => {
                setShowDeleteFileDialog(true);
              },
              disabled: !selectedFile,
            },
            {
              key: 'download',
              text: 'Download file',
              iconProps: { iconName: 'Download' },
              onClick: () => downloadFile(),
              disabled: !selectedFile,
            },
          ]}
        />
        <div
          ref={fileEditorDiv}
          style={{ display: selectedFile ? 'block' : 'none', width: '100%', height: 'calc(100% - 44px)' }}
        />
      </Stack>
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete file',
          closeButtonAriaLabel: 'Close',
          subText: 'Are you sure you want to delete this file?',
        }}
        hidden={!showDeleteFileDialog}
      >
        <Text>{selectedFile?.ServerRelativeUrl}</Text>

        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              removeFile(dispatch, selectedFile as IFile, selectedFolder as IFile);
              setShowDeleteFileDialog(false);
            }}
            text="Delete"
          />
          <DefaultButton onClick={() => setShowDeleteFileDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default FolderTree;
