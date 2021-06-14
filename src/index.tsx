import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import {Provider} from "react-redux";
import store from './store'
import {config} from "./firebase/config";
import {FirebaseAppProvider} from "reactfire";

ReactDOM.render(
    <Provider store={store}>
        <FirebaseAppProvider firebaseConfig={config}>
        <App />
        </FirebaseAppProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
