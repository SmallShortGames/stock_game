import { Link } from "react-router-dom";

import Form from "@rjsf/bootstrap-4";

export default function LoginForm() {
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("I work");
  }
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      showErrorList={false}
      // noHtml5Validate={true}
      onSubmit={handleSubmit}
    />
  );
}
