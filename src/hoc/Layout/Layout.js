import React from "react";
import classes from "./Layout.css";
import Menu from "../../components/Menu/Menu";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false
    };
  }

  onMenuClick = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  };

  BackdropHendler = () => {
    this.setState({
      menuIsOpen: false
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Menu
          isOpen={this.state.menuIsOpen}
          toggleHendler={this.onMenuClick}
          backdropHendler={this.BackdropHendler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
