import React, { useState, useEffect, useRef } from 'react';
import { UserNameInput } from '../MaterialComponents';
import '../../styles/PreRoom.scss';

function PreRoom({ setIsRoomActive, setUsername }) {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    .then((stream) => {
      setStream(stream);

      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setStream(null);
      });
    })
  }, [])

  return (
    <>
      <div className="preroom-main-area">
        <div className="username-area">
          <div className="username-input-area">
            <UserNameInput required label="Enter username" />
          </div>
        </div>
        <div className="info-area">
          <div className="inner-info-area">
            <div className="stream-area">
              <video ref={videoRef} className="stream-video"></video>
            </div>
            <div className="stream-buttons-area">

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreRoom;