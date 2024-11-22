// components/Footer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const { currentUser} = useAuth();
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserRole(docSnap.data().role); // Assumes 'role' is stored in the Firestore document
          } else {
            console.log('No user role found!');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleProfileNavigation = () => {
    if (userRole === 'receiver') {
      navigate('/');
    } else if (userRole === 'donator') {
      navigate('/search');
    }
  };
  return (
    <footer className="w-full bg-[#7A865D] text-white mt-20 py-5">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-between items-center w-full max-w-screen-lg px-10">
          <nav className="flex space-x-6">
          {currentUser && (
          <>
            <button onClick={handleProfileNavigation} className="hover:underline">Home</button>
          </>
          )}
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
        <div className="text-sm">SHAREHI © 2024. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
