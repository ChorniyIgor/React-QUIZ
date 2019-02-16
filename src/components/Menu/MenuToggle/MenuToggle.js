import React from "react";
import classes from "./MenuToggle.css";

const MenuToggle = props => {
  const cls = [classes.MenuToggle];
  if (props.isOpen) {
    cls.push(classes.MenuToggleOpen);
  }

  return <i onClick={props.onClick} className={cls.join(" ")} />;
};

export default MenuToggle;
