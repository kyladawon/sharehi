import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LangingHeader';
import LandingFooter from '../components/LandingFooter';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please fill in all fields');
      return;
    }
    console.log('forgot password for:', { email});
    setError('');
  };

  return (
    <>
    <LandingHeader />
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Forgotten your password?</h1>
        <p className="text-gray-700 font-medium text-center mb-8">There is nothing to worry about, we'll send you a message to help you reset your password.</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200"
          >
            <Link to="/emailsent">Send Reset Link</Link>
          </button>
        </form>
      </div>
    </div>
    <LandingFooter />
    </>
  );
};

export default Forgotpassword;