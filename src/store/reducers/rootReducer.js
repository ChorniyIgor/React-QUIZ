import { combineReducers } from "redux";
import quizReducer from "./quizReducer";
import createReducer from "./createReducer";
export default combineReducers({
  quizPage: quizReducer,
  createPage: createReducer
});