import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';

const getRandomImageUrl = () => `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;

const ReceiverProfileView = () => {
    const { receiverId } = useParams();
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImageUrl] = useState(getRandomImageUrl());
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const docRef = doc(db, 'users', receiverId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setReceiver(data);
                    setItems(data.products || []);
                } else {
                    console.log('No such document!');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching receiver data:', error);
                setLoading(false);
            }
        };

        fetchReceiver();
    }, [receiverId]);

    const handleDonate = () => {
        navigate(`/donate/${receiverId}`); // Adjust the donation page route as needed
    };

    if (loading) {
        return <p>Loading receiver profile...</p>;
    }

    return (
        <>
            <SearchHeader />
            <main className="flex justify-center items-center h-full bg-gray-100 py-10">
                <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4">
                            <img
                                src={receiver.profileImage || profileImageUrl}
                                alt="Profile"
                                className="rounded-full w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        {receiver ? (
                            <div>
                                <h1 className="text-3xl font-semibold text-center mb-6">
                                    {receiver.username}
                                </h1>
                                <p className="text-gray-700 font-medium text-center mb-8">
                                    {receiver.orgcategory || 'Category not specified'}
                                </p>
                                <p className="text-gray-700 font-medium text-center mb-8">
                                    {receiver.description || 'No description available'}
                                </p>
                                <p className="text-gray-700 font-medium text-center mb-8">
                                    {receiver.address || 'Address not provided'}
                                </p>
                                <p className="text-gray-700 font-medium text-center mb-8">
                                    {receiver.contactinfo || 'Contact information not available'}
                                </p>
                            </div>
                        ) : (
                            <p>No profile data found.</p>
                        )}
                    </div>
                    <div className="w-full h-96 bg-gray-100 border border-gray-300 rounded-md mb-6 p-4 overflow-y-auto auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div 
                                    key={index}
                                    className="relative overflow-hidden rounded-md shadow-lg collage-item"
                                >
                                    <img 
                                        src={getRandomImageUrl()} 
                                        alt={item.type} 
                                        className="w-full h-full object-cover"
                                    />
                                     <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                        <p className="text-white font-bold">{item.type || "N/A"}</p>
                                        <p className="text-gray-200">Quantity: {item.quantity || "N/A"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2 text-center">No products added yet.</p>
                        )}
                    </div>
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold mb-6">Requested Items</h2>
                    </div>
                    <div className="w-full h-96 bg-white-500 rounded-md mb-6 p-4 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 h-full">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative flex flex-col justify-between p-2 bg-white border border-gray-300 rounded-md shadow-sm h-24 px-2"
                                >
                                    <span className="font-medium">{item.type || 'N/A'}</span>
                                    <span className="text-xs text-gray-500 mt-1">{item.description || 'No description available'}</span>
                                    <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-400 text-white border rounded-md px-3 py-0.5">
                                        {item.quantity || 'N/A'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2 text-center">No items requested.</p>
                        )}
                    </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="button"
                            onClick={handleDonate}
                            className="w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                        >
                            Donate
                        </button>
                    </div>
                </div>
        </main>
        <Footer />
        </>
    );
}

export default ReceiverProfileView;
