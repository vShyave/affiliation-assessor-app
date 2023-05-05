let ADMIN_ROUTE_MAP = {
  auth: "/auth",
};

ADMIN_ROUTE_MAP.loginModule = {
  login: `${ADMIN_ROUTE_MAP.auth}/login`,
  registerotp: `${ADMIN_ROUTE_MAP.auth}/registerotp`,
  signup: `${ADMIN_ROUTE_MAP.auth}/register`,
  loginotp: `${ADMIN_ROUTE_MAP.auth}/loginotp`,
};

ADMIN_ROUTE_MAP.adminModule = {
  onGroundInspectionAnalysis: {
    list: "list",
  },
};

export default ADMIN_ROUTE_MAP;
