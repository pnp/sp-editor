import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'

import { NodeModel, Tree } from '@minoru/react-dnd-treeview'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store'
import { setAllFiles } from '../../store/fileexplorer/actions'
import { gertAllFiles } from './chrome/chrome-actions'
import { CustomNode } from './components/CustomNode'
import { CustomData } from './components/types'

const FileExplorer = () => {
  const { files } = useSelector((state: IRootState) => state.fileexplorer)
  const dispatch = useDispatch()

  const handleDrop = (newTreeData: any) => dispatch(setAllFiles(newTreeData))

  // load initial data
  useEffect(() => {
    gertAllFiles(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('files:')
  console.log(files)

  return (
    <IonPage>
      <Header title={'File Explorer'} />
      <IonContent>
        <div>
          <Tree
            tree={files}
            rootId={0}
            render={(node: NodeModel<CustomData>, { depth, isOpen, onToggle }) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                isSelected={true}
                onSelect={() => null}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <div>{monitorProps.item.text}</div>
            )}
            onDrop={handleDrop}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}
export default FileExplorer
