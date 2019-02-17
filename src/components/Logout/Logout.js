import React from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    console.log(this.props.logout);
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);