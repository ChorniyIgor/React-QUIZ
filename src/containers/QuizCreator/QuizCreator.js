import React from "react";
import classes from "./QuizCreator.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import FormInput from "../../form/formFramework";
import { connect } from "react-redux";
import { addQuestionItemToList, sendQuizToServe } from "../../store/actions/creator";

function createOptionFormControl(i) {
  return FormInput.createFormControl(
    {
      label: `Відповідь ${i}`,
      errorMsg: `Поле не може бути пустим`,
      id: i
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: FormInput.createFormControl(
      {
        label: `Запитання:`,
        errorMsg: `Поле не може бути пустим`
      },
      { required: true }
    ),
    option1: createOptionFormControl(1),
    option2: createOptionFormControl(2),
    option3: createOptionFormControl(3),
    option4: createOptionFormControl(4)
  };
}

class QuizCreator extends React.Component {
  state = {
    quiz: [],
    isFormValid: false,
    currentQuestionId: 1,
    formControls: createFormControls()
  };

  onChangeInputHendler = (evt, inputName) => {
    const formControls = { ...this.state.formControls };
    const control = formControls[inputName];

    control.touched = true;
    control.value = evt.target.value;
    control.valid = FormInput.isInputValid(control.value, control.validation);

    let isFormValid = FormInput.isFormValid(formControls);

    this.setState({
      formControls,
      isFormValid
    });
  };

  renderFormControls() {
    return Object.keys(this.state.formControls).map((name, index) => {
      const input = this.state.formControls[name];
      return (
        <React.Fragment key={input + index}>
          <Input inputState={input} onInputChange={this.onChangeInputHendler} inputName={name} />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  onChangeSelectHendler = evt => {
    this.setState({
      currentQuestionId: +evt.target.value
    });
  };

  addQuestionBtnHendler = evt => {
    evt.preventDefault();

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswersId: this.state.currentQuestionId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    };

    this.props.addQuestionItemToList(questionItem);

    this.setState({
      isFormValid: false,
      currentQuestionId: 1,
      formControls: createFormControls()
    });
  };

  addTestBtnHendler = async evt => {
    evt.preventDefault();
    this.props.sendQuizToServe().then(() => {
      this.setState({
        isFormValid: false,
        currentQuestionId: 1,
        formControls: createFormControls()
      });
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Створити новий тест</h1>
          <form>
            {this.renderFormControls()}
            <Select
              label="Оберіть номер вірної відповіді для даного тесту"
              currentValue={this.state.currentQuestionId}
              options={[
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
                { value: 4, text: 4 }
              ]}
              onChange={this.onChangeSelectHendler}
            />
            <Button
              type="success"
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionBtnHendler}
            >
              Додати запитання
            </Button>
            <Button
              type="primary"
              disabled={this.props.quiz.length === 0}
              onClick={this.addTestBtnHendler}
            >
              Створити тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.createPage.quiz
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addQuestionItemToList: item => dispatch(addQuestionItemToList(item)),
    sendQuizToServe: () => dispatch(sendQuizToServe())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreator);
