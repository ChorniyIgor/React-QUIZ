import React from "react";
import classes from "./Input.css";

function isInvalid(inputState) {
  const { valid, touched, shoudValidate } = inputState;
  return touched && shoudValidate && !valid;
}

export default props => {
  const inputState = props.inputState;
  const type = inputState.type || "text";
  const label = inputState.label;
  const value = inputState.value;
  const htmlFor = `${type}--${Math.random()}`;
  const ErrorMsg = inputState.errorMsg;

  const cls = [classes.Input];
  if (isInvalid(inputState)) {
    cls.push(classes.Invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type={type}
        value={value}
        onChange={evt => {
          props.onInputChange(evt, props.inputName);
        }}
      />
      {isInvalid(inputState) ? <span>{ErrorMsg}</span> : null}
    </div>
  );
};
