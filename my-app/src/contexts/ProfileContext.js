// contexts/ProfileContext.js
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        orgname: '',
        orgcategory: '',
        description: '',
        address: '',
        contactinfo: '',
    });

    const updateProfile = (newProfileData) => {
        setProfile(newProfileData);
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
