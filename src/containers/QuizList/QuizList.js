import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.css";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizList } from "../../store/actions/quiz";

class QuizList extends React.Component {
  renderQuizList() {
    return this.props.quizes.map((test, index) => {
      return (
        <li key={test + index}>
          <NavLink to={"/quiz/" + test}>Тест №{index + 1}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizList();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список запитань</h1>
        {this.props.showLoader ? <Loader /> : <ul>{this.renderQuizList()}</ul>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoader: state.quizPage.showLoader,
    quizes: state.quizPage.quizes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizList: () => dispatch(fetchQuizList())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizList);
