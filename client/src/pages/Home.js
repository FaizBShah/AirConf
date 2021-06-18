import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("message", (message) => {
      setMessage(message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  )
}

export default Home;