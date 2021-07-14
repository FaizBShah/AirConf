import React, { useState } from 'react';
import '../../styles/Messages.scss';
import Message from './Message';

function Messages() {
  const [messages, setMessages] = useState([]);

  return (
    <>
      <div className="messages-main-area">
        {messages.map(message => <Message message={message} />)}
      </div>
    </>
  )
}

export default Messages;