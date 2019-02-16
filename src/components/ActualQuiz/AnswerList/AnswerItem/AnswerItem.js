import React from "react";
import classes from "./AnswerItem.css";

const AnswerItem = props => {
  const cls = [classes.AnswerItem];
  if (props.answerState) {
    cls.push(classes[props.answerState]);
  }

  return (
    <li
      className={cls.join(` `)}
      onClick={() => {
        props.onAnswerClick(props.answerID);
      }}
    >
      {props.answerItem}
    </li>
  );
};

export default AnswerItem;
