import React, { useEffect } from "react";
import API from "../../utils/API";
import "./style.css";
import Navbar from "../../components/Navbar/";

export default function Profile() {
  const userID = JSON.parse(localStorage.getItem("user"));
  console.log("userId: ", userID);
  let userObject;

  useEffect(() => {
    API.userData(userID).then((response) => {
      console.log(response.data);
    });
  });

  return (
    <>
      <Navbar />
      <div className="profile_container">
        <div className="profile_heading_container">
          <h3>$USERNAME$'s Profile</h3>
        </div>
        <div className="profile_body_container">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
            blanditiis sint dolores consectetur, incidunt explicabo, ex
            laudantium hic sapiente saepe ipsam veritatis ad maxime nemo!
          </p>
        </div>
      </div>
    </>
  );
}
