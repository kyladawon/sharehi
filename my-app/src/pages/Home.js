//import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
      <>
      <Header />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
        <div className="container h-full">
        <h2 className="text-3xl text-customGreen font-semibold mb-10 ml-12">Welcome to SHARE HI!</h2>
        </div>
        </main>
      <Footer />
      </>
      )
}
export default Home;