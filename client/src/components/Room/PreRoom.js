import React, { useState, useEffect, useRef } from 'react';
import { UserNameInput } from '../MaterialComponents';
import { IconButton, Tooltip } from '@material-ui/core';
import { Videocam, Mic, MicOff, VideocamOff } from '@material-ui/icons';
import '../../styles/PreRoom.scss';

function PreRoom({ setIsRoomActive, username, setUsername, stream, setStream }) {
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    startStream(true);
  }, []);

  // Function to start the media stream.
  // @param(isAudioEnabled): To set the initial state of the audio when the stream starts
  const startStream = (isAudioEnabled) => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    .then((stream) => {
      setStream(stream);
      setIsVideo(true);
      
      stream.getAudioTracks()[0].enabled = isAudioEnabled;
      setIsAudio(isAudioEnabled);

      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    })
  }

  const onToggleVideo = () => {
    if (!isVideo) {
      // If resuming the video stream, first remove the old stream,
      // then start a new one with the old state of audio
      videoRef.current.srcObject = null;
      setStream(null);
      startStream(isAudio);
    }
    else {
      // If pausing the video stream, simply stop the video stream
      stream.getVideoTracks()[0].stop();
      setIsVideo(!isVideo);
    }
  }

  const onToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    setIsAudio(!isAudio);
  }

  const onJoinRoom = () => {
    if (username.trim().length < 3 || username.trim().length >= 25) {
      setError("Username should be between 3 and 24 characters long");
      return;
    }

    setError("");
    setIsRoomActive(true);
  }

  return (
    <>
      <div className="preroom-main-area">
        <div className="username-area">
          <div className="username-input-area">
            <UserNameInput
              required 
              label="Enter username"
              value={username}
              helperText={error}
              onChange={(e) => setUsername(e.target.value)}
            />
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
                    <IconButton style={{background: isVideo ? '#64379f' : 'red'}} onClick={onToggleVideo}>
                    {isVideo ? (<Videocam fontSize="small" style={{color: '#ddacf5'}} />) : (<VideocamOff fontSize="small" style={{color: '#ddacf5'}} />)}
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="icon-container">
                  <Tooltip title="Mic Off">
                    <IconButton style={{background: isAudio ? '#64379f' : 'red'}} onClick={onToggleAudio}>
                      {isAudio ? (<Mic fontSize="small" style={{color: '#ddacf5'}} />) : (<MicOff fontSize="small" style={{color: '#ddacf5'}} />)}
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="join-area">
          <button id="join-button" onClick={onJoinRoom}>Join Meeting</button>
        </div>
      </div>
    </>
  )
}

export default PreRoom;