//import { useStore } from './store/main';
import { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

import { useNav } from './store/nav';
import { useUserData, useUserBalances, useJettonsBalances, useStonFi } from './store/main'

import WebApp from '@twa-dev/sdk';
//import eruda from 'eruda'

import { Footer } from './components/Footer/Footer';
import { Tasks } from './components/Tasks/Tasks';
import { Stages } from './components/Stages/Stages';
import { Cabinet } from './components/Cabinet/Cabinet';

/* import gnome from './assets/cabinet/gnom_full_tr_150.png' */
/* import usePreloadImage from './utils/hooks/usePreloadImage'; */

import './App.css';
//import useScrollFix from './utils/hooks/useScrollFix';

//eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */

const App: React.FC = function () {

  //useScrollFix();

  const nav = useNav((state) => state.nav.main)

  const rawAddress = useUserData(state => state.user.rawAddress);

  //const bonuses = useUserBalances((state) => state.bonuses);
  //const userId = useUserData(state => state.user.internalId);

  //const getBonuses = useUserBalances((state) => state.getBonuses);
  const updateBalance = useUserBalances((state) => state.updateBalance);
  const updateBalanceJ = useJettonsBalances((state) => state.updateBalanceJ);

  const updateStonFiBalance = useStonFi((state) => state.updateBalanceSF)

  console.log('Main render')

  useEffect(() => {
    if (!WebApp.isExpanded) {
      WebApp.expand();
    }
  }, []);

  useEffect(() => {
    console.log('render change rawaddres in LIST')
    if (rawAddress) {
      updateBalance(rawAddress);
    }
  }, [rawAddress, updateBalance]);

  useEffect(() => {
    console.log('render change rawaddres in LIST jettons')
    if (rawAddress) {
      updateBalanceJ(rawAddress);
      updateStonFiBalance(rawAddress)
    }
  }, [rawAddress, updateBalanceJ, updateStonFiBalance]);

  /* useEffect(() => {
    if (userId ?? userId !== 0) {
      getBonuses();
    }
  }, [getBonuses, userId]) */

  /* useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePreloadImage(gnome).then(() => {
      console.log('Image preloaded');
    }).catch((err) => {
      console.error('Error preloading image:', err);
    });
  }, []); */

  return (
    <>
      {nav !== 'cabinet' && <Header />}
      {nav === 'hold' && <Main />}
      {nav === 'bonus' && <Tasks />}
      {nav === 'loan' && <h2>loan</h2>}
      {nav === 'stage' && <Stages />}
      {nav === 'cabinet' && <Cabinet />}
      <Footer />
    </>
  );
}

export default App
