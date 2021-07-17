import React, { useState } from 'react';
import '../../../styles/Chat.scss';
import { ChatDrawer, MessageInput } from '../../MaterialComponents';
import { IconButton } from '@material-ui/core';
import { Close, PhotoSizeSelectActual, Send } from '@material-ui/icons';
import Messages from './Messages';

function Chat({ open, setChatOpen }) {
  const [messages, setMessages] = useState([]);

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
            <Messages messages={messages} />
          </div>
          <div className="bottom-area">
            <div>
              <div className="icon-area">
                <IconButton>
                  <PhotoSizeSelectActual fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </div>
            </div>
            <div className="message-input-area">
              <div className="message-input-inner-area">
                <MessageInput label="Enter a message" />
              </div>
            </div>
            <div>
              <div className="icon-area">
                <IconButton>
                  <Send fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </ChatDrawer>
    </>
  )
}

export default Chat;