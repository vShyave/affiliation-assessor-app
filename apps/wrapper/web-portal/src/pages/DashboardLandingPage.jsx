import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./../components/Header";
import Nav from "../components/Nav";

const DashboardLandingPage = (props) => {
  return (
    <div>
      <Header></Header>
      <div className=''>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLandingPage;
