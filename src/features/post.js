import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리
import { firestore } from "../firebase";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST,(postList) => ({ postList }));
const addPost = createAction(ADD_POST,(post) => ({ post }));

const initialState = {
  list: [],
}

const initialPost = {
  id: 0,
  userInfo: {
    userName: "felix",
    userProfile: "https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e"
  },
  imageURL:"https://w.namu.la/s/7a11ad5ae0d1da8b0ea05c75f635c9b46a92be8916ea290226a98c7c10a485397000f5f4b30806c971ee7a00817215bb60a322a434cd900d0bb778b0f3eecf27dd00954f2539e42046707bdd5a3be0904243a6e4dca6f928941bde4abedd005e",
  contents:"용복이네요",
  countComment: 10,
  insertDate: "2021-02-28 10:00:00",
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
      console.log("postList", postList);
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
  getPostFB
}

// const getPostFB = () => {
//   return function (dispatch, getState, {history}) {
//     const postDB = firestore.collection("post");

//     postDB.get().then((docs) => {
//       const postList = [];

//       docs.forEach((doc) => {
//         const tempPost = doc.data();
//         const post = Object.keys(tempPost).reduce((acc, curr) => {
//           if (curr.indexOf("user"))
//           return { ...acc, [curr]: tempPost[curr]}
//         }, {id: doc.id, userInfo: {}})
        // doc.data에서 불러온 데이터에는 id가 없고 userinfo로 묶여있지 않으므로 의존값으로 미리 넣어줌
        // const tempPost = {
        //   id: doc.id,
        //   ...doc.data() // doc.data는 firestore에서 가져온 데이터값
        // };

        // const post = {
        //   id: doc.id,
        //   userInfo: {
        //     userName: tempPost.userName,
        //     userProfile: tempPost.userProfile,
        //     userId: tempPost.userId
        //   },
        //   imageURL: tempPost.imageURL,
        //   contents: tempPost.contents,
        //   countComment: tempPost.countComment,
        //   insertDate: tempPost.insertDate
        // };

      //   postList.push(post);
      // })

      // dispatch(setPost(postList));
      // setPost 액션이 실행되고 payload안에 post배열로 들어감
//     })
//   }
// }
// post 를 setPost를 사용해서 넘겨준다. setPost는 리스트가 넘어가므로 post한 개에 대한 내용을 배열로 넣어주어야 한다
