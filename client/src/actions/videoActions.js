import { ADD_VIDEO } from "../context/types";

export const addVideo = (video, dispatch) => {
  dispatch({
    type: ADD_VIDEO,
    payload: video
  });
}