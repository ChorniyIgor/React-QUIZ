import React from "react";
import classes from "./Loader.css";

export default () => {
  return (
    <div className={classes["lds-roller"]}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
