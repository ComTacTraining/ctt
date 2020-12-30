import {
  compose,
  applyMiddleware,
  createStore as reduxCreateStore
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { initialState } from "./reducers/initialState";

const createStore = (state = initialState) => {
  const hasWindow = typeof window !== "undefined"
  const composeEnhancer = hasWindow ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
  const enhancer = composeEnhancer(applyMiddleware(thunk));

  return reduxCreateStore(rootReducer, state, enhancer);
};

export { createStore };
