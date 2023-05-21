import React from "react";
import APPLICANT_ROUTE_MAP from './ApplicantRoute';
import { Navigate } from "react-router";
import { getCookie } from "../utils";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = getCookie("userData");
  return isAuthenticated ? children : <Navigate to={APPLICANT_ROUTE_MAP.loginModule.login} />;
};

export default PrivateRoute;
