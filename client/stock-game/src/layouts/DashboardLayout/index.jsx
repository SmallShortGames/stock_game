import React from "react";

import Navbar from "../../components/Navbar/";

export default function DashboardLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
