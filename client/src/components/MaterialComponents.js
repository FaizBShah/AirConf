import { withStyles } from '@material-ui/core/styles';
import { Drawer, TextField } from '@material-ui/core';

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

// MESSAGE INPUT FIELD
export const MessageInput = withStyles({
  root: {
    width: '100%',
    paddingBottom: '1rem',
    '& label.Mui-focused': {
      color: '#64379f'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#64379f',
      '&:hover fieldset': {
        borderBottomColor: 'red'
      },
      '&:Mui-focused fieldset': {
        borderBottomColor: 'red'
      }
    }
  }
})(TextField);