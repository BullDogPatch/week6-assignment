import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import UgradeItem from './components/UpgradeItem/UpgradeItem';
import CookieSVG from './components/CookieSVG/CookieSvg';
import './App.css';

function App() {
  const [totalCookies, setTotalCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCookies((currentCookieAmount) => currentCookieAmount + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    const fetchUpgrades = async () => {
      const response = await fetch(
        'https://cookie-upgrade-api.vercel.app/api/upgrades'
      );
      const data = await response.json();
      setUpgrades(data);
    };
    fetchUpgrades();
  }, []);

  const incrementCookie = () => {
    setTotalCookies((cookie) => cookie + 1);
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
      <p>You have {totalCookies} cookies</p>

      <CookieSVG incrementCookie={incrementCookie} />
      <p className='cookies-per-second'>
        You are currently gaining: {cps} cookies per second
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
