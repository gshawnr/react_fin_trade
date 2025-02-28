import { Outlet } from "react-router-dom";
// import React from "react";

import Nav from "../components/Nav";

function Layout() {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
