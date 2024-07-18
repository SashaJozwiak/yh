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
  const [userData, setUserData] = useState<UserData>({
    id: null,
    userName: '',
    languageCode: '',
    photoUrl: ''
  });

  useEffect(() => {
    console.log(WebApp.initDataUnsafe)
    const user = WebApp.initDataUnsafe.user;
    console.log('user: ', user)
    if (user) {
      setUserData({
        id: user.id,
        userName: user.username || '',
        languageCode: user.language_code || '',
        photoUrl: user.photo_url || ''
      });
    } else {
      setUserData({
        id: 757322479,
        userName: "Jozwiak",
        languageCode: "en",
        photoUrl: 'https://cs14.pikabu.ru/avatars/3400/x3400884-1273444445.png'
      });
    }


  }, []);

  console.log('userData: ', userData)

  return (
    <>
      <div className='header'>
        <img width={50} height={50} src={userData.photoUrl}></img>
        <p>{userData.id}</p>
        <p>{userData.userName}</p>
        <p>{userData.languageCode}</p>
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
