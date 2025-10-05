import React from "react";
import { SortIcon } from "./Icons.jsx";

const TableHeader = ({ columns, onSort, sortConfig }) => (
  <thead className="bg-gray-700/50 sticky top-0 z-10">
    <tr>
      {columns.map(({ key, label, className }) => (
        <th
          key={key}
          onClick={() => onSort(key)}
          className={`px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer select-none ${className}`}
        >
          <div className="flex items-center gap-2">
            {label}
            <SortIcon
              isSorted={sortConfig.key === key}
              direction={sortConfig.direction}
            />
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
};

const formatMarketCap = (cap) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(cap);
};

const TableRow = ({ coin }) => {
  const priceChangeColor =
    coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400";

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-150">
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
        {coin.market_cap_rank}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
        <div className="flex items-center">
          <img
            className="h-6 w-6 rounded-full mr-3"
            src={coin.image}
            alt={coin.name}
          />
          <div>
            <div>{coin.name}</div>
            <div className="text-gray-400 uppercase">{coin.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
        {formatPrice(coin.current_price)}
      </td>
      <td
        className={`px-4 py-4 whitespace-nowrap text-sm font-medium text-right ${priceChangeColor}`}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-right hidden sm:table-cell">
        {formatMarketCap(coin.market_cap)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-right hidden lg:table-cell">
        {formatMarketCap(coin.total_volume)}
      </td>
    </tr>
  );
};

const SkeletonRow = () => (
  <tr className="border-b border-gray-700">
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-8 animate-pulse"></div>
    </td>
    <td className="px-4 py-4">
      <div className="flex items-center">
        <div className="h-6 w-6 rounded-full bg-gray-700 animate-pulse mr-3"></div>
        <div>
          <div className="h-4 bg-gray-700 rounded w-24 mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded w-12 animate-pulse"></div>
        </div>
      </div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-20 float-right animate-pulse"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 bg-gray-700 rounded w-16 float-right animate-pulse"></div>
    </td>
    <td className="px-4 py-4 hidden sm:table-cell">
      <div className="h-4 bg-gray-700 rounded w-24 float-right animate-pulse"></div>
    </td>
    <td className="px-4 py-4 hidden lg:table-cell">
      <div className="h-4 bg-gray-700 rounded w-24 float-right animate-pulse"></div>
    </td>
  </tr>
);

const CryptoTable = ({ coins, onSort, sortConfig, loading }) => {
  const columns = [
    { key: "market_cap_rank", label: "#", className: "" },
    { key: "name", label: "Coin", className: "" },
    { key: "current_price", label: "Price", className: "text-right" },
    {
      key: "price_change_percentage_24h",
      label: "24h %",
      className: "text-right",
    },
    {
      key: "market_cap",
      label: "Market Cap",
      className: "text-right hidden sm:table-cell",
    },
    {
      key: "total_volume",
      label: "Volume (24h)",
      className: "text-right hidden lg:table-cell",
    },
  ];

  return (
    <div className="overflow-x-auto max-h-[75vh]">
      <table className="min-w-full divide-y divide-gray-700">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortConfig={sortConfig}
        />
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            : coins.map((coin) => <TableRow key={coin.id} coin={coin} />)}
        </tbody>
      </table>
      {!loading && coins.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No cryptocurrencies found.
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
