import { ADD_VIDEO, DELETE_USER, REPLACE_STREAM, RESET_ROOM } from "../context/types";

export const addVideo = (video, dispatch) => {
  dispatch({
    type: ADD_VIDEO,
    payload: video
  });
}

export const replaceStream = (newVideo, dispatch) => {
  dispatch({
    type: REPLACE_STREAM,
    payload: newVideo
  });
}

export const resetRoom = (dispatch) => {
  dispatch({
    type: RESET_ROOM
  });
}

export const deleteUser = (userId, dispatch) => {
  dispatch({
    type: DELETE_USER,
    payload: userId
  });
}