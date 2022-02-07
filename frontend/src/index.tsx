import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { Spinner } from "react-bootstrap";
import "@ethersproject/shims";

import i18next from "./services/i18n";
import reportWebVitals from "./reportWebVitals";
import Routes from "./Routes";

const rootElement = document.getElementById("root");
const appElement = (
  <Suspense fallback={<Spinner animation="border" role="status" />}>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <HelmetProvider>
          <Routes />
        </HelmetProvider>
      </I18nextProvider>
    </BrowserRouter>
  </Suspense>
);

if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrate(appElement, rootElement);
} else {
  ReactDOM.render(appElement, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
