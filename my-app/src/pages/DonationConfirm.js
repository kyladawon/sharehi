import React from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const DonationConfirm = () => {
    const handleSubmit = (e) => {
      console.log('Donation Confirmed');
    };
  
    return (
      <>
      <SearchHeader />
      <main className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center mt-4 flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/check.png"
                alt="check"
                className="w-40 h-40 object-contain"
              />
            </div>
          <h1 className="text-3xl font-semibold text-center mb-6">Thank You</h1>
          <h2 className="font-semibold text-center mb-6">Your Donation is Confirmed</h2>
          <p className="text-gray-700 font-medium text-center mb-8">Your kindess has made the world into a better place.</p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="submit"
              className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200"
            >
              <Link to="/search">Back to Search</Link>
            </button>
          </form>
        </div>
      </main>
      <Footer />
      </>
    );
  };
  
  export default DonationConfirm;