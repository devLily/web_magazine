import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import { firestore, realtime, fieldValue } from "../firebase";

import { actionCreators as postActions } from "./post";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({ postId, commentList }));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({postId, comment}));

// const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

const initialState = {
  list: {},
  isLoading: false,
};

const getCommentFB = (postId = null) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");

		// postId가 없으면 바로 리턴하기!
    if(!postId){
        return;
    }

    // where로 게시글 id가 같은 걸 찾고,
    // orderBy로 정렬해줍니다.
    commentDB
      .where("postId", "==", postId)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let commentList = [];
        docs.forEach((doc) => {
          commentList = [ ...commentList, { ...doc.data(), id: doc.id } ];
        });
        // 가져온 데이터를 넣어주자!
        dispatch(setComment(postId, commentList));
      }).catch(err => {
          console.log("댓글 가져오기 실패!", postId, err);
      });
  };
};

const addCommentFB = (postId, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const userInfo = getState().user.user;

    console.log('userInfo', userInfo);

    let comment = {
      postId: postId,
      userId: userInfo.uid,
      userName: userInfo.nickName,
      userProfile: userInfo.userProfile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    // firestore에 코멘트 정보를 넣어요!
    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection("post");
      comment = { ...comment, id: doc.id };

      const post = getState().post.list.find((post) => post.id === postId);

      //   firestore에 저장된 값을 +1해줍니다!
      const increment = fieldValue.increment(1);

      // post에도 countComment를 하나 플러스 해줍니다.
      postDB
        .doc(postId)
        .update({ countComment: increment })
        .then((_post) => {
          dispatch(addComment(postId, comment));
          // post가 있을 때만 post의 countComment를 +1
          if (post) {
            dispatch(
              postActions.editPost(postId, {
                countComment: parseInt(post.countComment) + 1,
              })
            );
          }
          // 알림 리스트에 하나를 추가해줍니다!
          const notiItem = realtime
            .ref(`noti/${post.userInfo.userId}/list`)
            .push();

          notiItem.set({
            postId: post.id,
            userName: comment.userName,
            imageURL: post.imageURL,
            insert_dt: comment.insert_dt
          }, (err) => {
            if (err){
                console.log('알림 저장 실패');
            } else {
              // 알림이 가게 해줍니다!
              const notiDB = realtime.ref(`noti/${post.userInfo.userId}`);
              // 읽음 상태를 false로 바꿔주면 되겠죠!
              notiDB.update({ read: false });
            }
          });
        });
    });
  };
};


export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // comment는 딕셔너리 구조로 만들어서,
        // postId로 나눠 보관합시다! (각각 게시글 방을 만들어준다고 생각하면 구조 이해가 쉬워요.)
        draft.list[action.payload.postId] = action.payload.commentList;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        const commentListByPostId = draft.list[action.payload.postId];
        console.log('commentListByPostId', draft.list);
        if (commentListByPostId) {
          draft.list[action.payload.postId] = [...commentListByPostId, action.payload.comment];
        } else {
          draft.list = {
            [action.payload.postId]: [ action.payload.comment ]
          }
        }

      }),
      [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      })
  },
  initialState
);

export const actionCreators = {
  setComment,
  addComment,
  getCommentFB,
  addCommentFB,
};
