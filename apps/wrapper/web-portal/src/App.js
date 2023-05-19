import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import GroundInspectionListForms from "./pages/ground-analysis/GroundInspectionListForms";
import GroundInspectionViewForm from "./pages/ground-analysis/GroundInspectionViewForm";
import ManageUsersList from "./pages/manage-users/ManageUsersList";
import CreateUser from "./pages/manage-users/ManageUsersList";
import ManageFormsList from "./pages/manage-forms/ManageFormsList";
import DesktopAnalysisList from "./pages/desktop-analysis/DesktopAnalysisList";
import DesktopAnalysisView from "./pages/desktop-analysis/DesktopAnalysisView"
import CertificateManagementList from "./pages/certificate-management/CertificateManagementList";
import ScheduleManagementList from "./pages/schedule-management/ScheduleManagementList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ADMIN_ROUTE_MAP.auth} element={<Authenticate />}>
            <Route
              path={ADMIN_ROUTE_MAP.loginModule.login}
              element={<AdminLogin />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.loginModule.loginOtp}
              element={<LoginEnterOtp />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.loginModule.register}
              element={<AdminSingUp />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.loginModule.registerOtp}
              element={<EnterOtp />}
            ></Route>
          </Route>
          <Route
            path={ADMIN_ROUTE_MAP.adminModule.dashboard}
            element={<DashboardLandingPage />}
          >
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.manageUsers.list}
              element={<ManageUsersList />}
            ></Route>
              <Route
              path={ADMIN_ROUTE_MAP.adminModule.manageUsers.view}
              element={<CreateUser />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.manageForms.list}
              element={<ManageFormsList />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.list}
              element={<DesktopAnalysisList />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.viewForm}
              element={<DesktopAnalysisView />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.onGroundInspection.home}
              element={<GroundInspectionAnalysis />}
            >
              <Route
                path={ADMIN_ROUTE_MAP.onGroundInspection.list}
                element={<GroundInspectionListForms />}
              ></Route>
              <Route
                path={`${ADMIN_ROUTE_MAP.onGroundInspection.viewForm}/:formName/:formId`}
                element={<GroundInspectionViewForm />}
              ></Route>
            </Route>

            <Route
              path={ADMIN_ROUTE_MAP.adminModule.certificateManagement.list}
              element={<CertificateManagementList />}
            ></Route>
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.list}
              element={<ScheduleManagementList />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
