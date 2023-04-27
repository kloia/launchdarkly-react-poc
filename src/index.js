import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { CLIENT_SIDE_IDS } from './constants';

const root = ReactDOM.createRoot(document.getElementById('root'));


(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: localStorage.getItem('id') || CLIENT_SIDE_IDS.TEST
  });

  root.render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
