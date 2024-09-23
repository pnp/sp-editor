import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
import FolderTree from './components/FolderTree';

const FileExplorer = () => {
  return (
    <IonPage>
      <Header title={'File Explorer'} />
      <IonContent>
        <FolderTree />
      </IonContent>
    </IonPage>
  );
};

export default FileExplorer;