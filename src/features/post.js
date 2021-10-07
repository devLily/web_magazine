import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리

import { firestore, storage } from "../firebase";
import { actionCreators as imageActions } from "./image";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST,(postList) => ({ postList }));
const addPost = createAction(ADD_POST,(post) => ({ post }));

const initialState = {
  list: [],
}

const initialPost = {
  id: 0,
  // userInfo: {
  //   userName: "felix",
  //   userProfile: "https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e"
  // },
  imageURL:"https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e",
  contents:"",
  countComment: 0,
  insertDate: moment().format("YYYY-MM-DD hh:mm:ss"),
}

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const tempUser = getState().user.user;
    //console.log("tempUser", tempUser)

    const userInfo = {
      userName: tempUser.nickName,
      userId: tempUser.uid,
      userProfile: tempUser.userProfile
    }
    // id: "skizoo@skzoo.com"
    // nickName: "뽁아리"
    // uid: "LPFv6cwdfvT0A47foeKTALxAOTq1"
    // userProfile: ""
    const tempPost =  {
      ...initialPost,
      contents: contents,
      insertDate: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const tempImg = getState().image.preview;
    console.log(tempImg);

    const tempUpload = storage.ref(`images/${userInfo.userId}_${new Date().getTime()}`).putString(tempImg, "data_url");

    tempUpload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        console.log(url);

        return url;
      }).then(url => {
        postDB
          .add({...userInfo, ...tempPost, imageURL: url})
          .then((doc) => {
            const post = {userInfo, ...tempPost, id:doc.id , imageURL: url};
            dispatch(addPost(post));
            history.replace("/");

            dispatch(imageActions.setPreview(null));
          })
          .catch((err) => {
            alert("게시물 작성에 실패했어요");
            console.error("게시물 작성이 실패했어요", err);
          });
      }).catch((err) => {
        alert("이미지 파일을 업로드하는데 실패했어요ㅠㅠ");
        console.error("이미지 파일을 업로드하지 못했어요", err);
      });
    });
  }
}

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
      const postDB = firestore.collection("post");

      postDB.get().then((docs) => {
        const postList = [];

        docs.forEach((doc) => {
          const tempPost = doc.data();
          const post = Object.keys(tempPost).reduce((acc, curr) => {
          if (curr.indexOf("user") !== -1) {
            return {
              ...acc,
              userInfo: { ...acc.userInfo, [curr]: tempPost[curr]},
            };
          }

          return { ...acc, [curr]: tempPost[curr]};
        },

        { id: doc.id, userInfo: {}}
        );

        postList.push(post);
      });

      dispatch(setPost(postList));
    })
  }
}

export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.postList;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
  }, initialState
);

export const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB
}
