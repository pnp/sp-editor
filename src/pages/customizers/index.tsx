import { IonContent, IonPage } from '@ionic/react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store'

const Customizers = () => {
  const { isDark } = useSelector((state: IRootState) => state.home)

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: '20px' }}>
          <h2>Customizers</h2>
          <p>Select a customizer type from the navigation menu:</p>
          <ul>
            <li><strong>Field Customizers</strong> - Manage how fields are rendered in list views</li>
            <li><strong>Form Customizers</strong> - Manage custom forms for New, Edit, and Display</li>
          </ul>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Customizers