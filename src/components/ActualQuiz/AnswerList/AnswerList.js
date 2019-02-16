import React from "react";
import classes from "./AnswerList.css";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = props => {
  return (
    <ul className={classes.AnswerList}>
      {props.answers.map((item, index) => {
        return (
          <AnswerItem
            key={index}
            answerItem={item.text}
            answerID={item.id}
            onAnswerClick={props.onAnswerClick}
            answerState={props.answerState ? props.answerState[item.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswerList;
