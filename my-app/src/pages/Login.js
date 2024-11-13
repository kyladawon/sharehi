import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import LandingHeader from '../components/LangingHeader';
import LandingFooter from '../components/LandingFooter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e, role) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData.role === role) {
        // Redirect based on the user's role
        if (role === 'receiver') {
          navigate('/recieverprofile');
        } else {
          navigate('/search');
        }
      } else {
        setError("Role does not match. Please select the correct role.");
      }
    } catch (error) {
      // Handle errors (e.g., wrong email/password, user not found)
      console.error("Login error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
    <LandingHeader />
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Welcome Back</h1>
        <p className="text-gray-700 font-medium text-center mb-8">Please log in to continue</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
        <form className="space-y-6">
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
            <div className="text-right mt-2">
              <Link to="/forgotpassword" className="text-sm text-orange-500 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => handleLogin(e, 'receiver')}
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200"
          >Login as Receiver
          </button>
          <button
            type="submit"
            onClick={(e) => handleLogin(e, 'donator')}
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200"
          >Login as Donator
          </button>
        </form>
        <div className="text-center text-orange-500 mt-4">
          <span>No account yet? </span>
          <Link to="/register" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
    <LandingFooter />
    </>
  );
};

export default Login;