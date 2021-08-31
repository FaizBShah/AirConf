import { ADD_VIDEO, REPLACE_STREAM } from "../context/types";

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