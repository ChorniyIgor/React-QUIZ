import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Logout from "./components/Logout/Logout";
import { connect } from "react-redux";

class App extends Component {
  render() {
    let routsSwitch;
    if (this.props.isAuthorization) {
      routsSwitch = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={QuizList} />
        </Switch>
      );
    } else {
      routsSwitch = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={QuizList} />
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

export default connect(mapStateToProps)(App);
