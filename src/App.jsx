import { useState, useEffect } from 'react';
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
      console.log(data);
      setUpgrades(data);
    };
    fetchUpgrades();
  }, []);

  return (
    <div>
      Cookie Clicker {totalCookies}
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
