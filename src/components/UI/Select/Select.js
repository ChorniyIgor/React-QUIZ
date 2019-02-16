import React from "react";
import classes from "./Select.css";

export default props => {
  const htmlFor = `${props.label}--${Math.random()}`;

  function renderOptions() {
    return props.options.map((item, index) => {
      return (
        <option value={item.value} key={item + index}>
          {item.text}
        </option>
      );
    });
  }

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} onChange={props.onChange} value={props.currentValue}>
        {renderOptions()}
      </select>
    </div>
  );
};
