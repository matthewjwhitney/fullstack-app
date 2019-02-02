import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";
import * as preferences from "./preferences";

export default combineReducers({
  todos,
  visibilityFilter,
  ...preferences
});
