// components/LandingHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  return (
    <header className="w-full h-20 flex justify-between items-center text-center px-10 bg-white border-b border-gray-200">
      <h4 className="text-2xl font-semibold text-gray-700">
        <Link to="/">Share Hi</Link>
      </h4>
      <div className="flex space-x-6 text-[#F5A65B]">  {/* Add flex and spacing here */}
        <a href="/register" className="flex items-center space-x-1">
          <i className="fa-regular fa-user"></i>
          <span>Sign Up</span>
        </a>
        <a href="/login" className="flex items-center space-x-1">
          <i className="fa-regular fa-user"></i>
          <span>Log In</span>
        </a>
      </div>
    </header>
  );
};

export default LandingHeader;