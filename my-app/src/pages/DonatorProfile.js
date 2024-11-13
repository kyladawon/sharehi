import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const DonatorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
            setLoading(false); // Stop loading whether user is found or not
        });

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

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
                    {profile ? (
                        <div>
                            <h1 className="text-3xl font-semibold text-center mb-6">
                                {profile.username}
                            </h1>
                            <p className="text-gray-700 font-medium text-center mb-8">
                                {profile.description || "A brief description of yourself."}
                            </p>
                            <p className="text-gray-700 font-medium text-center mb-8">
                                {profile.contactinfo || "No contact information available."}
                            </p>
                        </div>
                    ) : (
                        <p>No profile data found.</p>
                    )}
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