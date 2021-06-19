import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../styles/Home.scss'

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
        
      </div>
    </div>
  )
}

export default Home;