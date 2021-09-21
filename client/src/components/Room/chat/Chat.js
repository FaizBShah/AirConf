import React, { useState, useEffect } from 'react';
import '../../../styles/Chat.scss';
import { ChatDrawer, MessageInput } from '../../MaterialComponents';
import { IconButton } from '@material-ui/core';
import { Close, PhotoSizeSelectActual, Send } from '@material-ui/icons';
import Messages from './Messages';
import { useAppContext } from '../../../context/store';
import { addMessage } from '../../../actions/messageActions';

function Chat({ socket, open, setChatOpen }) {
  const [message, setMessage] = useState('');
  const { state: { messages, username }, dispatch } = useAppContext();

  const onSendMessage = () => {
    if (message.trim().length > 0) {
      addMessage({ username: 'Me', body: message, time: '11:20' }, dispatch);
      socket.emit("message-sent", username, message);
      setMessage('');
    }
  }

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
                <MessageInput label="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="icon-area">
                <IconButton>
                  <Send fontSize="small" style={{color: '#64379f'}} onClick={onSendMessage} />
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