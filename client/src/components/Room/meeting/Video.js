import React from 'react';
import '../../../styles/Video.scss';

function Video() {
  return (
    <>
      <div className="video-card">
        <video className="video-stream" src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4">
          Sorry, there was an error in displaying the stream
        </video>
      </div>
    </>
  )
}

export default Video;