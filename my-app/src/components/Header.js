// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="w-full h-20 flex justify-between items-center text-center px-10 bg-white border-b border-gray-200">
      <h4 className="text-2xl font-semibold text-gray-700">Share Hi</h4>
      <form action="/search" method="GET" className="flex items-center w-2/3">
        <i className="fa-solid fa-magnifying-glass absolute ml-3 text-gray-400"></i>
        <input
          type="text"
          name="query"
          placeholder="Search"
          required
          className="w-full pl-10 pr-3 py-2 bg-gray-200 border-b-2 border-black focus:outline-none"
        />
        <button type="submit" className="ml-3 w-24 h-9 bg-[#7A865D] text-white rounded-md">
          Search
        </button>
      </form>
      <div className="text-[#F5A65B]">
        <a href="/" className="flex items-center space-x-1">
          <i className="fa-regular fa-user"></i>
          <span>My Account</span>
        </a>
      </div>
    </header>
  );
};

export default Header;