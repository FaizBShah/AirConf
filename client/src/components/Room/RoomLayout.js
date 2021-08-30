import React, { useState, useEffect, useRef } from 'react';
import BottomMenu from './BottomMenu';
import { io } from 'socket.io-client';
import Chat from './chat/Chat';
import Meeting from './meeting/Meeting';
import Peer from 'peerjs';
import { useAppContext } from '../../context/store';

const ENDPOINT = "http://localhost:5000";

function RoomLayout({ username, stream, setStream }) {
  const [roomId, setRoomId] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const { state: { videos }, dispatch } = useAppContext();
  const ref = useRef({
    socket: null,
    peer: null,
    userId: '',
    currVideos: new Set()
  });

  useEffect(() => {
    dispatch({
      type: "ADD_VIDEO",
      payload: { id: -1, username, stream }
    });
    setRoomId(getRoomId(window.location.pathname));

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
      connectToNewUser(id, username, stream, peer, socket);
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (recepientStream) => {
        socket.on("get-info", (srcId, destId, username, streamInfo) => {
          if (ref.current.userId === destId) {
            if (streamInfo.video === 'ended') {
              recepientStream.getVideoTracks()[0].stop();
            }

            if (!streamInfo.audio) {
              recepientStream.getAudioTracks()[0].enabled = false;
            }

            if (!ref.current.currVideos.has(srcId)) {
              dispatch({
                type: "ADD_VIDEO",
                payload: { id: srcId, username, stream: recepientStream }
              });
              ref.current.currVideos.add(srcId);
            }
          }
        });
        
        socket.emit("set-info", ref.current.userId, call.peer, username, { video: stream.getVideoTracks()[0].readyState, audio: stream.getAudioTracks()[0].enabled });
      });
    });

    peer.on("open", (id) => {
      ref.current.userId = id;
      socket.emit("join-room", getRoomId(window.location.pathname), id, username);
    });

    return () => socket.disconnect();
  }, []);

  const connectToNewUser = (userId, name, stream, peer, socket) => {
    const call = peer.call(userId, stream);
    let info, recStream;

    socket.on("get-info", (srcId, destId, username, streamInfo) => {
      if (call.peer === srcId && ref.current.userId === destId) {
        info = streamInfo;

        if (recStream) {
          if (info.video === 'ended') {
            recStream.getVideoTracks()[0].stop();
          }
  
          if (!info.audio) {
            recStream.getAudioTracks()[0].enabled = false;
          }
  
          if (!ref.current.currVideos.has(userId)) {
            dispatch({
              type: "ADD_VIDEO",
              payload: { id: userId, username: name, stream: recStream }
            });
            ref.current.currVideos.add(userId);
          }
        }
      }
    });

    call.on("stream", (recepientStream) => {
      recStream = recepientStream;

      if (info) {
        if (info.video === 'ended') {
          recStream.getVideoTracks()[0].stop();
        }

        if (!info.audio) {
          recStream.getAudioTracks()[0].enabled = false;
        }

        if (!ref.current.currVideos.has(userId)) {
          dispatch({
            type: "ADD_VIDEO",
            payload: { id: userId, username: name, stream: recStream }
          });
          ref.current.currVideos.add(userId);
        }
      }

      socket.emit("set-info", ref.current.userId, userId, username, { video: stream.getVideoTracks()[0].readyState, audio: stream.getAudioTracks()[0].enabled });
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
        username={username}
      />
      <Chat socket={ref.current.socket} open={chatOpen} setChatOpen={setChatOpen} />
    </>
  )
}

export default RoomLayout;