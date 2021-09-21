import React from 'react';
import '../../../styles/Message.scss';

function Message({ message }) {
  return (
    <>
      <div className="message">
        <h5 className="title">{message.username} &nbsp;<span className="timestamp">{message.time}</span></h5>
        <p className="message-body">{message.body}</p>
      </div>
    </>
  )
}

export default Message;