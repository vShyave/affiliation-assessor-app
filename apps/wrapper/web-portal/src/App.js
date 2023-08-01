import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import ADMIN_ROUTE_MAP from "./routes/adminRouteMap";
import "./App.css";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import fireBaseApp, { onMessageListener, getPermissionForToken } from "./config/firebase";

// import { messaging } from "firebase/compat/messaging";

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
import AdminCreateUser from "./pages/manage-users/AdminCreateUser";
// import ManageFormsList from "./pages/manage-forms/ManageFormsList";

import ManageForms from "./pages/manage-forms/ManageForms";
import FormsOverview from "./pages/manage-forms/FormsOverview";
import CreateForm from "./pages/manage-forms/CreateForm";
import UploadForm from "./pages/manage-forms/UploadForm";

import DesktopAnalysisList from "./pages/desktop-analysis/DesktopAnalysisList";
import DesktopAnalysisView from "./pages/desktop-analysis/DesktopAnalysisView";
import CertificateManagement from "./pages/certificate-management/CertificateManagement";
import CertificateManagementList from "./pages/certificate-management/CertificateManagementList";
import ScheduleManagementList from "./pages/schedule-management/ScheduleManagementList";
import ManageUser from "./pages/manage-users/ManageUser";
import DesktopAnalysis from "./pages/desktop-analysis/DesktopAnalysis";
import PrivateRoute from "./routes/PrivateRoute";
import ScheduleManagement from "./pages/schedule-management/ScheduleManagement";
import ScheduledUploadForm from "./pages/schedule-management/ScheduledUploadForm";
import Notification from "./pages/notifications/Notification";
import NotificationsDetailedView from "./pages/notifications/NotificationsDetailedView";
import NocIssued from "./pages/ground-analysis/NocIssuedConfirmation";

function App() {
  // const messaging = getMessaging(fireBaseApp);
  isSupported().then((payload) => {
    console.log("payload - ", payload);
    onMessageListener()?.then(payload => {
      // setNotification({title: payload.notification.title, body: payload.notification.body})
      // setShow(true);
      console.log(payload);
    }).catch(err => console.log('failed: ', err));
  }); 

  useEffect(() => {
    getPermissionForToken()
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Default landing page */}
          <Route path="/" element={<Navigate to="/auth/login" />} />

          {/* Register and Login Routes */}
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

          {/* Dashboard routing starts here */}
          <Route
            path={ADMIN_ROUTE_MAP.adminModule.dashboard}
            element={
              //  <PrivateRoute>
              <DashboardLandingPage />
              /* </PrivateRoute>  */
            }
          >
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}
              element={<ManageUser />}
            >
              <Route index element={<ManageUsersList />}></Route>
              <Route
                path={`${ADMIN_ROUTE_MAP.adminModule.manageUsers.createUser}/:userId?`}
                element={<AdminCreateUser />}
              ></Route>
            </Route>

            {/* Notifications routing starts here */}
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.notifications.home}
              element={<Notification />}
            >
              <Route index element={<NotificationsDetailedView />}></Route>
            </Route>
            {/*Manage forms routing starts here */}
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.manageForms.home}
              element={<ManageForms />}
            >
              <Route index element={<FormsOverview />}></Route>
              <Route
                path={ADMIN_ROUTE_MAP.adminModule.manageForms.createForm}
                element={<CreateForm />}
              ></Route>
              <Route
                path={ADMIN_ROUTE_MAP.adminModule.manageForms.upload}
                element={<UploadForm />}
              ></Route>
              <Route
                path={`${ADMIN_ROUTE_MAP.adminModule.manageForms.viewForm}/:formName/:formId`}
                element={<CreateForm />}
              ></Route>
            </Route>
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home}
              element={<DesktopAnalysis />}
            >
              <Route index element={<DesktopAnalysisList />}></Route>
              <Route
                path={`${ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.viewForm}/:formName/:formId`}
                element={<DesktopAnalysisView />}
              ></Route>
            </Route>
            {/*Ground Inspection routing starts here  */}
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home}
              element={<GroundInspectionAnalysis />}
            >
              <Route index element={<GroundInspectionListForms />}></Route>
              <Route
                path={`${ADMIN_ROUTE_MAP.adminModule.onGroundInspection.viewForm}/:formName/:formId/:instituteName/:round`}
                element={<GroundInspectionViewForm />}
              ></Route>

              <Route
                path={`${ADMIN_ROUTE_MAP.adminModule.onGroundInspection.nocIssued}`}
                element={<NocIssued />}
              ></Route>
            </Route>
            {/* Certificate management routing starts here */}
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.certificateManagement.home}
              element={<CertificateManagement />}
            >
              <Route index element={<CertificateManagementList />}></Route>
            </Route>
            {/* Schedule management routing starts here */}
            <Route
              path={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.home}
              element={<ScheduleManagement />}
            >
              <Route index element={<ScheduleManagementList />}></Route>
              <Route
                path={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.uploadForm}
                element={<ScheduledUploadForm />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
