import React, { useEffect, useState } from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Correctly use backticks for template literals
const getRandomImageUrl = () => `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

const Search = () => {
    const [receivers, setReceivers] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 items
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReceivers = async () => {
            try {
                const receiversCollection = collection(db, 'users');
                const querySnapshot = await getDocs(receiversCollection);
                const receiveData = querySnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        profileImage: getRandomImageUrl(),
                    }))
                    .filter(user => user.role === 'receiver'); // Filter by "receiver" role
                setReceivers(receiveData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching receivers:', error);
                setLoading(false);
            }
        };

        fetchReceivers();
    }, []);

    const loadMoreItems = () => {
        setVisibleCount(prevCount => prevCount + 4); // Load 4 more items each time
    };

    const handleViewReceiverProfile = (receiverId) => {
        navigate(`/receiver/${receiverId}`);
    }

    if (loading) {
        return <p>Loading receivers ...</p>;
    }

    return (
        <>
        <SearchHeader />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
            <div className="container h-full">
                <div className="trending-section pb-20 h-full">
                    <h2 className="text-2xl font-semibold float-left mb-6 ml-12"># Trending</h2>
                    <div className="clear-both"></div>
                    <div className="Trending-me flex flex-wrap justify-between items-center">
                        {receivers.slice(0, visibleCount).map(receiver => (
                            <div key={receiver.id} className="Trending-inner w-1/5 h-auto m-3 bg-white border border-gray-300 text-left rounded-lg shadow-lg">
                                <img 
                                    src={receiver.profileImage}
                                    alt="Receiver"
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <div className="p-4 pb-8">
                                    <strong className="text-lg font-medium text-gray-700">{receiver.username || 'Anonymous'}</strong>
                                    <p className="Explanation mt-2 mb-4 text-sm text-gray-600">
                                        {receiver.description || "No description available"}
                                    </p>
                                    <p className="mt-8 font-semibold text-sm">
                                        <button 
                                            onClick={() => handleViewReceiverProfile(receiver.id)}
                                            className="text-customGreen hover:underline"
                                        >
                                            More info <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleCount < receivers.length && (
                        <div className="flex justify-end mt-3 mr-10">
                            <p
                                className="font-semibold text-medium text-customGreen hover:underline cursor-pointer"
                                onClick={loadMoreItems}
                            >
                                Load More
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default Search;
