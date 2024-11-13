import React from 'react';
import { Link } from 'react-router-dom';

const EmailSent = () => {
  const handleSubmit = (e) => {
    console.log('Email Sent');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-10 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Sent !</h1>
        <p className="text-gray-700 font-medium text-center mb-8">The reset password link is just sent to your email.</p>
      </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <button
            type="submit"
            className="w-full bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200"
          >
            <Link to="/">Back to Home</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSent;