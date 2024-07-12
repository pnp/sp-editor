import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';
import MGTIframe from "./mgtiframe/MGTIframe";

const container = document.getElementById('root');
const root = createRoot(container!); // ! is a non-null assertion operator

root.render(
  <React.StrictMode>
      <MGTIframe />
  </React.StrictMode>
);

reportWebVitals();
