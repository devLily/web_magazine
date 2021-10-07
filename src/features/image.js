import { createAction , handleActions } from "redux-actions";
import produce from "immer";

import {storage} from "../firebase";

//UPLOAD 중인지아닌지
const IS_UPLOAD = "IS_UPLOAD";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const isUpload = createAction(IS_UPLOAD, (isUpload) => ({isUpload}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

const initialState = {
  image_url: "",
  isUpload: false,
  preview: null
}

const uploadImageFB = (image) => {
  return function(dispatch, getState, { history }) {
    dispatch(isUpload(true));
    const uploadFile = storage.ref(`images/${image.name}`).put(image);

    uploadFile.then((snapshot) => {
      //console.log(snapshot);
      //dispatch(isUpload(false));
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
        //console.log(url);
      });
    });
  }
}

export default handleActions({
  [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
    draft.image_url = action.payload.image_url;
    draft.isUpload=false;
  }),
  [IS_UPLOAD]: (state, action) => produce(state, (draft) => {
    draft.isUpload = action.payload.isUpload;
  }),
  [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
    draft.preview = action.payload.preview;
  })
}, initialState);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
}

export { actionCreators };
