import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    console.log('Logging in with:', { email, password });
    setError('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Welcome Back</h1>
        <p className="text-gray-700 font-medium text-center mb-8">Please log in to continue</p>
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
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login as Receiver
          </button>
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login as Donator
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link href="/register">
            <a className="text-customGreen hover:underline">Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;