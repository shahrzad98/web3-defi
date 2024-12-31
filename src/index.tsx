/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import root app
import { App } from "app";
import ApolloContainer from "app/components/ApolloContainer";
import Web3Container from "app/components/Web3Container";
import { ReactGAM } from "app/google-analytics/google-analytics";
import * as React from "react";
import * as serviceWorker from "serviceWorker";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import * as ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
// Use consistent styling
import "sanitize.css/sanitize.css";

import { AppProvider } from "./state/app/appContext";
import { NotificationProvider } from "./state/notification/notificationContext";
import { TransactionProvider } from "./state/transaction/transactionContext";

const MOUNT_NODE = document.getElementById("root") as HTMLElement;

ReactGAM().init();
ReactGAM().trackPageView(window.location.pathname + window.location.search);

ReactDOM.render(
  <HelmetProvider>
  <AppProvider>
    <NotificationProvider>
      <TransactionProvider>
        <Web3Container>
          <ApolloContainer>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ApolloContainer>
        </Web3Container>
      </TransactionProvider>
    </NotificationProvider>
  </AppProvider>
  </HelmetProvider>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
