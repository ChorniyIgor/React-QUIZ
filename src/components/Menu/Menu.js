import React from "react";
import MenuTogle from "./MenuToggle/MenuToggle";
import Drawer from "./Drawer/Drawer";
import Backdrop from "./Backdrop/Backdrop";

const Menu = props => {
  return (
    <React.Fragment>
      <MenuTogle isOpen={props.isOpen} onClick={props.toggleHendler} />
      <Drawer isOpen={props.isOpen} onClickHendler={props.backdropHendler} />
      {props.isOpen ? <Backdrop onClickHendler={props.backdropHendler} /> : null}
    </React.Fragment>
  );
};

export default Menu;
