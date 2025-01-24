import { useState, useEffect } from 'react';

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
          <li key={ugrade.id}>{ugrade.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
