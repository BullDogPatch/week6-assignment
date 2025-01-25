import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import UgradeItem from './components/UpgradeItem/UpgradeItem';
import CookieSVG from './components/CookieSVG/CookieSvg';
import './App.css';

function App() {
  const [totalCookies, setTotalCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [upgrades, setUpgrades] = useState([]);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCookies((currentCookieAmount) => currentCookieAmount + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      try {
        const response = await fetch(
          'https://cookie-upgrade-api.vercel.app/api/upgrades'
        );
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.log(
          `Sorry the Hamster has died on his wheel and there is no more electricty to keep the server up.`
        );
      }
    };
    fetchUpgrades();
  }, []);

  const incrementCookie = () => {
    const incrementValue = 1;
    setTotalCookies((cookie) => cookie + incrementValue);
    const audio = new Audio('/sounds/pop-1-35897.mp3');
    audio.play();
  };

  const handlePurchaseCookie = (upgrade) => {
    if (totalCookies >= upgrade.cost) {
      const audio = new Audio('/sounds/ka-ching.mp3');
      audio.play();
      setTotalCookies((cookies) => cookies - upgrade.cost);
      setCps((cookiePerSec) => cookiePerSec + upgrade.increase);
    }
  };

  const handleReset = () => {
    setCps(1);
    setTotalCookies(0);
  };

  return (
    <div>
      <Header />
      <p className='total-cookies'>You have {totalCookies} cookies</p>

      <div className='cookie-incrementer'>
        <CookieSVG incrementCookie={incrementCookie} />
      </div>
      <p className='cookies-per-second'>
        You are currently gaining: {cps} {cps > 1 ? 'cookies' : 'cookie'} per
        second
      </p>
      <ul className='upgrades-shop'>
        {upgrades.map((upgrade) => (
          <UgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            totalCookies={totalCookies}
            handlePurchaseCookie={handlePurchaseCookie}
          />
        ))}
      </ul>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}

export default App;
