import React, { useState, useEffect } from 'react';
import '../../../styles/Meeting.scss';
import { useWindowDimensions } from '../../../utils/windowUtils';
import { getChatWidth } from '../../../utils/getChatWidth';
import { Tooltip, IconButton } from '@material-ui/core'
import { Share } from '@material-ui/icons';

function Meeting({ chatOpen }) {
  const [roomId, setRoomId] = useState("");
  const { width } = useWindowDimensions();

  useEffect(() => {
    setRoomId(getRoomId(window.location.pathname));
  }, []);

  const getRoomId = (path) => {
    return path.split('/')[2];
  }

  const copyRoomId = () => {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return (
    <>
      <div id="meeting-area" style={{width: chatOpen ? `calc(100% - ${getChatWidth(width)})` : '100%'}}>
        <div className="meeting-info">
          <Tooltip title="Share Link">
            <IconButton onClick={copyRoomId}>
              <Share style={{color: '#ddacf5'}} />
            </IconButton>
          </Tooltip>
          <div className="room-id-area">
            <h3 className="room-id">{roomId}</h3>
          </div>
        </div>
        <div className="videos-area">

        </div>
      </div>
    </>
  )
}

export default Meeting;