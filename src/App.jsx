import { useState, useEffect } from 'react';
import cookie from './assets/cookie.svg';
import './App.css';
import Header from './components/Header/Header';

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
      console.log(data);
      setUpgrades(data);
    };
    fetchUpgrades();
  }, []);

  return (
    <div>
      <Header />
      <p>You have {totalCookies} cookies</p>
      <img
        src={cookie}
        alt='cookie'
        onClick={() => setTotalCookies((cookie) => cookie + 1)}
      />
      <p>You are currently gaining: {cps} cookies per second</p>
      <ul>
        {upgrades.map((ugrade) => (
          <li key={ugrade.id}>
            <p>{ugrade.name}</p>
            <p>$C {ugrade.cost}</p>
            <p>+{ugrade.increase}</p>
            <button>purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
