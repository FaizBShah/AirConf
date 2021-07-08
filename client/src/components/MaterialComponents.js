import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

// <---------------------- CHAT ------------------------------>

// CHAT DRAWER
export const ChatDrawer = withStyles({
  root: {
    width: '240px'
  },
  paper: {
    width: '240px'
  }
})(Drawer);