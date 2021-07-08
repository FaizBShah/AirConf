import React from 'react';
import { ChatDrawer } from '../MaterialComponents';

function Chat({ open }) {
  return (
    <>
      <ChatDrawer open={open} variant="persistent" anchor="right" />
    </>
  )
}

export default Chat;