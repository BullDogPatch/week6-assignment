import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import UgradeItem from './components/UpgradeItem/UpgradeItem';
import CookieSVG from './components/CookieSVG/CookieSvg';
import './App.css';

// dark theme is rework of this (https://selftaughttxg.com/2023/05-23/learn-local-storage-in-react-create-a-light-and-dark-theme-switcher-application/#:~:text=Working%20with%20local%20storage%20in%20React,-To%20work%20with&text=We%20use%20the%20useState%20hook,user%20toggles%20the%20theme%20value.)
function App() {
  const [totalCookies, setTotalCookies] = useState(
    () => JSON.parse(localStorage.getItem('gameState'))?.totalCookies || 0
  );

  const [cps, setCps] = useState(
    () => JSON.parse(localStorage.getItem('gameState'))?.cps || 1
  );

  const [upgrades, setUpgrades] = useState([]);

  // Set default theme as 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark'; // Default to 'dark'
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Apply the theme to the body element
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const gameState = { totalCookies, cps };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [totalCookies, cps]);

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
        console.log('Error fetching upgrades:', error);
      }
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
    localStorage.removeItem('gameState');
  };

  return (
    <div>
      <Header theme={theme} setTheme={toggleTheme} />
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
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
