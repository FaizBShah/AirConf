import React from 'react';
import '../../../styles/Meeting.scss';
import { useWindowDimensions } from '../../../utils/windowUtils';
import { getChatWidth } from '../../../utils/getChatWidth';

function Meeting({ chatOpen }) {
  const { width } = useWindowDimensions();

  return (
    <>
      <div id="meeting-area" style={{width: chatOpen ? `calc(100% - ${getChatWidth(width)})` : '100%'}}>
        <div className="meeting-info">

        </div>
        <div className="videos-area">

        </div>
      </div>
    </>
  )
}

export default Meeting;