import React, { useState } from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';

const DonatorProfileEdit = () => {
    const { profile, updateProfile } = useProfile();
    const [orgname, setOrgname] = useState(profile.orgname);
    const [description, setDescription] = useState(profile.description);
    const [contactinfo, setContactInfo] = useState(profile.contactinfo);
    const [error, setError] = useState('');
    const navigate = useNavigate();


const handleEdit = (e) => {
    e.preventDefault();
    if (!orgname || !description || !contactinfo) {
        setError('Please fill in all fields');
        return;
    }
    updateProfile({ orgname, description, contactinfo });
    console.log('Updated the RecieverProfile with', { orgname, description, contactinfo});
    setError('');
    navigate('/donatorprofile');
};
    return (
        <>
        <SearchHeader />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-semibold text-center mb-6">Edit Donator Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleEdit} className="space-y-6">
                    <div>
                        <label htmlFor="orgname" className="block text-gray-700 font-medium mb-1">Your Name:</label>
                        <input
                            type="text"
                            id="orgname"
                            value={orgname}
                            onChange={(e) => setOrgname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="contactinfo" className="block text-gray-700 font-medium mb-1">Contact Information:</label>
                        <input
                            type="text"
                            id="contactinfo"
                            value={contactinfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                    <button
                        href="/donatorprofile"
                        type="submit"
                        className="w-auto px-6 bg-customGreen text-white py-3 rounded-md hover:bg-black transition duration-200"
                    >
                        Save Changes
                    </button>
                    </div>
                </form>
            </div>
        </main>
        <Footer />
      </>
      )
}
export default DonatorProfileEdit;