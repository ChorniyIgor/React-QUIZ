import React from "react";
import classess from "./ActualQuiz.css";
import AnswerList from "./AnswerList/AnswerList";

const ActualQuiz = props => {
  return (
    <div className={classess.ActualQuiz}>
      <div className={classess.Question}>
        <p>
          <small>{props.questionId}. </small>
          {props.quiz.question}
        </p>
        <small>
          {props.questionId} of {props.totalQuizCount}
        </small>
      </div>

      <AnswerList
        answers={props.quiz.answers}
        onAnswerClick={props.onAnswerClick}
        answerState={props.answerState}
      />
    </div>
  );
};

export default ActualQuiz;
