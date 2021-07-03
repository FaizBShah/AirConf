import React, { useEffect } from 'react';
import '../styles/Room.scss';
import socketIOClient from 'socket.io-client';
import BottomMenu from '../components/Room/BottomMenu';

const ENDPOINT = "http://localhost:5000";

function Room() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Room</h1>
      <BottomMenu />
    </div>
  )
}

export default Room;