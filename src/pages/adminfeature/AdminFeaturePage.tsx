import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
import useSPContext from '../../dataproviders/useSPContext';

const AdminFeaturePage = () => {
  const { adminUrl, isAdminSite } = useSPContext();
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
                {isAdminSite
                  ? 'You are on the SharePoint admin site. You can use the admin section features of this extension. Select the feature you want to use from the menu.'
                  : 'This feature is only supported in the SharePoint admin site. Please open the SharePoint admin site to use this feature.'}
              </p>
              {adminUrl && !isAdminSite && (
                <>
                  <p>Please navigate to:</p>
                  <a href={adminUrl} target="_blank" rel="noopener noreferrer">
                    {adminUrl}
                  </a>
                </>
              )}
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminFeaturePage;
