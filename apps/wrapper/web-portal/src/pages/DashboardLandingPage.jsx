import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./../components/Header";

const DashboardLandingPage = (props) => {
  return (
    <div>
      <Header></Header>
      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
