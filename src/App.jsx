import { useState } from "react";
import CryptoTable from "./components/CryptoTable.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { useCryptoData } from "./hooks/useCryptoData.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap_rank",
    direction: "ascending",
  });

  const { coins, loading, error, lastUpdated } = useCryptoData(
    searchTerm,
    sortConfig
  );

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">
            Crypto Tracker
          </h1>
          <p className="text-gray-400 mt-2">
            Top 100 Cryptocurrencies by Market Cap
          </p>
        </header>

        <main>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {lastUpdated && (
              <div className="text-sm text-gray-500 self-center sm:self-end">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {error && (
              <div className="p-4 text-center text-red-400 bg-red-900/50">
                {error}
              </div>
            )}
            <CryptoTable
              coins={coins}
              onSort={handleSort}
              sortConfig={sortConfig}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
