// To-do: replace with

import { Link } from "react-router-dom";

import "./style.css";

export default function Navbar() {
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
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
