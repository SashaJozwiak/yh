import eruda from 'eruda'

import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

import { UserData } from './types/userData';

import './App.css';

eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */

function App() {
  const [userData, setUserData] = useState<UserData | object>({});

  useEffect(() => {
    console.log(WebApp.initDataUnsafe)
    setUserData(WebApp.initDataUnsafe);
  }, []);

  console.log('userData: ', userData)

  return (
    <>
      <div className='header'>
        header
      </div>

      <div className='balance'>
        balance
        <p>balance</p>
      </div>



      <div className='main'>
        main
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>

      </div>

      <div className='footer'>
        footer
      </div>
    </>
  );
}

export default App
