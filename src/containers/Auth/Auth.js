import React from "react";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      login: {
        type: "email",
        value: "",
        label: "Логін:",
        valid: false,
        touched: false,
        errorMsg: "Логін введено не вірно",
        shoudValidate: true,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        type: "password",
        value: "",
        label: "Пароль:",
        valid: false,
        touched: false,
        errorMsg: "Пароль введено не вірно",
        shoudValidate: true,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };
  formSubmitHendler(evt) {
    evt.preventDefault();
  }
  checkValid(value, validation) {
    let valid = true;
    if (!validation) {
      return true;
    }

    if (validation.required) {
      valid = value.trim() !== "" && valid;
    }

    if (validation.email) {
      valid = is.email(value);
    }

    if (validation.minLength) {
      valid = value.trim().length > validation.minLength && valid;
    }

    return valid;
  }

  onChangeInputHendler = (evt, inputName) => {
    evt.preventDefault();

    const formControls = Object.assign({}, this.state.formControls);
    const inputState = formControls[inputName];
    inputState.touched = true;
    inputState.value = evt.target.value;
    inputState.valid = this.checkValid(inputState.value, inputState.validation);

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  signInBtnHendler = () => {
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      true
    );
  };

  signUpBtnHendler = async () => {
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      false
    );
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((item, index) => {
      const input = this.state.formControls[item];
      return (
        <Input
          inputState={input}
          key={item + index}
          onInputChange={this.onChangeInputHendler}
          inputName={item}
        />
      );
    });
  }
  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthContainer}>
          <h1>Авторизація</h1>
          <form className={classes.AuthForm} onSubmit={this.formSubmitHendler}>
            {this.renderInputs()}
            <Button
              type="success"
              disabled={!this.state.isFormValid}
              onClick={this.signInBtnHendler}
            >
              Увійти
            </Button>
            <Button
              type="primary"
              disabled={!this.state.isFormValid}
              onClick={this.signUpBtnHendler}
            >
              Зареєструватись
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, pass, isLogin) => dispatch(auth(email, pass, isLogin))
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Auth);
