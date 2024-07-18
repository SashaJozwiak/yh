import eruda from 'eruda'

import { useEffect, /* useState */ } from 'react';
import WebApp from '@twa-dev/sdk';

//import { UserData } from './types/userData';

import './App.css';
import { useStore } from './store/main';

eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */



function App() {
  const user = useStore((state) => state.user)

  console.log(user)

  useEffect(() => {
    const user = WebApp.initDataUnsafe.user;

    if (user) {
      const newUser = {
        id: user.id,
        userName: user.username || '',
        languageCode: user.language_code || ''
      };

      useStore.getState().setUser(newUser);
    } else {
      const newUser = {
        id: 757322479,
        userName: "Jozwiak",
        languageCode: "en",
      };

      useStore.getState().setUser(newUser);
    }

  }, []);

  //console.log('userData: ', userData)

  return (
    <>
      <div className='header'>
        <p>{user.id}</p>
        <p>{user.userName}</p>
        <p>{user.languageCode}</p>
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
