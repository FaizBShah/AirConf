import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/Chat.scss';
import { ChatDrawer, MessageInput } from '../../MaterialComponents';
import { IconButton } from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import Message from './Message';
import { useAppContext } from '../../../context/store';
import { addMessage } from '../../../actions/messageActions';

function Chat({ socket, open, setChatOpen }) {
  const [message, setMessage] = useState('');
  const { state: { messages, username }, dispatch } = useAppContext();
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const onSendMessage = () => {
    if (message.trim().length > 0) {
      const currTime = new Date();
      
      addMessage({ username: 'Me', body: message, time: `${currTime.getHours()}:${currTime.getMinutes()}` }, dispatch);
      socket.emit("message-sent", username, message);
      setMessage('');
    }
  }

  const onPressEnter = (e) => {
    if (e.keyCode === 13) {
      onSendMessage();
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
            <div className="messages-main-area" ref={chatRef}>
              {messages.map(message => <Message message={message} />)}
            </div>
          </div>
          <div className="bottom-area">
            <div className="message-input-area">
              <div className="message-input-inner-area">
                <MessageInput 
                  label="Enter a message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  onKeyDown={(e) => onPressEnter(e)}
                />
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