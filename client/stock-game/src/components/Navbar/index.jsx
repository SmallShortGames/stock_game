// To-do: replace with
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

import "./style.css";

export default function Navbar() {
  const { dispatch } = React.useContext(AuthContext);

  function handleLogout() {
    dispatch({ type: "LOGOUT", payload: {} });
  }
  return (
    <>
      <header>
        <div className="navbar_wrapper">
          <ul className="navbar_list">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Sign Up</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
