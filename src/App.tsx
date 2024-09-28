import { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Tasks } from './components/Tasks/Tasks';
import { Stages } from './components/Stages/Stages';
import { Cabinet } from './components/Cabinet/Cabinet';


import { Invite } from './components/Cabinet/Invite/Invite';

import { useNav } from './store/nav';
import { useUserData, useUserBalances, useJettonsBalances, useStonFi, useDedust } from './store/main'

import WebApp from '@twa-dev/sdk';
//import eruda from 'eruda'

/* import gnome from './assets/cabinet/gnom_full_tr_150.png' */
/* import usePreloadImage from './utils/hooks/usePreloadImage'; */

import './App.css';

//import useScrollFix from './utils/hooks/useScrollFix';


//import { Game } from './Game/Game';

import { BetaPage } from './components/Game/BetaPage';

//import { postEvent } from '@telegram-apps/sdk';

//eruda.init();//just for debug

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

const App: React.FC = function () {
  const nav = useNav((state) => state.nav.main)

  const rawAddress = useUserData(state => state.user.rawAddress);

  //const bonuses = useUserBalances((state) => state.bonuses);
  //const userId = useUserData(state => state.user.internalId);

  //const getBonuses = useUserBalances((state) => state.getBonuses);
  const updateBalance = useUserBalances((state) => state.updateBalance);
  const updateBalanceJ = useJettonsBalances((state) => state.updateBalanceJ);

  const updateStonFiBalance = useStonFi((state) => state.updateBalanceSF)
  const updateBalanceDedust = useDedust((state) => state.updateBalanceDedust);

  useEffect(() => {
    if (!WebApp.isExpanded) {
      WebApp.expand();
    }
    //postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
  }, []);

  useEffect(() => {
    //console.log('render change rawaddres in LIST')
    if (rawAddress) {
      updateBalance(rawAddress);
    }
  }, [rawAddress, updateBalance]);

  useEffect(() => {
    //console.log('render change rawaddres in LIST jettons')
    if (rawAddress) {
      updateBalanceJ(rawAddress);
    }
  }, [rawAddress, updateBalanceJ]);

  useEffect(() => {
    //console.log('render change rawaddres in LIST stonfi')
    if (rawAddress) {
      updateStonFiBalance(rawAddress)
    }
  }, [rawAddress, updateStonFiBalance,]);

  useEffect(() => {
    //console.log('render change rawaddres in LIST dedust')
    if (rawAddress) {
      updateBalanceDedust(rawAddress)
    }
  }, [rawAddress, updateBalanceDedust]);

  // Try promise race later

  /* useEffect(() => {
    const fetchBalances = async () => {
      if (rawAddress) {
        try {
          await updateBalance(rawAddress);
        } catch (error) {
          console.error('Error updating balance:', error);
        }

        try {
          await updateBalanceJ(rawAddress);
        } catch (error) {
          console.error('Error updating balance J:', error);
        }

        try {
          await updateStonFiBalance(rawAddress);
        } catch (error) {
          console.error('Error updating StonFi balance:', error);
        }

        try {
          await updateBalanceDedust(rawAddress);
        } catch (error) {
          console.error('Error updating Dedust balance:', error);
        }
      }
    };

    fetchBalances();
  }, [rawAddress, updateBalance, updateBalanceJ, updateStonFiBalance, updateBalanceDedust]); */

  return (
    <>
      {<Header />}
      {nav === 'hold' && <Main />}
      {nav === 'bonus' && <Tasks />}
      {nav === 'game' && <BetaPage />}
      {nav === 'stage' && <Stages />}
      {nav === 'cabinet' && <Cabinet />}
      {nav === 'invite' && <Invite />}
      {nav !== 'game' && <Footer />}
    </>
  );
}

export default App
