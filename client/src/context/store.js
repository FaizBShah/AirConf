import { createContext, useContext, useReducer } from 'react';
import { ADD_VIDEO, REPLACE_STREAM } from './types';

const AppContext = createContext();

const initialState = {
  videos: []
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