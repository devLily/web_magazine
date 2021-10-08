import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리

import { firestore, storage } from "../firebase";
import { actionCreators as imageActions } from "./image";
import moment from "moment";

const SET_POST = "post/SET_POST";
const ADD_POST = "post/ADD_POST";
const EDIT_POST = "post/EDIT_POST";
const LOADING = "post/LOADING";

const setPost = createAction(SET_POST, (postList, paging) => ({ postList, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const loading = createAction(LOADING,( isLoading ) => ({ isLoading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  isLoading: false,
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

const editPostFB = (postId = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if(!postId) {
      alert("게시물 정보가 존재하지 않습니다");
      return;
    }
    const previewImg = getState().image.preview;
    const postIndex = getState().post.list.findIndex((post) => post.id === postId);
    const onePost = getState().post.list[postIndex];

    console.log("onePost", onePost);

    const postDB = firestore.collection("post");

    if(previewImg === onePost.imageURL) {
      postDB
      .doc(postId)
      .update(post)
      .then((doc) => {
        dispatch(editPost(postId, {...post}));
        history.replace("/");
      });

      return;
    } else {
      const userId = getState().user.user.uid;
      const tempUpload = storage
      .ref(`images/${userId}_${new Date().getTime()}`)
      .putString(previewImg, "data_url");

      tempUpload.then(snapshot => {
        snapshot.ref
        .getDownloadURL()
        .then(url => {
          console.log(url);

          return url;
        })
        .then(url => {
          postDB
            .doc(postId)
            .update({...post, imageURL:url })
            .then((doc) => {
              dispatch(editPost(postId, {...post, imageURL:url }));
              history.replace("/")
            });
            })
              .catch((err) => {
                alert("이미지 파일을 업로드하는데 실패했어요ㅠㅠ");
                console.error("이미지 파일을 업로드하지 못했어요", err);
        });
      });
    }
  };
};

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
    //console.log(tempImg);

    const tempUpload = storage
    .ref(`images/${userInfo.userId}_${new Date().getTime()}`)
    .putString(tempImg, "data_url");

    tempUpload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        //console.log(url);

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

const getPostFB = (start = null, size = 3) => {
    return function (dispatch, getState, { history }) {
      const tempPaging = getState().post.paging;

      if (tempPaging.start && !tempPaging.next) return;

      dispatch(loading(true));

      const postDB = firestore.collection("post");
      let query = postDB.orderBy("insertDate", "desc");

      if (start) {
        query = query.startAt(start);
      }

      query
      .limit(size + 1)
      .get()
      .then(docs => {
        const postList = [];
        const paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
          size: size,
        }

        docs.forEach((doc) => {
          const tempPost = doc.data();
          console.log('doc', tempPost);
          const post = Object.keys(tempPost).reduce((acc, curr) => {
          if (curr.indexOf("user") !== -1) {
            return {
              ...acc,
              id: doc.id,
              userInfo: { ...acc.userInfo, [curr]: tempPost[curr]},
            };
          }

          return { ...acc, id: doc.id, [curr]: tempPost[curr]};
        },

        { id: doc.id, userInfo: {}}
        );
        // console.log('post', post);
        postList.push(post);
      });

      postList.pop();

      dispatch(setPost(postList, paging));
      })
  }
}

/**
 const getOnePostFB = (id) => {
 return function (dispatch, getState, { history }) {
   const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        const tempPost = doc.data();

        if (!tempPost) {
          return;
        }

        const post = Object.keys(tempPost).reduce(
          (acc, curr) => {
            if (curr.indexOf("user") !== -1) {
              return {
                ...acc,
                userInfo: { ...acc.userInfo, [curr]: tempPost[curr] },
              };
            }
            return { ...acc, [curr]: tempPost[curr] };
          },
          { id: doc.id, userInfo: {} }
        );

        dispatch(setPost([post], { start: null, next: null, size: 3 }));
      });
  }
}
 */
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list.push( ...action.payload.postList);

      draft.list = draft.list.reduce((acc,curr) => {
        if(acc.findIndex(acc => acc.id === curr.id) === -1) {
          return [...acc, curr]
        } else {
          acc[acc.findIndex((acc) => acc.id === curr.id)] = curr;
          return acc;
        }
      }, []);

      if(action.payload.paging) {
        draft.paging = action.payload.paging;
      }
      draft.isLoading = false;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      const postIndex = draft.list.findIndex((post) => post.id === action.payload.postId);

      draft.list[postIndex] = { ...draft.list[postIndex], ...action.payload.post };
    }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.isLoading = action.payload.isLoading;
    }),
  }, initialState
);

export const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
}
