// To-do: replace with
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

import "./style.css";

export default function Navbar() {
  const { dispatch } = React.useContext(AuthContext);
  const [openState, setOpenState] = useState(false);

  function handleLogout() {
    dispatch({ type: "LOGOUT", payload: {} });
  }

  function handleMenuClick() {
    setOpenState(!openState);
  }
  return (
    <>
      <div className="navbar_wrapper">
        <div
          className={openState ? "hamburger active" : "hamburger"}
          onClick={handleMenuClick}
        >
          <div className="hamburger-line hamburger-line-top"></div>
          <div className="hamburger-line hamburger-line-middle"></div>
          <div className="hamburger-line hamburger-line-bottom"></div>
        </div>
        <ul className={openState ? "active" : null}>
          <li>
            <Link to="/profile" onClick={handleMenuClick}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/search" onClick={handleMenuClick}>
              Search
            </Link>
          </li>
          <li>
            <Link to="/home" onClick={handleMenuClick}>
              Home
            </Link>
          </li>
        </ul>
        <div className="logout-container">
          <Link to="#" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
