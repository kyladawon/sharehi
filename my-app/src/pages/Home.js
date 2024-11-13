import React from 'react';
import LandingHeader from '../components/LangingHeader';
import LandingFooter from '../components/LandingFooter';

const Home = () => {
    return (
      <>
      <LandingHeader />
        <main className="flex justify-center items-center w-full h-full min-h-screen text-center">
        <div className="container h-full">
        <h2 className="text-3xl text-customGreen font-semibold mb-10 ml-12">Welcome to SHARE HI!</h2>
        </div>
        </main>
      <LandingFooter />
      </>
      )
}
export default Home;