//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk'

import PreloadImages from './utils/hooks/usePreloadImage.tsx';

import './index.css'

WebApp.ready();
WebApp.setHeaderColor('#1d283a');

const manifestUrl = 'https://sashajozwiak.github.io/yh/tonconnect-manifest.json';

const preloadSources = [
  '/yh/gnom_full_tr_150_compressed.png',
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
