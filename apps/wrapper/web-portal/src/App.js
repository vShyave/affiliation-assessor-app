import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createContext, useEffect, useState } from "react";

import ADMIN_ROUTE_MAP from "./routes/adminRouteMap";
import './App.css';

import AdminLogin from "./login/AdminLogin";
import Authenticate from "./login/Authenticate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={ <Authenticate /> }>
            <Route path="/auth/login" element={ <AdminLogin /> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
