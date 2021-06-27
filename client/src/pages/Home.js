import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../styles/Home.scss';
import Navbar from '../components/Navbar';
import Showcase from '../components/Showcase';

const ENDPOINT = "http://localhost:5000";

function Home() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="main-area">
        <Navbar />
        <Showcase />
      </div>
    </div>
  )
}

export default Home;