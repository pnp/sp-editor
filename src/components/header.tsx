import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const Header = ({ title }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonMenuButton />
          </IonMenuToggle>{" "}
          <IonTitle>{title}</IonTitle>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

interface HeaderProps {
  title: string
}

export default Header
