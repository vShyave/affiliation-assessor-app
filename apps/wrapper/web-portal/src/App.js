import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createContext, useEffect, useState } from "react";

import ADMIN_ROUTE_MAP from "./routes/adminRouteMap";
import './App.css';

import AdminLogin from "./login/AdminLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ADMIN_ROUTE_MAP.loginModule.logIn} element={ <AdminLogin /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
