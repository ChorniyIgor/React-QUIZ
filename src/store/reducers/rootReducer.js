import { combineReducers } from "redux";
import quizReducer from "./quizReducer";
import createReducer from "./createReducer";
import { authReducer } from "./authReducer";
export default combineReducers({
  quizPage: quizReducer,
  createPage: createReducer,
  authPage: authReducer
});
