const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const fetchWithTimeout = (url, options = {}, timeout = 8000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out")),
      timeout
    );
    fetch(url, options)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

export const fetchCryptoData = async () => {
  try {
    const response = await fetchWithTimeout(API_URL, {}, 8000);

    if (!response.ok) {
      throw new Error(
        `API call failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchCryptoData error:", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
};
