import React, { useEffect, useState, useContext } from "react";
import Portfolio from "../../components/Portfolio";
import API from "../../utils/API";
import "./style.css";
import { AuthContext } from "../../App";

export default function Profile() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    gross_profit: "",
    total_equity: "",
    portfolio: {},
    isLoaded: false,
  });

  useEffect(() => {
    API.userData(token)
      .then((response) => {
        setUserData({ ...response.data.data, isLoaded: true });
      })
      .catch((err) => console.error(err));
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
            <Portfolio data={userData.portfolio} />
          </div>
        </div>
      </>
    );
  } else {
    return "loading...";
  }
}
