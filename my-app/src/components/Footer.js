// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#7A865D] text-white mt-20 py-5">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-between items-center w-full max-w-screen-lg px-10">
          <nav className="flex space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Search</a>
            <a href="#" className="hover:underline">Contact me</a>
          </nav>
          <div className="text-[#F5A65B]">Share Hi</div>
          <div className="flex space-x-4">
            <a href="https://youtube.com" className="hover:text-gray-300"><i className="fa-brands fa-youtube"></i></a>
            <a href="https://facebook.com" className="hover:text-gray-300"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://instagram.com" className="hover:text-gray-300"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://twitter.com" className="hover:text-gray-300"><i className="fa-brands fa-twitter"></i></a>
            <a href="https://linkedin.com" className="hover:text-gray-300"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
        <div className="text-sm">CompanyName © 202X. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
