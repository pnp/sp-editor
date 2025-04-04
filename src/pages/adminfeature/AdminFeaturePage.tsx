import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';

const AdminFeaturePage = () => {
  const adminUrl = 'https://lsegdevxm365-admin.sharepoint.com/';
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflowY: 'auto', // Enable vertical scrolling
            height: 'calc(100vh - 100px)',
          }}
        >
          <section
            style={{ textAlign: 'left', maxWidth: '600px', padding: '20px', fontSize: '1.2em', lineHeight: '1.6em' }}
          >
            <div>
              <p>
                Features in the Admin section are accessible only when this extension is used within the SharePoint
                Admin Center.
              </p>
              {adminUrl && (
                <p>
                  Please navigate to:{' '}
                  <a href={adminUrl} target="_blank" rel="noopener noreferrer">
                    {adminUrl}
                  </a>
                </p>
              )}
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminFeaturePage;
