import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.css";

class Drawer extends React.Component {
  get menuItems() {
    const Menu = [
      { to: "/", label: "Список", exact: true },
      { to: "/auth", label: "Авторизація", exact: false },
      { to: "/quiz-creator", label: "Створити тест", exact: false }
    ];
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

export default Drawer;
