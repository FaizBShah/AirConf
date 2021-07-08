import React from 'react';
import '../../styles/BottomMenu.scss';
import { Container, Grid, IconButton, Tooltip } from '@material-ui/core';
import { Videocam, Mic, Forum, ExitToApp } from '@material-ui/icons';
import { useWindowDimensions } from '../../utils/windowUtils';
import { getChatWidth } from '../../utils/getChatWidth';

function BottomMenu({ chatOpen, setChatOpen }) {
  const { width } = useWindowDimensions();

  return (
    <div id='bottom-menu' style={{width: chatOpen ? `calc(100% - ${getChatWidth(width)})` : '100%'}}>
      <Container maxWidth='lg' style={{height: '100%'}}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={{height: '100%'}}
        >
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title="Video Off">
                <IconButton style={{background: '#ddacf5'}}>
                  <Videocam fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title="Unmute mic">
                <IconButton style={{background: '#ddacf5'}}>
                  <Mic fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title={`${chatOpen ? 'Close' : 'Open'} Chat`}>
                <IconButton style={{background: '#ddacf5'}} onClick={() => setChatOpen(!chatOpen)}>
                  <Forum fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid
            item
            xs={width > 768 ? 2 : 3}
          >
            <div className="icon-container">
              <Tooltip title="Leave Meeting">
                <IconButton style={{background: '#ddacf5'}}>
                  <ExitToApp fontSize="small" style={{color: '#64379f'}} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default BottomMenu;