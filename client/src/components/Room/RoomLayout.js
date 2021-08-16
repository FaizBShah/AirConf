import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import socketIOClient from 'socket.io-client';
import Chat from './chat/Chat';
import Meeting from './meeting/Meeting';

const ENDPOINT = "http://localhost:5000";

function RoomLayout({ stream, setStream }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT), () => {
      socket.on("message", (message) => {
        console.log(message);
      });
    });

    return () => {
      socket.disconnect();
      setSocket(null);
    }
  }, []);

  return (
    <>
      <Meeting socket={socket} chatOpen={chatOpen} />
      <BottomMenu socket={socket} chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <Chat socket={socket} open={chatOpen} setChatOpen={setChatOpen} />
    </>
  )
}

export default RoomLayout;