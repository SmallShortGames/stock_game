import React from "react";
import "./style.css";

import Navbar from "../../components/Navbar/";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="page-container">
        <header className="navbar-container">
          <Navbar />
        </header>
        <main className="main-container">{children}</main>
      </div>
    </>
  );
}
