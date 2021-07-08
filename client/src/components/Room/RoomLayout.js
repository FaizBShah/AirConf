import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import socketIOClient from 'socket.io-client';
import Chat from './Chat';
import { useWindowDimensions } from '../../utils/windowUtils';

const ENDPOINT = "http://localhost:5000";

function RoomLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => socket.disconnect();
  }, []);

  const chatWidth = () => {
    if (width > 768) {
      return '300px';
    }

    if (width > 600) {
      return '240px'
    }

    return '100%';
  }

  return (
    <>
      <div style={{width: chatOpen ? 'calc(100% - 300px)' : '100%'}}>
      </div>
      <BottomMenu chatOpen={chatOpen} setChatOpen={setChatOpen} chatWidth={chatWidth} />
      <Chat open={chatOpen} />
    </>
  )
}

export default RoomLayout;