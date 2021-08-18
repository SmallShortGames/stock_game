import React, { useState } from "react";
import Form from "@rjsf/bootstrap-4";
import { AuthContext } from "../App";
import API from "../utils/API";

export default function LoginForm() {
  const { dispatch } = React.useContext(AuthContext);

  function validate(formData, errors) {

    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if (mailformat.test(formData.email)) {
      return true;
    } else {
      errors.email.addError("Please enter an actual email!");
    }

    const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/;

    if (passwordformat.test(formData.password)) {
      return true;
    } else if (formData.password === undefined || formData.password === "" || formData.password.length < 6) {
      errors.password.addError("Password needs to use at least 8 characters");
    } else {
      errors.password.addError(
        "Please use one uppercase letter and one number."
      );
    }

    return errors;
  }

  const schema = {
    showErrorList: "false",
    type: "object",
    properties: {
      email: {
        type: "string",
        title: "Email",
      },
      password: {
        type: "string",
        title: "Password",
      },
    },
  };

  const uiSchema = {
    email: {
      "ui:widget": "email",
    },
    password: {
      "ui:widget": "password",
    },
  };

  function handleSubmit(data) {
    const temp = {
      email: data.email,
      password: data.password,
    };
    console.log(temp);
    API.userLogin(temp)
      .then((res) => {
        if (res.statusText === "OK" || res.status === 200) {
          dispatch({ type: "LOGIN", payload: res.data });
        }
        throw res;
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validate={validate}
      showErrorList={false}
      noHtml5Validate={true}
      onSubmit={({ formData }) => handleSubmit(formData)}
    />
  );
}
