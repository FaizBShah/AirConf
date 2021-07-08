import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

// <---------------------- CHAT ------------------------------>

// CHAT DRAWER
export const ChatDrawer = withStyles({
  root: {
    width: '300px',
    '@media (max-width: 768px)': {
      width: '240px'
    },
    '@media (max-width: 600px)': {
      width: '100%'
    }
  },
  paper: {
    width: '300px',
    '@media (max-width: 768px)': {
      width: '240px'
    },
    '@media (max-width: 600px)': {
      width: '100%'
    }
  }
})(Drawer);