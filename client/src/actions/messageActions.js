import { ADD_MESSAGE } from "../context/types";

export const addMessage = (message, dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: message
  });
}