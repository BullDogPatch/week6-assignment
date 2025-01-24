import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import UgradeItem from './components/UpgradeIitem/UpgradeItem';
import './App.css';
import CookieSVG from './components/CookieSVG/CookieSvg';

function App() {
  const [totalCookies, setTotalCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [upgrades, setUpgrades] = useState([]);
  const [notEnoughCookiesMessage, setNotEnoughCookiesMessage] = useState(false);

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

  const handlePurchaseCookie = (upgrade) => {
    if (totalCookies < upgrade.cost) {
      setTimeout(() => {
        setNotEnoughCookiesMessage(true);
      }, 100);
      setTimeout(() => {
        setNotEnoughCookiesMessage(false);
      }, 1000);
    } else {
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
      {notEnoughCookiesMessage && (
        <p>Not enough cookies to buy the upgrade :(</p>
      )}
      <CookieSVG setTotalCookies={setTotalCookies} />
      <p>You are currently gaining: {cps} cookies per second</p>
      <ul>
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
