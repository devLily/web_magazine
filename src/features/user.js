// import {}
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리

import { auth } from "../firebase";
import firebase from "firebase/app";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { setCookie, getCookie, deleteCookie } from "../utils/Cookie";
//1. action type 정의
// 로그인, 로그아웃, 유저정보
// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USERINFO = "GET_USERINFO";
const SET_USERINFO = "SET_USERINFO";

// 원래 action creators
// const logIn = (user) => {
//   return {
//     type: LOG_IN,
//     user
//   }
// }

// 1. action creators
// const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUserInfo = createAction(GET_USERINFO, (user) => ({ user }));
const setUserInfo = createAction(SET_USERINFO, (user) => ({ user }))

// initial state
const initialState = {
  user: null,
  isLoggedIn: false
}

// user객체 하나에 대한 initial state
// const userInitial = {
//   userId:"",
//   nickName:"",
//   pwd:"",
//   confirmPwd:"",
// }

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
    .signInWithEmailAndPassword(id, pwd)
    .then((user) => {
      console.log(user);
      dispatch(setUserInfo({
        nickName: user.user.displayName,
        id: id,
        pwd: pwd,
        userProfile:"",
        uid: user.user.uid,
      })
      );

      history.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorMessage) {
        alert("errorMessage");
      }

      console.log(errorCode, errorMessage);
    });
    });
  }
}
// const loginAction = (user) => {
//   return function(dispatch, getState, {history}) {
//     //console.log(history);
//     dispatch(setUserInfo(user));
//     history.push("/");
//   }
// }

const signupFB = (id, pwd, nickName) => {
  return function (dispatch, getState, {history}) {
    auth
    .createUserWithEmailAndPassword(id, pwd)
    .then((user) => {
     // 회원가입 정보에 id, pwd만 넘겨주므로 nickName이 null이 되고 회원가입버튼을 누른 뒤에는 로그인이 된 상태이므로
     // 사용자의 정보를 가져와서 사용자 프로필 업데이트로 닉네임을 표출해줌
    console.log(user);

    auth.currentUser
      .updateProfile({
        displayName: nickName,
      })
      .then(() => {
       // 닉네임까지 변경이 성공했다면 사용자의 로그인 상태를 바꾼다
        dispatch(setUserInfo({ nickName: nickName, id: id, userProfile:"", uid: user.user.uid }));
      history.push("/");
      })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });
  }
}
// 원래 reducer
// const reducer = (state = initialState, action = {}) => {
//   switch(action.type) {
//     case LOG_IN:
//       return {
//       state.user = action.user;
//       }
//     default:
//       return state;
//   }
// }

const loginCheckFB = () => {
  return function (dispatch, getState, {history}) {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(
          setUserInfo({
            nickName: user.displayName,
            userProfile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
      // replace 는 뒤로가기를 눌러도 그 전의 페이지를 다시 랜더해서 보여주지 않는다
    })
  }
}

export default handleActions({
  // 어떤 액션에 대한 내용인지 작성, produce에게 원본값을 전달하고 원본값을 가지고 어떤 작업을 할지 함수로 전달
  // produce가 받은 원본을 복사한 값을 반환하는데 이값을 dratf라고 함
  [SET_USERINFO]: (state, action) => produce(state, (dratf) => {
    // login이 되었을 때 발생해야 할 작업 - initialstate 의 user에 사용자 정보를 넣고, islogin을 true로 변경
    // action 객체 안에 type, payload 가 있고 payload 안에 보낸 데이터가 담겨있다
    setCookie("isLoggedIn", "success");

    dratf.user = action.payload.user;
    dratf.isLoggedIn = true;
  }),

  [LOG_OUT]: (state, action) =>  produce(state, (dratf) => {
    deleteCookie("isLoggedIn");
    dratf.user = null;
    dratf.isLoggedIn = false;
  }),

  [GET_USERINFO]: (state, action) =>  produce(state, (dratf) => {}),
}, initialState);

//immer 동작원리
// A의 불변성을 유지하기 위해 immer의 produce를 사용하게 되면 immer가 A를 받아 A' 를 생성하고
// A'를 변경시키도록 한다 - 복사한 값을 유지시키도록 한다.


// export action creator
export const actionCreators ={
  logOut,
  getUserInfo,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB
};
