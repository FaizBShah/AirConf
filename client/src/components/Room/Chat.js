import React from 'react';
import '../../styles/Chat.scss';
import { ChatDrawer } from '../MaterialComponents';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'

function Chat({ open, setChatOpen }) {
  return (
    <>
      <ChatDrawer open={open} variant="persistent" anchor="right">
        <div id="chat-drawer-body">
          <div className="head-area">
            <div className="header-inner-area">
              <div className="header-text-area">
                <h1 className="header">In-call messages</h1>
              </div>
            </div>
            <IconButton onClick={() => setChatOpen(false)}>
              <Close fontSize="small" style={{color: '#64379f'}} />
            </IconButton>
          </div>
          <div className="chat-area">

          </div>
          <div className="bottom-area">

          </div>
        </div>
      </ChatDrawer>
    </>
  )
}

export default Chat;