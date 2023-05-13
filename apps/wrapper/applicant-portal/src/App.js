import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import APPLICANT_ROUTE_MAP from "./routes/ApplicantRoute";

import Authenticate from "./login/Authenticate";
import ApplicantLogin from "./login/ApplicantLogin";
import LoginOTP from "./login/LoginOTP";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={APPLICANT_ROUTE_MAP.auth} element={<Authenticate />}>
            <Route
              path={APPLICANT_ROUTE_MAP.loginModule.login}
              element={<ApplicantLogin />}
            ></Route>
            <Route
              path={APPLICANT_ROUTE_MAP.loginModule.loginOTP}
              element={<LoginOTP />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
