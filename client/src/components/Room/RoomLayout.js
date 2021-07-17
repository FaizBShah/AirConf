import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import socketIOClient from 'socket.io-client';
import Chat from './chat/Chat';
import Meeting from './meeting/Meeting';

const ENDPOINT = "http://localhost:5000";

function RoomLayout() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Meeting chatOpen={chatOpen} />
      <BottomMenu chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <Chat open={chatOpen} setChatOpen={setChatOpen} />
    </>
  )
}

export default RoomLayout;