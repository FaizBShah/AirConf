import React, { useState } from 'react';
import '../styles/Room.scss';
import RoomLayout from '../components/Room/RoomLayout';
import PreRoom from '../components/Room/PreRoom';

function Room() {
  const [isRoomActive, setIsRoomActive] = useState(false);
  const [username, setUsername] = useState("");
  const [stream, setStream] = useState(null);

  return (
    <>
      {isRoomActive ? 
      (
        <RoomLayout
          username={username}
          stream={stream}
          setStream={setStream}
        />
      ) : 
      (
        <PreRoom 
          setIsRoomActive={setIsRoomActive} 
          username={username} 
          setUsername={setUsername} 
          stream={stream} 
          setStream={setStream} 
        />
      )}
    </>
  )
}

export default Room;