import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "../features/user";
import Post from "../features/post";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  post: Post,
  router: connectRouter(history)
});

const middlewares = [thunk.withExtraArgument({history: history})];

// 현재 작업중인 환경 (ex. 개발환경, 배포환경)
const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// redux devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

  })
  :compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
