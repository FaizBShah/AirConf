import React, { useState } from 'react';
import '../styles/Room.scss';
import RoomLayout from '../components/Room/RoomLayout';
import PreRoom from '../components/Room/PreRoom';

function Room() {
  const [isRoomActive, setIsRoomActive] = useState(false);

  return (
    <>
      {isRoomActive ? 
      (
        <RoomLayout />
      ) : 
      (
        <PreRoom setIsRoomActive={setIsRoomActive} />
      )}
    </>
  )
}

export default Room;