import { createContext, useContext, useReducer } from 'react';
import { ADD_MESSAGE, ADD_VIDEO, DELETE_USER, REPLACE_STREAM, RESET_ROOM, SET_USERNAME, SET_USER_STREAM } from './types';

const AppContext = createContext();

const initialState = {
  stream: null,
  username: "",
  videos: [],
  messages: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.payload]
      };
    
    case REPLACE_STREAM:
      const tempArr = [...state.videos];
      const videoIndex = tempArr.findIndex(video => video.id === action.payload.id);
      tempArr[videoIndex].stream = action.payload.stream;
      
      return {
        ...state,
        videos: tempArr
      };

    case RESET_ROOM:
      return {
        ...state,
        videos: state.videos.filter(video => video.id === -1)
      };

    case SET_USER_STREAM:
      return {
        ...state,
        stream: action.payload
      };
    
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };

    case DELETE_USER:
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload)
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    default:
      return state;
  }
}

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}