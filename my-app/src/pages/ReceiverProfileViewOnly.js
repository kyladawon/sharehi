import React, { useState, useEffect} from 'react';
import { db} from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import Header from '../components/Header';
import LandingFooter from '../components/LandingFooter';
import { useParams } from 'react-router-dom';

const getRandomImageUrl = () => `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;

const ReceiverProfileViewOnly = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [profileImageUrl] = useState(getRandomImageUrl());
    const { receiverId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, "users", receiverId); // Fetch by receiverId
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfile(data);
                setProducts(data.products || []);
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        fetchProfile();
    }, [receiverId]);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    const defaultDescription = "A brief description of your organization.";
    return (
        <>
        <Header />
        <main className="flex justify-center items-center h-full bg-gray-100 py-10">
            <div className="relative w-full max-w-4xl p-10 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                    <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover cursor-pointer"
                    />
                </div>
                </div>
                <div className="text-center mt-4">
                    {profile ? (
                    <div>
                        <h1 className="text-3xl font-semibold text-center mb-6">
                            {profile.username}
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
                    ) : (
                        <p>No profile data found.</p>
                    )}
                </div>
                <div className="w-full h-96 bg-gray-100 border border-gray-300 rounded-md mb-6 p-4 overflow-y-auto auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <div 
                                    key={index}
                                    className="relative overflow-hidden rounded-md shadow-lg collage-item"
                                >
                                    <img 
                                        src={getRandomImageUrl()} 
                                        alt={product.type} 
                                        className="w-full h-full object-cover"
                                    />
                                     <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                        <p className="text-white font-bold">{product.type || "N/A"}</p>
                                        <p className="text-gray-200">Quantity: {product.quantity || "N/A"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2 text-center">No products added yet.</p>
                        )}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-semibold text-center mb-6">What we need ..</h1>
                </div>
                <div className="w-full h-96 bg-white-500 rounded-md mb-6 p-4 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 h-full">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                            key={index} 
                            className="relative flex flex-col justify-between p-2 bg-white border border-gray-300 rounded-md shadow-sm h-20 px-2">
                                <span className="text-xs text-gray-500 mb-1">{product.additionalDescription || "Additional Info"}</span>
                                <span className="font-medium font-semibold px-5">{product.type || "N/A"}</span>
                                <span className="text-xs text-gray-500 mt-1">{product.description || "No description"}</span>
                                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-400 text-white border rounded-md px-1 py-0.2">
                                    {product.quantity || "N/A"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-2 text-center">No products added yet.</p>
                    )}
                </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="w-auto px-6 bg-customGreen text-white py-2 rounded-md hover:bg-black transition duration-200 text-sm"
                    >
                        Donate
                    </button>
                </div>
            </div>
        </main>
        <LandingFooter />
        </>
      )
}
export default ReceiverProfileViewOnly;