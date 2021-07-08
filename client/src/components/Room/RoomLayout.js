import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import socketIOClient from 'socket.io-client';
import Chat from './Chat';

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
      <div>
        <BottomMenu setChatOpen={setChatOpen} />
      </div>
      <Chat open={chatOpen} />
    </>
  )
}

export default RoomLayout;