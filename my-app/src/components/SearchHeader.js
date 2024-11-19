// components/SearchHeader.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SearchHeader = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="w-full h-20 flex justify-between items-center text-center px-10 bg-white border-b border-gray-200">
      <h4 className="text-2xl font-semibold text-gray-700">
        <Link to="/">Share Hi</Link>
      </h4>
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
      <div className="flex space-x-6 text-[#F5A65B]">  {/* Add flex and spacing here */}
      {currentUser && (
          <>
            <a href="/setting" className="flex items-center space-x-1">
              <i className="fa-regular fa-user"></i>
              <span>Setting</span>
            </a>
            <button
              onClick={navigate('/donatorprofile')}
              className="flex items-center space-x-1 hover:underline"
            >
              <i className="fa-regular fa-user"></i>
              <span>My Account</span>
            </button>
            <button
              onClick={logout}
              className="hover:underline text-[#F5A65B]"
            >
              Logout
            </button>
          </>
        )}
        {!currentUser && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default SearchHeader;
