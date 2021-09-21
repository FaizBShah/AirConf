import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/Video.scss';
import { Tooltip, IconButton } from '@material-ui/core';
import { Mic, MicOff, AccountCircle } from '@material-ui/icons';

function Video({ video: { id, username, stream }, socket, userId }) {
  const videoRef = useRef(null);
  const [isAudio, setIsAudio] = useState(stream.getAudioTracks()[0].enabled);
  const [isVideo, setIsVideo] = useState(stream.getVideoTracks()[0].readyState === 'live');

  useEffect(() => {
    setIsVideo(stream.getVideoTracks()[0].readyState === 'live');
    socket.on("get-audio", (recId, isAudio) => {
      if (recId === id || (recId === userId && id === -1)) {
        setIsAudio(isAudio);
      }
    });

    socket.on("get-video", (recId, isVideo) => {
      if (recId === id || (recId === userId && id === -1)) {
        setIsVideo(isVideo);
        stream.getVideoTracks()[0].stop();
      }
    });
  }, [socket, id, userId, stream]);

  useEffect(() => {
    const video = videoRef.current;
    videoRef.current.srcObject = stream;
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current.play();
    });

    return () => video.srcObject = null;
  }, [stream]);

  return (
    <>
      <div className="video-card" style={{minHeight: !isVideo ? '14rem' : 'auto'}}>
        <video ref={videoRef} className="video-stream" src={stream} muted={id === -1}>
          Sorry, there was an error in displaying the stream
        </video>
        <div className="video-info" style={{background: !isVideo ? '#64379f' : 'transparent'}}>
          <div className="info-header">
            <Tooltip title={isAudio ? "Mic On" : "Mic Off"}>
              <IconButton disabled={true} style={{background: isAudio ? 'rgba(0, 0, 0, 0.3)' : 'rgba(221, 0, 0, 1)', margin: '0.2rem', height: '2rem', width: '2rem'}}>
                {isAudio ? (<Mic style={{color: 'white', fontSize: '14px'}} />) : (<MicOff style={{color: 'white', fontSize: '14px'}} />)}
              </IconButton>
            </Tooltip>
          </div>
          {!isVideo && (
            <>
              <div className="user-icon">
                <AccountCircle style={{color: '#ddacf5', fontSize: '6rem'}} />
              </div>
              <div className="user-name-area">
                <h4 className="username">{username}</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Video;