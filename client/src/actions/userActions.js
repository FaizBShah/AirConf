import { SET_USER_STREAM, SET_USERNAME } from "../context/types";

export const setStream = (stream, dispatch) => {
  dispatch({
    type: SET_USER_STREAM,
    payload: stream
  });
}

export const setUsername = (username, dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username
  });
}