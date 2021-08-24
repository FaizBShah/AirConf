import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import { io } from 'socket.io-client';
import Chat from './chat/Chat';
import Meeting from './meeting/Meeting';
import Peer from 'peerjs';

const ENDPOINT = "http://localhost:5000";

function RoomLayout({ username, stream, setStream }) {
  const [roomId, setRoomId] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  let socket;
  let peer;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setRoomId(getRoomId(window.location.pathname));
    setVideos([{ username, stream }, ...videos]);
    peer = new Peer(undefined, {
      path: '/peerjs',
      host: window.location.hostname,
      port: '5000'
    });

    socket = io(ENDPOINT);

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("user-connected", (id, username) => {
      console.log(id);
      console.log(username);
    });

    peer.on("open", (id) => {
      console.log("Hello");
      socket.emit("join-room", getRoomId(window.location.pathname), id, username);
    });

    return () => socket.disconnect();
  }, []);

  const getRoomId = (path) => {
    return path.split('/')[2];
  }

  return (
    <>
      <Meeting socket={socket} chatOpen={chatOpen} videos={videos} roomId={roomId} />
      <BottomMenu
        socket={socket}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        stream={stream}
        setStream={setStream}
        videos={videos}
        setVideos={setVideos}
        username={username}
      />
      <Chat socket={socket} open={chatOpen} setChatOpen={setChatOpen} />
    </>
  )
}

export default RoomLayout;