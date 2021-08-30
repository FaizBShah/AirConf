import { createContext, useContext, useReducer } from 'react';
import { ADD_VIDEO } from './types';

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