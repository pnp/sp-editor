import { IonContent, IonPage } from '@ionic/react';
import FormCustomizers from './components/FormCustomizers';
import Header from '../../../components/header';

const FormCustomizersPage = () => {
  return (
    <IonPage>
      <IonContent>
        <Header title={'Form Customizers'} showOnLoad={false} headline="" content="" />
        <FormCustomizers />
      </IonContent>
    </IonPage>
  );
};

export default FormCustomizersPage;
