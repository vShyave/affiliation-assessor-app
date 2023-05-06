import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import ADMIN_ROUTE_MAP from "./routes/adminRouteMap";
import "./App.css";

// login pages...
import Authenticate from "./login/Authenticate";
import AdminLogin from "./login/AdminLogin";
import EnterOtp from "./login/EnterOtp";
import AdminSingUp from "./login/AdminSignUp";
import LoginEnterOtp from "./login/LoginEnterOtp";

// Dashboard pages...
import DashboardLandingPage from "./pages/DashboardLandingPage";
import GroundInspectionAnalysis from "./pages/ground-analysis/GroundInspectionAnalysis";
import GroundInspectionViewForm from "./pages/ground-analysis/GroundInspectionViewForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ADMIN_ROUTE_MAP.auth} element={ <Authenticate /> }>
            <Route path={ADMIN_ROUTE_MAP.loginModule.login} element={ <AdminLogin /> }></Route>
            <Route path={ADMIN_ROUTE_MAP.loginModule.loginOtp} element={ <LoginEnterOtp /> }></Route>
            <Route path={ADMIN_ROUTE_MAP.loginModule.register} element={ <AdminSingUp /> }></Route>
            <Route path={ADMIN_ROUTE_MAP.loginModule.registerOtp} element={ <EnterOtp /> }></Route>
          </Route>
          <Route path={ADMIN_ROUTE_MAP.adminModule.dashboard} element={ <DashboardLandingPage /> }>
            <Route path={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.list} element={ <GroundInspectionAnalysis /> }></Route>
            <Route path={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.viewForm} element={ <GroundInspectionViewForm /> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
