import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '@ethersproject/shims';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const appElement = (
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
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
