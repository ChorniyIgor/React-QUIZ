import React from "react";
import classes from "./Quiz.css";
import ActualQuiz from "../../components/ActualQuiz/ActualQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizItem, onAnswerClickHendler, quizRestart } from "../../store/actions/quiz";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuizItem(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.quizRestart();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        {this.props.loader || this.props.quiz.length === 0 ? (
          <Loader />
        ) : this.props.isFinish ? (
          <FinishQuiz
            quiz={this.props.quiz}
            userResults={this.props.results}
            quizRestart={this.props.quizRestart}
          />
        ) : (
          <React.Fragment>
            <h1>Дайте відповідь на усі запитання</h1>
            <ActualQuiz
              quiz={this.props.quiz[this.props.activeQuestionId]}
              totalQuizCount={this.props.quiz.length}
              onAnswerClick={this.props.onAnswerClickHendler}
              answerState={this.props.answerState}
              questionId={this.props.activeQuestionId + 1}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFinish: state.quizPage.isFinish,
    results: state.quizPage.results,
    activeQuestionId: state.quizPage.activeQuestionId,
    answerState: state.quizPage.answerState,
    loader: state.quizPage.showLoader,
    quiz: state.quizPage.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizItem: id => dispatch(fetchQuizItem(id)),
    onAnswerClickHendler: id => dispatch(onAnswerClickHendler(id)),
    quizRestart: () => dispatch(quizRestart())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
