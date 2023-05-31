import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import APPLICANT_ROUTE_MAP from "./routes/ApplicantRoute";

import Authenticate from "./login/Authenticate";
import ApplicantLogin from "./login/ApplicantLogin";
import LoginOTP from "./login/LoginOTP";
import Register from "./login/Register";

import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import AllApplications from "./pages/AllApplications";
import Congratulations from "./pages/Congratulation";
import PrivateRoute from "./routes/PrivateRoute";
import CreateForm from "./pages/CreateForm";


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

          <Route path={APPLICANT_ROUTE_MAP.dashboard} element={<Dashboard />}>
            <Route
              path={APPLICANT_ROUTE_MAP.dashboardModule.register}
              element={<Register />}
            ></Route>
            <Route
              path={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}
              element={
                <PrivateRoute>
                    <MyApplications />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path={APPLICANT_ROUTE_MAP.dashboardModule.all_applications}
              element={
                <PrivateRoute>
                  <AllApplications />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path={`${APPLICANT_ROUTE_MAP.dashboardModule.createForm}/:formName`}
              element={
                <PrivateRoute>
                  <CreateForm />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path={APPLICANT_ROUTE_MAP.dashboardModule.congratulations}
              element={<Congratulations />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
