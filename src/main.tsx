//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk'

import { qrstring } from './qrstring.ts';
import PreloadImages from './utils/hooks/usePreloadImage.tsx';

import './index.css'


//device check!!!

const platform = WebApp.platform;

if (platform !== "ios" && platform !== "android" && platform !== "android_x") {
  document.body.innerHTML = qrstring;
  document.body.style.textAlign = "center";
  document.body.style.margin = "0 auto";
} else {
  WebApp.ready();
}

//device check!!!

WebApp.setHeaderColor('#1d283a');

const manifestUrl = 'https://sashajozwiak.github.io/yh/tonconnect-manifest.json';

const preloadSources = [
  '/yh/gnom_full_tr_150_compressed.png',
  /* '/yh/investor.webp' */
  // Добавьте другие пути к изображениям, которые хотите предзагрузить
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
  <TonConnectUIProvider manifestUrl={manifestUrl} actionsConfiguration={{
    twaReturnUrl: 'https://t.me/youhold_bot/youhold_app'
  }}>
    <PreloadImages sources={preloadSources} />
      <App />
    </TonConnectUIProvider>
  //</React.StrictMode>
)
