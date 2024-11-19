import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const RecieverProfileEdit = () => {
    const [username, setUsername] = useState('');
    const [orgcategory, setOrgcategory] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [contactinfo, setContactInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({ username: '', orgcategory: '', description: '', address: '', contactinfo: ''});
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
                        orgcategory: data.orgcategory || '',
                        description: data.description || '',
                        address: data.address || '',
                        contactinfo: data.contactinfo || data.email || '',
                    });
                    setUsername(data.username || '');
                    setOrgcategory(data.orgcategory || '');
                    setDescription(data.description || '');
                    setAddress(data.address || '');
                    setContactInfo(data.contactinfo || data.email || '');
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

const handleEdit = async (e) => {
    e.preventDefault();
    if (!username || !orgcategory || !description || !address || !contactinfo) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                username: username || profileData.username,
                orgcategory: orgcategory || profileData.orgcategory,
                description: description || profileData.description,
                address: address || profileData.address,
                contactinfo: contactinfo || profileData.contactinfo,
            }, { merge: true });
            console.log('Updated profile:', { username, orgcategory, description, address, contactinfo });
            setError('');
            navigate('/recieverprofile');
        }
    } catch (error) {
        console.error("Error updating profile:", error.message);
        setError("Failed to save changes. Please try again.");
    }
};

if (loading) return <p>Loading profile...</p>;
const defaultDescription = "A brief description of your organization.";

    return (
        <>
        <Header />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <h1 className="text-3xl font-semibold text-center mb-6">Edit Receiver Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleEdit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Organization Name:</label>
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
                        <label htmlFor="orgcategory" className="block text-gray-700 font-medium mb-1">Organization Category:</label>
                        <input
                            id="orgcategory"
                            value={orgcategory}
                            onChange={(e) => setOrgcategory(e.target.value)}
                            placeholder={profileData.orgcategory || "Category: ex: Women's Shelter, Homeless Shelter..."}
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
                            placeholder={profileData.description || defaultDescription}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={profileData.address || "Enter your Address/Zip Code"}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
                            required
                        />
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
                        href="/recieverprofile"
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
export default RecieverProfileEdit;