import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';

const DonationConfirm = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

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
          {selectedDate ? (
          <p className="text-orange-700 font-medium text-center mb-16">
          Donation scheduled for: <span className="font-semibold">{new Date(selectedDate).toDateString()}</span>
          </p>
          ) : (
          <p className="text-red-500 font-medium text-center mb-16">
          No date selected for the donation.
          </p>
          )}
        </div>
          <form className="space-y-6">
          <div className="flex justify-center">
            <button
              type="button"
              className="w-auto px-4 bg-white text-customGreen border border-customGreen py-2 rounded-md shadow-lg hover:bg-gray-500 hover:text-white transition duration-200"
            >
              <Link to="/search">Back to Search</Link>
            </button>
          </div>
          </form>
        </div>
      </main>
      <Footer />
      </>
    );
  };
  
  export default DonationConfirm;