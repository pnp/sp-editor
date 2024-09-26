import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
const InfoPage = () => {
  return (
    <IonPage>
      <Header title={'Info'} showOnLoad headline="Header here" content="instructions here" />
      <IonContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start', 
            height: 'calc(100vh - 100px)',
          }}
        >
          <section style={{ textAlign: 'left', maxWidth: '600px', padding: '20px' }}>
            <div>
              <p>
                Use of this tool exposes you to potential security threats which can result in others gaining access to
                your personal Office 365 data (documents, emails, conversations and more).
              </p>
              <p>
                Make sure you trust the person or organization that asked you to access this tool before proceeding.
              </p>
              <p>Learn more here: https://technet.microsoft.com/en-us/library/bb794823.aspx</p>
              <p>
                The dark side of this tool is a pathway to many abilities some consider to be...
              </p>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoPage;
