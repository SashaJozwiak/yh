//import { useStore } from './store/main';
import { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

import { useNav } from './store/nav';
import { useUserData, useUserBalances, useJettonsBalances, useStonFi } from './store/main'

import WebApp from '@twa-dev/sdk';
import eruda from 'eruda'

import './App.css';
import { Footer } from './components/Footer/Footer';
import { Tasks } from './components/Tasks/Tasks';
import { Stages } from './components/Stages/Stages';


eruda.init();//just for debug

/* document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}); */

const App: React.FC = function () {

  const nav = useNav((state) => state.nav.main)

  const rawAddress = useUserData(state => state.user.rawAddress);
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

  return (
    <>
      <Header />
      {nav === 'hold' && <Main />}
      {nav === 'bonus' && <Tasks />}
      {nav === 'loan' && <h2>loan</h2>}
      {nav === 'stage' && <Stages />}
      {nav === 'cabinet' && <h2>cabinet</h2>}
      <Footer />
    </>
  );
}

export default App
