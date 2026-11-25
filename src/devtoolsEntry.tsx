// DevTools app entry. Loaded on demand from index.tsx so the action popup
// does not have to download and parse the whole DevTools app.
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import initializeStore from "./store";
import { msalInstance } from "./msal";

export function renderDevtools(root: ReactDOM.Root): void {
  // @ts-ignore: this is the only way to make it work
  window.require.config({
    paths: {
      vs: "/vs",
    },
  });

  // @ts-ignore: this is the only way to make it work
  window.MonacoEnvironment = {
    getWorkerUrl: (workerId: any, label: any) => {
      return "worker-loader-proxy.js";
    },
  } as any;

  // @ts-ignore: this is the only way to make it work
  window.require(["vs/editor/editor.main"], async () => {
    const store = await initializeStore();

    root.render(
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </Provider>
    );
  });
}
