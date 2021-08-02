import { withStyles } from '@material-ui/core/styles';
import { Drawer, TextField, Snackbar } from '@material-ui/core';

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
      borderBottomColor: '#64379f'
    }
  }
})(TextField);

// USER NAME INPUT FIELD
export const UserNameInput = withStyles({
  root: {
    width: '95%',
    paddingBottom: '1rem',
    '& label.Mui-focused': {
      color: '#64379f'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#64379f'
    }
  }
})(TextField);

// NOTIFICATION
export const Notification = withStyles({
  root: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#fff',
      paddingTop: '0',
      paddingBottom: '0',
      borderLeft: '5px solid #64379f',
      borderRight: '5px solid #64379f'
    },
    '& .MuiSnackbarContent-message': {
      color: '#64379f',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: '800'
    }
  }
})(Snackbar);