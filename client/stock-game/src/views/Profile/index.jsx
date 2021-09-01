import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./style.css";
import Navbar from "../../components/Navbar/";

export default function Profile() {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    gross_profit: "",
    total_equity: "",
    portfolio: {},
    isLoaded: false,
  });

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("user"));
    API.userData(userID).then((response) => {
      setUserData({ ...response.data.data, isLoaded: true });
    });
  }, []);

  if (userData.isLoaded) {
    return (
      <>
        <div className="profile_container">
          <div className="profile_heading_container">
            <h3>{userData.username}'s Profile</h3>
          </div>
          <div className="profile_body_container">
            <p>Total equity: {userData.total_equity}</p>
            <p>Gross Profit: {userData.gross_profit}</p>
            <p>Portfolio: {JSON.stringify(userData.portfolio)}</p>
          </div>
        </div>
      </>
    );
  } else {
    return "loading...";
  }
}
