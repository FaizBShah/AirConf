import React, { useState } from 'react';
import '../styles/Room.scss';
import RoomLayout from '../components/Room/RoomLayout';
import PreRoom from '../components/Room/PreRoom';

function Room() {
  const [isRoomActive, setIsRoomActive] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <>
      {isRoomActive ? (<RoomLayout username={username} />) : (<PreRoom setIsRoomActive={setIsRoomActive} setUsername={setUsername} />)}
    </>
  )
}

export default Room;