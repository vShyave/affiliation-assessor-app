import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createContext, useEffect, useState } from "react";

import ADMIN_ROUTE_MAP from "./routes/adminRouteMap";
import './App.css';

import Authenticate from "./login/Authenticate";
import AdminLogin from "./login/AdminLogin";
import EnterOtp from "./login/EnterOtp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ADMIN_ROUTE_MAP.auth} element={ <Authenticate /> }>
            <Route path={ADMIN_ROUTE_MAP.loginModule.otp} element={ <EnterOtp /> }></Route>
            <Route path={ADMIN_ROUTE_MAP.loginModule.logIn} element={ <AdminLogin /> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
