import React, { useState } from 'react';
import SearchHeader from '../components/SearchHeader';
import Footer from '../components/Footer';
//import { Link } from 'react-router-dom';

const items = [
    { id: 1, title: "Trending Item 1", description: "Description of trending item 1", imgSrc: "/sample_image.jpg" },
    { id: 2, title: "Trending Item 2", description: "Description of trending item 2", imgSrc: "/sample_image.jpg" },
    { id: 3, title: "Trending Item 3", description: "Description of trending item 3", imgSrc: "/sample_image.jpg" },
    { id: 4, title: "Trending Item 4", description: "Description of trending item 4", imgSrc: "/sample_image.jpg" },
    { id: 5, title: "Trending Item 5", description: "Description of trending item 5", imgSrc: "/sample_image.jpg" },
    { id: 6, title: "Trending Item 6", description: "Description of trending item 6", imgSrc: "/sample_image.jpg" },
    { id: 7, title: "Trending Item 7", description: "Description of trending item 7", imgSrc: "/sample_image.jpg" },
    { id: 8, title: "Trending Item 8", description: "Description of trending item 8", imgSrc: "/sample_image.jpg" },
    // Add more items as needed
];

const Search = () => {
    const [visibleCount, setVisibleCount] = useState(4); // Initially show 4 items

    const loadMoreItems = () => {
        setVisibleCount(prevCount => prevCount + 4); // Load 4 more items each time
    };

    return (
        <>
        <SearchHeader />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
            <div className="container h-full">
                <div className="trending-section pb-20 h-full">
                    <h2 className="text-2xl font-semibold float-left mb-6 ml-12"># Trending</h2>
                    <div className="clear-both"></div>
                    <div className="Trending-me flex flex-wrap justify-between items-center">
                        {items.slice(0, visibleCount).map((item, index) => (
                            <div key={item.id} className="Trending-inner w-1/5 h-auto m-3 bg-white border border-gray-300 text-left rounded-lg shadow-lg">
                                <img src={item.imgSrc}
                                alt="Trending"
                                className="w-full h-40 object-cover rounded-t-lg">
                                </img>
                                <div className="p-4 pb-8">
                                <strong className="text-lg font-medium text-gray-700">{item.title}</strong>
                                <p className="Explanation mt-2 mb-4 text-sm text-gray-600">{item.description}</p>
                                  <p className="mt-8 font-semibold text-sm">
                                    <a href="#" className="text-customGreen hover:underline">
                                        More info <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                  </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleCount < items.length && (
                        <div className="flex justify-end mt-3 mr-10">
                            <p className="font-semibold text-medium text-customGreen hover:underline"
                                onClick={loadMoreItems}
                            >
                                Load More
                            </p>
                        </div>
                    )}
                </div>
                <div className="clothes-section pb-20 h-full">
                    <h2 className="text-2xl font-semibold float-left mb-6 ml-12"># Clothes</h2>
                    <div className="clear-both"></div>
                    <div className="Trending-me flex flex-wrap justify-between items-center">
                        {items.slice(0, visibleCount).map((item, index) => (
                            <div key={item.id} className="Trending-inner w-1/5 h-auto m-3 bg-white border border-gray-300 text-left rounded-lg shadow-lg">
                                <img src={item.imgSrc}
                                alt="Trending"
                                className="w-full h-40 object-cover rounded-t-lg">
                                </img>
                                <div className="p-4 pb-8">
                                <strong className="text-lg font-medium text-gray-700">{item.title}</strong>
                                <p className="Explanation mt-2 mb-4 text-sm text-gray-600">{item.description}</p>
                                  <p className="mt-8 font-semibold text-sm">
                                    <a href="#" className="text-customGreen hover:underline">
                                        More info <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                  </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleCount < items.length && (
                        <div className="flex justify-end mt-3 mr-10">
                            <p className="font-semibold text-medium text-customGreen hover:underline"
                                onClick={loadMoreItems}
                            >
                                Load More
                            </p>
                        </div>
                    )}
                </div>
                <div className="food-section pb-20 h-full">
                    <h2 className="text-2xl font-semibold float-left mb-6 ml-12"># Food</h2>
                    <div className="clear-both"></div>
                    <div className="Trending-me flex flex-wrap justify-between items-center">
                        {items.slice(0, visibleCount).map((item, index) => (
                            <div key={item.id} className="Trending-inner w-1/5 h-auto m-ß bg-white border border-gray-300 text-left rounded-lg shadow-lg">
                                <img src={item.imgSrc}
                                alt="Trending"
                                className="w-full h-40 object-cover rounded-t-lg">
                                </img>
                                <div className="p-4 pb-8">
                                <strong className="text-lg font-medium text-gray-700">{item.title}</strong>
                                <p className="Explanation mt-2 mb-4 text-sm text-gray-600">{item.description}</p>
                                  <p className="mt-8 font-semibold text-sm">
                                    <a href="#" className="text-customGreen hover:underline">
                                        More info <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                  </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleCount < items.length && (
                        <div className="flex justify-end mt-3 mr-10">
                            <p className="font-semibold text-medium text-customGreen hover:underline"
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