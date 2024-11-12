import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import { Link } from 'react-router-dom';

const Search = () => {
    return (
        <>
        <Header />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
            <div className="container h-full">
                <div className="middle pb-32 h-full">
                    <h2 className="text-2xl font-semibold float-left mb-10 ml-12"># Trending</h2>
                    <div className="clear-both"></div>
                    <div className="Trending-me flex flex-wrap justify-between items-center">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="Trending-inner w-1/5 h-auto m-5 bg-white border border-gray-300 text-left rounded-lg shadow-lg">
                                <img src="/sample_image.jpg"
                                alt="Trending"
                                className="w-full h-40 object-cover rounded-t-lg">
                                </img>
                                <div className="p-4 pb-8">
                                <strong className="text-lg font-medium text-gray-700">Title</strong>
                                <p className="Explanation mt-2 mb-4 text-sm text-gray-600">bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla.</p>
                                  <p className="mt-8 font-semibold text-sm">
                                    <a href="#" className="text-customGreen hover:underline">
                                        More info <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                  </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default Search;