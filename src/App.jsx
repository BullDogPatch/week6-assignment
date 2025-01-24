import { useState, useEffect } from 'react';

function App() {
  const [totalCookies, setTotalCookies] = useState(0);
  const [cps, setCps] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalCookies((currentCookieAmount) => currentCookieAmount + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  return <h1>Cookie Clicker {totalCookies}</h1>;
}

export default App;
