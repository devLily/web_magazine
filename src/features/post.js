import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리
import { firestore } from "../firebase";
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

    const userInfo = {
      userName: tempUser.userName,
      userId: tempUser.uId,
      userProfile: tempUser.userProfile
    }

    const tempPost =  {
      ...initialPost,
      contents: contents,
      insertDate: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    console.log({...userInfo, ...tempPost});
    return;

    postDB.add({...userInfo, ...tempPost}).then((doc) => {

    }).catch((err) => {
      console.log("게시물 작성이 실패했어요", err)
    })
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

    }),
  }, initialState
);

export const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB
}
