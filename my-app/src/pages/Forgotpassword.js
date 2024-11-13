import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import LandingHeader from '../components/LangingHeader';
import LandingFooter from '../components/LandingFooter';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email.');

      // Navigate to /home after displaying the message for a short time
      setTimeout(() => {
        navigate('/emailsent');
      }, 2000); // Adjust delay if needed
    } catch (error) {
      console.error('Error sending reset email:', error.message);
      setError('Failed to send reset email. Please check the email address or try again later.');
    }
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
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
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
          >Send Reset Link
          </button>
        </form>
      </div>
    </div>
    <LandingFooter />
    </>
  );
};

export default Forgotpassword;