import { useState, useEffect } from 'react';
import staticData from '../data.json';

export const usePortfolioData = () => {
  const [data, setData] = useState<any>(staticData);

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

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('portfolio_data_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolio_data_updated', handleStorageChange);
    };
  }, []);

  return data;
};
