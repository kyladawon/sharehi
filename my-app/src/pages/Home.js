import React from 'react';
import LandingHeader from '../components/LangingHeader';
import LandingFooter from '../components/LandingFooter';

const Home = () => {
    return (
      <>
      <LandingHeader />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
        <div className="container h-full flex flex-col items-center">
        <img 
        src="/sharehi_logo.jpeg"
        alt="share_hi"
        className="w-40 h-40 mb-6 object-contain">
        </img>
        <h2 className="text-3xl text-customGreen font-semibold mb-10">Welcome to SHARE HI!</h2>
        </div>
        </main>
      <LandingFooter />
      </>
      )
}
export default Home;