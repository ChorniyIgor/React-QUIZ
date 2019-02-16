import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_NEXT_QUESTION,
  QUIZ_FINISH,
  SEND_QUIZ_ANSWER,
  QUIZ_RESTART
} from "../actions/actionsType";

const initialState = {
  showLoader: false,
  quizes: [],
  error: null,
  isFinish: false,
  results: {},
  activeQuestionId: 0,
  answerState: null,
  quiz: []
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        showLoader: true
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        showLoader: false,
        quizes: action.quizes
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        showLoader: false,
        error: action.error
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        showLoader: false
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestionId: state.activeQuestionId + 1,
        answerState: null
      };
    case QUIZ_FINISH:
      return {
        ...state,
        isFinish: true
      };
    case SEND_QUIZ_ANSWER:
      return {
        ...state,
        results: action.results,
        answerState: action.answerState
      };
    case QUIZ_RESTART:
      return {
        ...state,
        isFinish: false,
        results: {},
        activeQuestionId: 0,
        answerState: null
      };
    default:
      return state;
  }
}
