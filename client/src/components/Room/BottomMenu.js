import React, { useState } from 'react';
import '../../styles/BottomMenu.scss';
import { Container, Grid, IconButton, Tooltip } from '@material-ui/core';
import { Videocam, Mic, MicOff, VideocamOff, Forum, ExitToApp } from '@material-ui/icons';
import { useWindowDimensions } from '../../utils/windowUtils';
import { getChatWidth } from '../../utils/getChatWidth';
import { replaceStream, resetRoom } from '../../actions/videoActions';
import { setStream } from '../../actions/userActions';

function BottomMenu({ socket, chatOpen, setChatOpen, stream, userId, username, currVideos, dispatch }) {
  const { width } = useWindowDimensions();
  const [isVideo, setIsVideo] = useState(stream.getVideoTracks()[0].readyState === 'live');
  const [isAudio, setIsAudio] = useState(stream.getAudioTracks()[0].enabled);

  const onToggleVideo = () => {
    if (!isVideo) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) => {
        setStream(stream, dispatch);

        setIsVideo(true);
        
        stream.getAudioTracks()[0].enabled = isAudio;
        setIsAudio(isAudio);

        resetRoom(dispatch);
        currVideos.clear();
        replaceStream({ id: -1, stream }, dispatch);
        socket.emit("replace-stream", userId, username);
      })
    }
    else {
      stream.getVideoTracks()[0].stop();

      replaceStream({ id: -1, stream }, dispatch);
      socket.emit("set-video", userId, false);

      setIsVideo(!isVideo);
    }
  }

  const onToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    socket.emit("set-audio", userId, stream.getAudioTracks()[0].enabled);
    setIsAudio(stream.getAudioTracks()[0].enabled);
  }
 
  return (
    <div id='bottom-menu' style={{width: chatOpen ? `calc(100% - ${getChatWidth(width)})` : '100%'}}>
      <Container maxWidth='lg' style={{height: '100%'}}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={{height: '100%'}}
        >
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title={isVideo ? "Video On" : "Video Off"}>
                <IconButton style={{background: isVideo ? '#ddacf5' : 'red'}} disabled={!stream} onClick={onToggleVideo}>
                  {isVideo ? (<Videocam fontSize="small" style={{color: '#64379f'}} />) : (<VideocamOff fontSize="small" style={{color: '#ddacf5'}} />)}
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title={isAudio ? "Mic On" : "Mic Off"}>
                <IconButton style={{background: isAudio ? '#ddacf5' : 'red'}} disabled={!stream} onClick={onToggleAudio}>
                  {isAudio ? (<Mic fontSize="small" style={{color: '#64379f'}} />) : (<MicOff fontSize="small" style={{color: '#ddacf5'}} />)}
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title={`${chatOpen ? 'Close' : 'Open'} Chat`}>
                <IconButton style={{background: '#ddacf5'}} onClick={() => setChatOpen(!chatOpen)}>
                  <Forum fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title="Leave Meeting">
                <IconButton href={window.location.href} style={{background: '#ddacf5'}}>
                  <ExitToApp fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default BottomMenu;