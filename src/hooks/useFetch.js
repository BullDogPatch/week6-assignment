import { useEffect, useState } from 'react';

export const useFetch = () => {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUpgrades = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://cookie-upgrade-api.vercel.app/api/upgrades'
        );
        const data = await response.json();
        setUpgrades(data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching upgrades:', error);
        setLoading(false);
      }
    };
    fetchUpgrades();
  }, []);

  return { upgrades, loading };
};
