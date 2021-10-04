// import {}
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; // 불변성 관리

import { setCookie, getCookie, deleteCookie } from "../utils/Cookie";
//action type 정의
// 로그인, 로그아웃, 유저정보
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USERINFO = "GET_USERINFO";

// 원래 action creators
// const logIn = (user) => {
//   return {
//     type: LOG_IN,
//     user
//   }
// }

// 1. action creators
const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUserInfo = createAction(GET_USERINFO, (user) => ({user}));

// initial state
const initialState = {
  user: null,
  isLoggedIn: false
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

export default handleActions({
  // 어떤 액션에 대한 내용인지 작성, produce에게 원본값을 전달하고 원본값을 가지고 어떤 작업을 할지 함수로 전달
  // produce가 받은 원본을 복사한 값을 반환하는데 이값을 dratf라고 함
  [LOG_IN]: (state, action) => produce(state, (dratf) => {
    // login이 되었을 때 발생해야 할 작업 - initialstate 의 user에 사용자 정보를 넣고, islogin을 true로 변경
    // action 객체 안에 type, payload 가 있고 payload 안에 보낸 데이터가 담겨있다
    setCookie("isLoggedIn", "success");

    dratf.user = action.payload.user;
    dratf.isLoggedIn = true;
  }),
  [LOG_OUT]: (state, action) =>  produce(state, (dratf) => {}),
  [GET_USERINFO]: (state, action) =>  produce(state, (dratf) => {}),
}, initialState);

//immer 동작원리
// A의 불변성을 유지하기 위해 immer의 produce를 사용하게 되면 immer가 A를 받아 A' 를 생성하고
// A'를 변경시키도록 한다 - 복사한 값을 유지시키도록 한다.


// export action creator
export const actionCreators ={
  logIn,
  logOut,
  getUserInfo
};
