import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
import FolderTree from './components/FolderTree';
import LoadingSpinner from '../../components/loadingSpinner';

const FileExplorer = () => {
  return (
    <IonPage>
      <Header title={'File Explorer'} />
      <IonContent>
        <LoadingSpinner />
        <FolderTree />
      </IonContent>
    </IonPage>
  );
};

export default FileExplorer;