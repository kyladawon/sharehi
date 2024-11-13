import React from 'react';
import Header from '../components/Header';
import LandingFooter from '../components/LandingFooter';
import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const RecieverProfile = () => {
    const { profile } = useProfile();
    const defaultOrgName = "Your Organization Name";
    const defaultDescription = "A brief description of your organization.";
    return (
        <>
        <Header />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <button
                    type="button"
                    className="absolute top-6 right-6 w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                >
                    <Link to="/recieveredit">Edit Profile</Link>
                </button>
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">
                        {profile.orgname || defaultOrgName}
                    </h1>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.orgcategory || "Category not specified"}
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.description || defaultDescription}
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.address || "Address not provided"}
                    </p>
                    <p className="text-gray-700 font-medium text-center mb-8">
                        {profile.contactinfo || "Contact information not available"}
                    </p>
                </div>
                <div className="w-full h-96 bg-gray-100 border border-gray-300 rounded-md mb-6"></div>

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
        <LandingFooter />
        </>
      )
}
export default RecieverProfile;