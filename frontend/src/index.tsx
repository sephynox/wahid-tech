import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import '@ethersproject/shims';
import i18n from './services/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
let method = ReactDOM.render;

if (rootElement?.hasChildNodes()) {
    method = ReactDOM.hydrate;
}

method(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Router>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </Router>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
