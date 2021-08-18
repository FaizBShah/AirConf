import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/Video.scss';
import { Tooltip, IconButton } from '@material-ui/core';
import { MicOff, AccountCircle } from '@material-ui/icons';

function Video({ stream }) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log(stream);
    videoRef.current.srcObject = stream;
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current.play();
    });
  }, [stream]);

  return (
    <>
      <div className="video-card" style={{minHeight: !isVideoOn ? '14rem' : 'auto'}}>
        {isVideoOn && (
          <video ref={videoRef} className="video-stream" src={stream}>
            Sorry, there was an error in displaying the stream
          </video>
        )}
        <div className="video-info" style={{background: !isVideoOn ? '#64379f' : 'transparent'}}>
          <div className="info-header">
            <Tooltip title="Muted">
              <IconButton style={{background: 'rgba(0, 0, 0, 0.3)', margin: '0.2rem', height: '2rem', width: '2rem'}}>
                <MicOff style={{color: 'white', fontSize: '14px'}} />
              </IconButton>
            </Tooltip>
          </div>
          {!isVideoOn && (
            <>
              <div className="user-icon">
                <AccountCircle style={{color: '#ddacf5', fontSize: '6rem'}} />
              </div>
              <div className="user-name-area">
                <h4 className="username">Faiz Shah</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Video;