//import { useStore } from './store/main';
import { useEffect } from 'react';

import { Header } from './components/Header/Header';


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

  const currencyFormat = (num: number) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <>
      <Header />

      <div className='balance'>
        {/* <img style={{ marginTop: '0.3rem' }} width={70} src={wallet} alt="wallet_img" /> */}


        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="50.000000pt" height="50.000000pt" viewBox="0 0 250.000000 250.000000"
        >
          <g transform="translate(0.000000,224.000000) scale(0.100000,-0.100000)"
            fill="white" stroke="none">
            <path d="M350 1550 c-65 -22 -130 -86 -148 -147 -9 -29 -12 -179 -12 -529 0
            -470 1 -491 21 -534 24 -54 43 -75 91 -106 67 -43 136 -46 832 -42 711 4 681
            2 755 64 19 15 44 51 57 79 20 43 24 66 24 157 l0 107 31 18 c63 37 69 60 69
            264 0 205 -7 231 -70 264 l-30 16 0 110 c0 71 -5 121 -14 143 -24 57 -83 113
            -142 136 -53 19 -74 20 -732 20 -637 -1 -680 -2 -732 -20z m1447 -61 c79 -30
            112 -98 113 -231 l0 -98 -162 0 c-150 0 -167 -2 -213 -24 -183 -85 -224 -326
            -77 -458 77 -69 89 -73 280 -76 l172 -4 0 -94 c0 -134 -24 -185 -104 -226 -38
            -19 -61 -20 -725 -22 -684 -1 -686 -1 -726 20 -49 27 -70 49 -90 97 -23 55
            -23 959 0 1015 20 46 51 81 90 98 39 17 1397 20 1442 3z m180 -413 l28 -24 0
            -170 c0 -231 19 -214 -235 -210 -196 3 -197 3 -239 31 -161 107 -112 349 79
            388 19 4 103 7 187 8 147 1 153 0 180 -23z"/>
            <path d="M1607 969 c-23 -13 -47 -62 -47 -95 0 -40 59 -94 104 -94 54 0 98 43
            100 99 1 36 -4 47 -32 72 -34 31 -89 39 -125 18z m77 -62 c28 -21 12 -59 -22
            -55 -30 3 -41 30 -22 53 15 18 21 19 44 2z"/>
          </g>
        </svg>

        <p>{currencyFormat(2341.55)}</p>
        {/* <img style={{ marginTop: '0.3rem', opacity: '0' }} width={70} src={wallet} alt="wallet_img" /> */}

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
