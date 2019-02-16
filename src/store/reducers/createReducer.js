import { ADD_QUESTION_ITEM_TO_LIST, CLEAN_QUIZ_LIST } from "../actions/actionsType";

const initialState = {
  quiz: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION_ITEM_TO_LIST:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      };
    case CLEAN_QUIZ_LIST:
      return {
        ...state,
        quiz: []
      };
    default:
      return state;
  }
}
