import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchCryptoData } from "../services/cryptoAPI.jsx";

export const useCryptoData = (searchTerm, sortConfig) => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoData();
      setAllCoins(data);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const coins = useMemo(() => {
    let filteredCoins = [...allCoins];

    if (searchTerm) {
      filteredCoins = filteredCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filteredCoins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredCoins;
  }, [allCoins, searchTerm, sortConfig]);

  return {
    coins,
    loading: loading && allCoins.length === 0,
    error,
    lastUpdated,
  };
};
