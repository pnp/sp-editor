import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { ThemingDesigner } from './components/ThemingDesigner';
import Header from '../../components/header';

const ThemeDesignerPage: React.FC = () => {
  return (
    <IonPage>
      <Header title={'Live Theme Designer'} showOnLoad={false} headline='' content='' />
      <IonContent>
        <ThemingDesigner />
      </IonContent>
    </IonPage>
  );
};

export default ThemeDesignerPage;
