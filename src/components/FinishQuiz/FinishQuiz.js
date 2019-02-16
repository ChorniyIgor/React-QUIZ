import React from "react";
import classes from "./FinishQuiz.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishQuiz = props => {
  const successCount = Object.keys(props.userResults).reduce((count, item) => {
    if (props.userResults[item] === "success") {
      count++;
    }
    return count;
  }, 0);

  return (
    <div className={classes.FinishQuiz}>
      <h1>Finish</h1>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return (
            <li
              key={index}
              className={props.userResults[index] === "success" ? classes.success : classes.error}
            >
              <small>{index + 1}. </small>
              {quizItem.question}
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} з {props.quiz.length}
      </p>
      <Button onClick={props.quizRestart} type="primary">
        Пройти тест ще раз
      </Button>
      <Link to="/">
        <Button type="success">Повернутись до списку запитань</Button>
      </Link>
    </div>
  );
};

export default FinishQuiz;
