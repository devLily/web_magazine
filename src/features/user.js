import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { auth } from "../firebase";
import firebase from "firebase/app";

import { setCookie, deleteCookie } from "../utils/Cookie";

const LOG_OUT = "LOG_OUT";
const GET_USERINFO = "GET_USERINFO";
const SET_USERINFO = "SET_USERINFO";

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUserInfo = createAction(GET_USERINFO, (user) => ({ user }));
const setUserInfo = createAction(SET_USERINFO, (user) => ({ user }))

const initialState = {
  user: null,
  isLoggedIn: false
}

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

const signupFB = (id, pwd, nickName) => {
  return function (dispatch, getState, {history}) {
    auth
    .createUserWithEmailAndPassword(id, pwd)
    .then((user) => {

    auth.currentUser
      .updateProfile({
        displayName: nickName,
      })
      .then(() => {
        dispatch(setUserInfo({ nickName: nickName, id: id, userProfile:"", uid: user.user.uid }));
      history.push("/");
      })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });
  }
}

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
    })
  }
}

export default handleActions({
  [SET_USERINFO]: (state, action) => produce(state, (dratf) => {
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

export const actionCreators ={
  logOut,
  getUserInfo,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB
};
