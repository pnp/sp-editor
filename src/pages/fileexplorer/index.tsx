import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import FolderTree from './components/tree';
import FileEditorCommands from './components/commands';

const FileExplorer = () => {
  return (
    <IonPage>
      <Header title={'File Editor'} showOnLoad={false} headline='' content=''/>
      <FileEditorCommands />
      <IonContent>
        <LoadingSpinner />
        <FolderTree />
      </IonContent>
    </IonPage>
  );
};

export default FileExplorer;