import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

import { loadState, saveState } from "./localStorage";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, composeEnhancer(applyMiddleware(...middleware)));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
