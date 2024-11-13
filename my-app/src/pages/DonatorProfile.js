import React from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const DonatorProfile = () => {
    const { profile } = useProfile();
    const defaultOrgName = "Your Name";
    const defaultDescription = "A brief description of yourself.";
    return (
        <>
        <SearchHeader />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <button
                    type="button"
                    className="absolute top-6 right-6 w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                >
                    <Link to="/donatoredit">Edit Profile</Link>
                </button>
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">
                        {profile.orgname || defaultOrgName}
                    </h1>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.description || defaultDescription}
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.contactinfo || "Contact information not available"}
                    </p>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </main>
        <Footer />
        </>
      )
}
export default DonatorProfile;