import React, { useState, useEffect, useRef } from 'react';
import BottomMenu from './BottomMenu';
import { io } from 'socket.io-client';
import Chat from './chat/Chat';
import Meeting from './meeting/Meeting';
import Peer from 'peerjs';

const ENDPOINT = "http://localhost:5000";

function RoomLayout({ username, stream, setStream }) {
  const [roomId, setRoomId] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const ref = useRef({
    socket: null,
    peer: null
  });
  
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setRoomId(getRoomId(window.location.pathname));
    setVideos([{ username, stream }, ...videos]);

    ref.current.peer = new Peer(undefined, {
      path: '/peerjs',
      host: window.location.hostname,
      port: '5000'
    });

    ref.current.socket = io(ENDPOINT);

    const peer = ref.current.peer;
    const socket = ref.current.socket;

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("user-connected", (id, username) => {
      console.log(id);
      console.log(username);
      connectToNewUser(id, username, stream, peer, socket);
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (recepientStream) => {
        console.log(recepientStream);
      })
    })

    peer.on("open", (id) => {
      console.log("Hello");
      socket.emit("join-room", getRoomId(window.location.pathname), id, username);
    });

    return () => socket.disconnect();
  }, []);

  const connectToNewUser = (userId, username, stream, peer, socket) => {
    const call = peer.call(userId, stream);
    call.on("stream", (recepientStream) => {
      console.log(recepientStream);
    });
  }

  const getRoomId = (path) => {
    return path.split('/')[2];
  }

  return (
    <>
      <Meeting socket={ref.current.socket} chatOpen={chatOpen} videos={videos} roomId={roomId} />
      <BottomMenu
        socket={ref.current.socket}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        stream={stream}
        setStream={setStream}
        videos={videos}
        setVideos={setVideos}
        username={username}
      />
      <Chat socket={ref.current.socket} open={chatOpen} setChatOpen={setChatOpen} />
    </>
  )
}

export default RoomLayout;