import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'

import TreeView, { flattenTree } from "react-accessible-treeview";

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store'
import { setAllFiles } from '../../store/fileexplorer/actions'
import { gertAllFiles } from './chrome/chrome-actions'

const FileExplorer = () => {
  const items  = useSelector((state: IRootState) => state.fileexplorer)
  const dispatch = useDispatch()

  const handleDrop = (newTreeData: any) => dispatch(setAllFiles(newTreeData))

  // load initial data
  useEffect(() => {
    gertAllFiles(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // load initial data
  useEffect(() => {
    console.log("items",items)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

type File = {
  name: string;
};

type Folder = {
  name: string;
  children: (Folder | File)[];
  isBranch?: boolean;
};



  const wrappedOnLoadData = async (props) => {
   console.log("props",props)
  };

const data = flattenTree(items);

  return (
    <IonPage>
      <Header title={'File Explorer'} />
      <IonContent>
        <TreeView
          data={flattenTree(items)}
          onLoadData={wrappedOnLoadData}
          onSelect={wrappedOnLoadData}
          
          className="basic"
          aria-label="basic example tree"
          nodeRenderer={({ element, getNodeProps, level, handleSelect }) => {
            console.log("getnode", getNodeProps())

            return (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {element.name}
            </div>
          )}}
        />
      </IonContent>
    </IonPage>
  )
}
export default FileExplorer
