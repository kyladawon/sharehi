import React, { useState, useEffect } from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const DonatorProfileEdit = () => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [contactinfo, setContactInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({ username: '', contactinfo: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProfileData({
                        username: data.username || '',
                        contactinfo: data.contactinfo || data.email || '',
                        description: data.description || '',
                    });
                    setUsername(data.username || '');
                    setContactInfo(data.contactinfo || data.email || '');
                    setDescription(data.description || '');
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!username && !description && !contactinfo) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    username: username || profileData.username,
                    description: description || profileData.description,
                    contactinfo: contactinfo || profileData.contactinfo,
                }, { merge: true });
                console.log('Updated profile:', { username, description, contactinfo });
                setError('');
                navigate('/donatorprofile');
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
            setError("Failed to save changes. Please try again.");
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <>
        <SearchHeader />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-semibold text-center mb-6">Edit Donator Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleEdit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Your Name:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={profileData.username || "Enter your name"}
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
                            placeholder={profileData.description || "A brief description about yourself"}
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
                            placeholder={profileData.contactinfo || "Enter your contact information"}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="w-auto px-6 bg-customGreen text-white py-3 rounded-md hover:bg-black transition duration-200"
                    >Save Changes
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