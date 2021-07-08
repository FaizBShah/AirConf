import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

// <---------------------- CHAT ------------------------------>

// CHAT DRAWER
export const ChatDrawer = withStyles({
  root: {
    width: '300px'
  },
  paper: {
    width: '300px'
  }
})(Drawer);