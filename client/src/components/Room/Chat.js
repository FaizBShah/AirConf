import React from 'react';
import '../../styles/Chat.scss';
import { ChatDrawer } from '../MaterialComponents';
import { IconButton } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons'

function Chat({ open, setChatOpen }) {
  return (
    <>
      <ChatDrawer open={open} variant="persistent" anchor="right">
        <div id="chat-drawer-body">
          <div className="drawer-head-area">
            <div className="drawer-header">
              <h1 className="header">AirConf</h1>
            </div>
            <IconButton onClick={() => setChatOpen(false)}>
              <ArrowForwardIos fontSize="small" style={{color: '#64379f'}} />
            </IconButton>
          </div>
          <div className="drawer-chat-area">

          </div>
          <div className="drawer-bottom-area">

          </div>
        </div>
      </ChatDrawer>
    </>
  )
}

export default Chat;