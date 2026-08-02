import { useState, useEffect } from 'react';
import staticData from '../data.json';

export const usePortfolioData = () => {
  const [data, setData] = useState<any>(() => {
    const local = localStorage.getItem('portfolio_data');
    if (local) {
      try {
        return { ...staticData, ...JSON.parse(local) };
      } catch (e) {
        return staticData;
      }
    }
    return staticData;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const local = localStorage.getItem('portfolio_data');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setData({ ...staticData, ...parsed });
        } catch (e) {
          setData(staticData);
        }
      } else {
        setData(staticData);
      }
    };
    
    handleStorageChange();

    // Fetch live data from GitHub in background so site updates instantly on save
    const fetchLiveData = async () => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/Vedant021004/Vedant021004.github.io/main/src/data.json?t=${Date.now()}`
        );
        if (res.ok) {
          const liveJson = await res.json();
          setData((prev: any) => ({ ...prev, ...liveJson }));
          localStorage.setItem('portfolio_data', JSON.stringify(liveJson));
        }
      } catch (e) {
        // Fallback to cached/local data
      }
    };

    fetchLiveData();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('portfolio_data_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolio_data_updated', handleStorageChange);
    };
  }, []);

  return data;
};
