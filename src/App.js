import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Logout from "./components/Logout/Logout";
import { connect } from "react-redux";
import { autoLogin } from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routsSwitch;
    if (this.props.isAuthorization) {
      routsSwitch = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routsSwitch = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routsSwitch}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthorization: !!state.authPage.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => {
      dispatch(autoLogin());
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
