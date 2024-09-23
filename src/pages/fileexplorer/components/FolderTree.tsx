import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@vscode/codicons/dist/codicon.css';
import { ScrollablePane, ScrollbarVisibility, Stack } from '@fluentui/react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

type Node = {
  name: string;
  type: 'folder' | 'file';
  toggled?: boolean;
  children?: Node[];
};

const initialData: Node[] = [
  {
    name: 'Documents',
    type: 'folder',
    children: [
      {
        name: 'Policies',
        type: 'folder',
        children: [
          { name: 'HR_Policy.aspx', type: 'file' },
          { name: 'IT_Policy.js', type: 'file' },
          { name: 'Finance_Policy.json', type: 'file' },
        ],
      },
      {
        name: 'Reports',
        type: 'folder',
        children: [
          { name: 'Annual_Report_2021.aspx', type: 'file' },
          { name: 'Quarterly_Report_Q1.js', type: 'file' },
          { name: 'Monthly_Report_Jan.json', type: 'file' },
        ],
      },
    ],
  },
  {
    name: 'Projects',
    type: 'folder',
    children: [
      {
        name: 'Project_A',
        type: 'folder',
        children: [
          { name: 'Project_Plan.aspx', type: 'file' },
          { name: 'Budget.js', type: 'file' },
          { name: 'Timeline.json', type: 'file' },
        ],
      },
    ],
  },
  { name: 'Company_sdfsdf_sdfsdfsdf_sdfsdfsdf_sdfsdf_Overview.aspx', type: 'file' },
  { name: 'Employee_Handbook.js', type: 'file' },
  { name: 'Contact_List.json', type: 'file' },
];

const FolderTree: React.FC = () => {
  const [data, setData] = useState<Node[]>(initialData);
  const { isDark } = useSelector((state: IRootState) => state.home);

  const fileEditorDiv = useRef<null | HTMLDivElement>(null);
  const fileEditorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

  const toggleFolder = (path: number[]) => {
    const updateNode = (nodes: Node[], path: number[]): Node[] => {
      if (path.length === 0) return nodes;

      const [currentIndex, ...restPath] = path;
      return nodes.map((node, index) => {
        if (index === currentIndex) {
          if (restPath.length === 0) {
            return { ...node, toggled: !node.toggled };
          } else if (node.children) {
            return { ...node, children: updateNode(node.children, restPath) };
          }
        }
        return node;
      });
    };

    setData((prevData) => updateNode(prevData, path));
  };

  const renderTree = (nodes: Node[], path: number[] = []): JSX.Element[] => {
    return nodes.map((node, index) => {
      const currentPath = [...path, index];
      const isRoot = path.length === 0;
      if (node.type === 'folder') {
        return (
          <div key={node.name} style={{ paddingLeft: `${path.length * 20}px` }}>
            <div
              onClick={() => toggleFolder(currentPath)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '4px' }}
            >
              <i
                className={`codicon ${node.toggled ? 'codicon-chevron-down' : 'codicon-chevron-right'}`}
                style={{ marginRight: '5px' }}
              ></i>
              <span className="folder-file-name">{node.name}</span>
            </div>
            {node.toggled && node.children && renderTree(node.children, currentPath)}
          </div>
        );
      }
      return (
        <div
          key={node.name}
          style={{
            cursor: 'pointer',
            paddingLeft: `${path.length * 20}px`,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4px',
          }}
        >
          <i className="codicon codicon-file" style={{ marginRight: '5px', marginLeft: isRoot ? '19px' : '0' }}></i>
          <span>{node.name}</span>
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
        minimap: {
          enabled: true,
        },
      });
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1);
    }
  }, []);

  useEffect(() => {
    initFileEditor();
  }, []);

  return (
    <Stack grow horizontal style={{ height: '100%', marginTop: '10px' }}>
      <Stack style={{ minWidth: '350px' }}>
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.always}
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
          {renderTree(data)}
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
        <div ref={fileEditorDiv} style={{ flexGrow: 1, flexShrink: 1, width: '100%', height: 'calc(100vh - 90px)' }} />
      </Stack>
    </Stack>
  );
};

export default FolderTree;
