import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e,role) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        role
      });
      console.log(`User registered as ${role}`);
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("The email address is already in use. Please try a different one or log in.");
      } else {
        console.error("Error registering user:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <>
    <Header />
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
            type="button"
            onClick={(e) => handleSubmit(e, 'receiver')}
            className="w-full bg-customGreen text-white py-2 rounded-md active:bg-black transition duration-200"
          >Sign Up as Receiver
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'donator')}
            className="w-full bg-customGreen text-white py-2 rounded-md active:bg-black transition duration-200"
          >Sign Up as Donator
          </button>
        </form>
        <div className="text-center text-orange-500 mt-4">
          <span>Already have an account? </span>
          <Link to="/login"className="text-orange-500 hover:underline">Login
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Register;