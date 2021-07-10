import React, { useState } from "react";

import Form from "@rjsf/bootstrap-4";

export default function LoginForm() {
  const [loginState, setLoginState] = useState(null);

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

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      showErrorList={false}
      // noHtml5Validate={true}
      formData={loginState}
      onSubmit={(e) => console.log(loginState)}
      onChange={(e) => console.log(loginState)}
    />
  );
}
