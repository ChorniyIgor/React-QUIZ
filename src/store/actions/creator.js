import { ADD_QUESTION_ITEM_TO_LIST, CLEAN_QUIZ_LIST } from "./actionsType";

export function addQuestionItemToList(item) {
  return {
    type: ADD_QUESTION_ITEM_TO_LIST,
    item
  };
}

export function cleanQuizList() {
  return {
    type: CLEAN_QUIZ_LIST
  };
}

export function sendQuizToServe() {
  return async (dispatch, getState) => {
    await fetch("https://react-quiz-f7055.firebaseio.com/quizes.json", {
      method: "POST",
      body: JSON.stringify(getState().createPage.quiz)
    });
    dispatch(cleanQuizList());
  };
}
