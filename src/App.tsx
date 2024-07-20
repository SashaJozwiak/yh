//import { useStore } from './store/main';
import { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';


import WebApp from '@twa-dev/sdk';
import eruda from 'eruda'

import './App.css';


eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */

const App: React.FC = function () {

  useEffect(() => {
    if (!WebApp.isExpanded) {
      WebApp.expand();
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
      <div className='footer'>
        footer
      </div>
    </>
  );
}

export default App
