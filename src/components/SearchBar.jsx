import React from "react";
import { SearchIcon } from "./Icons.jsx";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search for a crypto..."
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
