import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/header';
import clonerepo from './clonerepo.png';
import developermode from './developermode.png';

const InfoPage = () => {
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
                This feature is not available in the current version of the extension.
                <strong> But do not worry, we are working on it.</strong>
              </p>
              <p>
                In the meantime, you can still use the previous version of the extension. Here are the steps to get you
                up and running the old version:
              </p>
              <p>
                Clone this repository{' '}
                <a href="https://github.com/tavikukko/Chrome-SP-Editor" target="_blank" rel="noopener noreferrer">
                  {' '}
                  https://github.com/tavikukko/Chrome-SP-Editor
                </a>{' '}
                or alternatively download the project a zip file.
              </p>
              <p>
                <img src={clonerepo} alt={'Warning!'} className="logo" />
              </p>
              <p>
                Then open your browsers extensions page and enable developer mode. Then load the extension as an
                unpacked extension from the location you cloned or extracted the project.
              </p>
              <p>
                <img src={developermode} alt={'Warning!'} className="logo" />
              </p>
              <p>
                And that is it. You are now using the old version of the extension. You can use the old and new version
                side by side, sometimes it might just be difficult to know, which icon is the new and which the old :)
              </p>
              <p>
                If you like the extension, please rate it in the extensions page for{' '}
                <a
                  href="https://chromewebstore.google.com/detail/SP%20Editor/ecblfcmjnbbgaojblcpmjoamegpbodhd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  chrome
                </a>{' '}
                and for{' '}
                <a
                  href="https://microsoftedge.microsoft.com/addons/detail/sp-editor/affnnhcbfmcbbdlcadgkdbfafigmjdkk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  edge
                </a>
                .
              </p>
              <p>
                Also, if you have any feedback or feature requests, please let me know by creating an issue in the
                repository or by contacting me directly. The projects lives now in the following repository:
              </p>
              <p>
                <a href="https://github.com/pnp/sp-editor" target="_blank" rel="noopener noreferrer">
                  {' '}
                  https://github.com/pnp/sp-editor
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoPage;
