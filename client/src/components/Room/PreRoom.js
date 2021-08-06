import React, { useState, useEffect, useRef } from 'react';
import { UserNameInput } from '../MaterialComponents';
import { IconButton, Tooltip } from '@material-ui/core';
import { Videocam, Mic } from '@material-ui/icons';
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
      });
    })
  }, []);

  const onToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    console.log(stream.getAudioTracks()[0].enabled);
  }

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
              <div className="inner-stream-buttons-area">
                <div className="icon-container">
                  <Tooltip title="Video Off">
                    <IconButton style={{background: '#64379f'}}>
                      <Videocam fontSize="small" style={{color: '#ddacf5'}} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="icon-container">
                  <Tooltip title="Mic Off">
                    <IconButton style={{background: '#64379f'}} onClick={onToggleAudio}>
                      <Mic fontSize="small" style={{color: '#ddacf5'}} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="join-area">
          <button id="join-button">Join Meeting</button>
        </div>
      </div>
    </>
  )
}

export default PreRoom;