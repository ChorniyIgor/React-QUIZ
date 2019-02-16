import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_NEXT_QUESTION,
  QUIZ_FINISH,
  SEND_QUIZ_ANSWER,
  QUIZ_RESTART
} from "./actionsType";

export function fetchQuizList() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const resp = await fetch("https://react-quiz-f7055.firebaseio.com/quizes.json");
      const result = await resp.json();

      const quizes = [];
      for (let quiz in result) {
        quizes.push(quiz);
      }
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      console.log(error);
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizItem(id) {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const textID = id;
      const resp = await fetch(`https://react-quiz-f7055.firebaseio.com/quizes/${textID}.json`);
      const quiz = await resp.json();
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {}
  };
}

export function fetchQuizesStart() {
  return { type: FETCH_QUIZES_START };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  };
}

export function goToNextLevel() {
  return {
    type: QUIZ_NEXT_QUESTION
  };
}

export function quizFinish() {
  return {
    type: QUIZ_FINISH
  };
}

export function saveQuestionAnswer(results, answerResult, id) {
  return {
    type: SEND_QUIZ_ANSWER,
    results,
    answerState: {
      [id]: answerResult
    }
  };
}

export function quizRestart() {
  return {
    type: QUIZ_RESTART
  };
}

export function onAnswerClickHendler(id) {
  function isAnswerIdRight(id, state) {
    const actualQuestion = state.quiz[state.activeQuestionId];
    return id === actualQuestion.rightAnswersId;
  }

  function haveNextLevel(state) {
    return state.activeQuestionId + 1 < state.quiz.length;
  }

  return (dispatch, getState) => {
    const state = getState().quizPage;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === `success`) {
        return;
      }
    }

    let answerResult = ``;
    let checkUserAnswer = `error`;
    const results = state.results;

    if (isAnswerIdRight(id, state)) {
      answerResult = `success`;

      if (!results[state.activeQuestionId]) {
        checkUserAnswer = `success`;
      }

      const timer = setTimeout(() => {
        if (haveNextLevel(state)) {
          dispatch(goToNextLevel());
        } else {
          dispatch(quizFinish());
        }

        clearTimeout(timer);
      }, 1500);
    } else {
      answerResult = `error`;
      checkUserAnswer = `error`;
    }

    results[state.activeQuestionId] = checkUserAnswer;

    dispatch(saveQuestionAnswer(results, answerResult, id));
  };
}
