// components/Header.js
import React, { useEffect, useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


const Header = () => {
  const { currentUser, logout } = useAuth();
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

  const handleProfileNavigation = () => {
    if (userRole === 'receiver') {
      navigate('/recieverprofile');
    } else if (userRole === 'donator') {
      navigate('/donatorprofile');
    }
  };

  return (
    <header className="w-full h-20 flex justify-between items-center text-center px-10 bg-white border-b border-gray-200">
      <h4 className="text-2xl font-semibold text-gray-700">
        <Link to="/">Share Hi</Link>
      </h4>
      <div className="flex space-x-6 text-[#F5A65B]">  {/* Add flex and spacing here */}
        {currentUser && (
          <>
            <a href="/setting" className="flex items-center space-x-1">
              <i className="fa-regular fa-user"></i>
              <span>Setting</span>
            </a>
            <button
              onClick={handleProfileNavigation}
              className="flex items-center space-x-1 hover:underline"
            >
              <i className="fa-regular fa-user"></i>
              <span>My Account</span>
            </button>
            <button
              onClick={logout}
              className="hover:underline text-[#F5A65B]"
            >
              Logout
            </button>
          </>
        )}
        {!currentUser && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
