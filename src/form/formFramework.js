import is from "is_js";

class FormInput {
  static createFormControl(info, validation) {
    return {
      ...info,
      validation,
      valid: false,
      touched: false,
      value: "",
      shoudValidate: !!validation
    };
  }

  static isInputValid(value, validation) {
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

  static isFormValid(formControls) {
    let valid = true;

    for (let control in formControls) {
      if (formControls.hasOwnProperty(control)) {
        valid = formControls[control].valid && valid;
      }
    }

    return valid;
  }
}

export default FormInput;
