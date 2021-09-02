import Form from "@rjsf/bootstrap-4";

export default function RegistrationForm() {
  function validate(formData, errors) {
    if (formData.username === undefined || formData.username === "") {
      errors.username.addError("Username cannot be empty");
    } else if (formData.username.length < 8) {
      errors.username.addError("Username needs to use at least 8 characters");
    }

    const mailformat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (mailformat.test(formData.email)) {
      return true;
    } else {
      errors.email.addError("Please enter an actual email!");
    }

    const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/;

    if (passwordformat.test(formData.password)) {
      return true;
    } else if (
      formData.password === undefined ||
      formData.password === "" ||
      formData.password.length < 6
    ) {
      errors.password.addError("Password needs to use at least 8 characters");
    } else {
      errors.password.addError(
        "Please use one uppercase letter and one number."
      );
    }

    if (formData.password !== formData.confirm_password) {
      errors.confirm_password.addError("Passwords don't match");
    }
    return errors;
  }

  const schema = {
    showErrorList: "false",
    type: "object",
    properties: {
      username: {
        type: "string",
        title: "Username",
        minLength: 8,
        required: true,
      },
      email: {
        type: "string",
        title: "Email",
        required: true,
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 8,
        required: true,
      },
      confirm_password: {
        type: "string",
        title: "Confirm Password",
        minLength: 8,
        required: true,
      },
    },
  };

  const uiSchema = {
    username: {
      //   "ui:emptyValue": true,
      "ui:options": {
        placeholder: "Name goes here",
      },
    },
    email: {
      //   "ui:widget": "email",
    },
    password: {
      "ui:widget": "password",
      "ui:options": {
        help: "Make it strong!",
      },
    },
    confirm_password: {
      "ui:widget": "password",
    },
  };
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validate={validate}
      showErrorList={false}
      noHtml5Validate={true}
    />
  );
}
