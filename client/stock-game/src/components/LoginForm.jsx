import React, { useState } from "react";
import Form from "@rjsf/bootstrap-4";
import { AuthContext } from "../App";
import API from "../utils/API";

export default function LoginForm() {
  const { dispatch } = React.useContext(AuthContext);
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
      showErrorList={false}
      noHtml5Validate={true}
      onSubmit={({ formData }) => handleSubmit(formData)}
    />
  );
}
