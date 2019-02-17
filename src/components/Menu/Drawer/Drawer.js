import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.css";
import { connect } from "react-redux";

class Drawer extends React.Component {
  get menuItems() {
    let Menu = [{ to: "/", label: "Список", exact: true }];

    if (this.props.isAuthorization) {
      Menu.push({ to: "/quiz-creator", label: "Створити тест", exact: false });
      Menu.push({ to: "/logout", label: "Вийти", exact: true });
    } else {
      Menu.push({ to: "/auth", label: "Авторизація", exact: false });
    }

    return Menu.map((link, index) => {
      return (
        <li key={index}>
          <NavLink to={link.to} exact={link.exact} onClick={this.props.onClickHendler}>
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];
    if (this.props.isOpen) {
      cls.push(classes.DrawerOpen);
    }
    return (
      <nav className={cls.join(" ")}>
        <ul>{this.menuItems}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorization: !!state.authPage.token
  };
}

export default connect(mapStateToProps)(Drawer);
