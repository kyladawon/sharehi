import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingFooter from '../components/LandingFooter';
import LandingHeader from '../components/LangingHeader';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    console.log('Registering with:', { username, email, password });
    setError('');
    // You would add your registration logic here (e.g., API call)
  };

  return (
    <>
    <LandingHeader />
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-center mb-8">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
            />
          </div>
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
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 rounded-md active:bg-black transition duration-200"
          >
            <Link to="/login">Sign Up as Receiver</Link>
          </button>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 rounded-md active:bg-black transition duration-200"
          >
            <Link to="/login">Sign Up as Donator</Link>
          </button>
        </form>
        <div className="text-center text-orange-500 mt-4">
          <span>Already have an account? </span>
          <Link to="/login"className="text-orange-500 hover:underline">Login
          </Link>
        </div>
      </div>
    </main>
    <LandingFooter />
    </>
  );
};

export default Register;