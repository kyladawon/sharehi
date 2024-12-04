import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';

const getRandomImageUrl = () => `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;

const QuantityControl = ({ quantity, setQuantity }) => {
    return (
        <div className="flex items-center space-x-2 mt-2">
            <button
                onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                className="bg-gray-300 p-1 rounded-md text-base"
            >
                -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 p-1 rounded-md text-base"
            >
                +
            </button>
        </div>
    );
};

const Donate1 = () => {
    const { receiverId } = useParams();
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [profileImageUrl] = useState(getRandomImageUrl());

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const docRef = doc(db, 'users', receiverId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setReceiver(data);
                    setItems(data.products || []); // Assuming 'products' is the field for requested items
                    const initialQuantities = data.products.reduce((acc, item, index) => {
                        acc[index] = 0; // Initialize quantities for each item to 0
                        return acc;
                    }, {});
                    setSelectedQuantities(initialQuantities);
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
        console.log("Donation Summary:", selectedQuantities);
        const donationItems = {
            items: items.map((item, index) => ({
                type: item.type,
                description: item.description,
                quantity: selectedQuantities[index] || 0,
            })).filter(item => item.quantity > 0), // Only include items with quantities > 0
        };
        console.log("Prepared Donation Items:", donationItems);
    
        navigate(`/donatedatepicker/${receiverId}`, {
            state: {
                receiverId,
                donationItems,
            },
        });
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
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold mb-6">Select Items to Donate</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-auto bg-gray-100 border border-gray-300 rounded-md p-4 overflow-y-auto">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm"
                                >
                                    <img
                                        src={getRandomImageUrl()}
                                        alt={item.type}
                                        className="w-20 h-20 object-cover rounded-md mr-4"
                                    />
                                    <div className="flex-1">
                                        <span className="font-medium">{item.type || 'N/A'}</span>
                                        <span className="text-xs text-gray-500 mt-1">{item.description || 'No description available'}</span>
                                        <QuantityControl
                                            quantity={selectedQuantities[index]}
                                            setQuantity={(newQuantity) => {
                                                setSelectedQuantities((prev) => ({
                                                    ...prev,
                                                    [index]: newQuantity,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2 text-center">No items requested.</p>
                        )}
                    </div>
                    {/* 3. Next 버튼 구간 */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleDonate}
                            className="w-auto px-8 bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 text-lg"
                        >
                            Choose Date of Donation
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Donate1;
