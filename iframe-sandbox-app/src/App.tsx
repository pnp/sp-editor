import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import PopUp from './popup/PopUp';
import MGTIframe from './mgtiframe/MGTIframe';

export default function App() {
  return (
    <HashRouter>
      <Route path='/mgtiframe'><MGTIframe /></Route>
      <Route path='/popup'><PopUp /></Route>
    </HashRouter>)
}
