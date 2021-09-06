import React, { useState } from "react";
import API from "../../utils/API";
import { AuthContext } from "../../App";

export default function RegistrationForm() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [registrationState, setRegistrationState] = useState(initialState);
  const { dispatch } = React.useContext(AuthContext);

  function handleChange(event) {
    //deconstruct event
    const { name, value } = event.target;
    setRegistrationState({
      ...registrationState,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    API.userRegister(registrationState)
      .then((response) => {
        if (response.status === "201") {
          dispatch({
            type: "LOGIN",
            payload: {
              data: response.data.data,
              token: response.headers["x-access-tokens"],
            },
          });
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <br />
          <input name="username" type="text" onChange={handleChange} />
        </label>
        <br />
        <label>
          Email
          <br />
          <input name="email" type="text" onChange={handleChange} />
        </label>
        <br />
        <label>
          Password
          <br />
          <input name="password" type="password" onChange={handleChange} />
        </label>
        <br />
        <label>
          Confirm Password
          <br />
          <input name="confirm_password" type="password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
