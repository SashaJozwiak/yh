//import { useEffect } from 'react';
//import { useStore } from './store/main';


import eruda from 'eruda'

import './App.css';
import { Header } from './components/Header/Header';


eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */

const App: React.FC = function () {
/* const user = useStore((state) => state.user);
const setUser = useStore((state) => state.setUser); */

  //console.log(user)

  /* useEffect(() => {
    const user = WebApp.initDataUnsafe.user;

    if (user) {
      const newUser = {
        id: user.id,
        userName: user.username || '',
        languageCode: user.language_code || ''
      };

      setUser(newUser);
    } else {
      const newUser = {
        id: 757322479,
        userName: "Jozwiak",
        languageCode: "en",
      };

      setUser(newUser);
    }

  }, [setUser]); */

  //console.log('userData: ', userData)

  return (
    <>


      <Header />



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
