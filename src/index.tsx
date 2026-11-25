import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { initializeIcons } from "@fluentui/react";
import { HashRouter } from "react-router-dom";

// The action popup and the DevTools app share this page. Each loads its own
// code on demand, so opening the popup does not pull in the whole DevTools app
// (all pages, Monaco integration, PnPjs, MGT, MSAL, the Redux store).

initializeIcons();

// this is to catch chrome developertools shortcut
// add all keykeyCodes to block the shorcuts
document.addEventListener(
  "keydown",
  function (e) {
    switch (e.keyCode) {
      case 191:
        e.stopImmediatePropagation();
        break;
    }
    return;
  },
  true
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (
  window.location.hash.includes("/popup") ||
  window.location.hash.includes("/mgtiframe")
) {
  import("./App2").then(({ default: App2 }) => {
    root.render(
      <React.StrictMode>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App2 />
        </HashRouter>
      </React.StrictMode>
    );
  });
} else {
  import("./devtoolsEntry").then(({ renderDevtools }) => renderDevtools(root));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
