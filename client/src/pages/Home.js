import React from 'react';
import '../styles/Home.scss';
import Navbar from '../components/Navbar';
import Showcase from '../components/Showcase';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <div className="background">
        <div className="overlay"></div>
        <div className="main-area">
          <Navbar />
          <Showcase />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home;