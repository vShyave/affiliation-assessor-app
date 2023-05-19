let ADMIN_ROUTE_MAP = {};
let MANAGE_USERS = 'manageUsers'

ADMIN_ROUTE_MAP.auth = "/auth";
ADMIN_ROUTE_MAP.loginModule = {
  login: `${ADMIN_ROUTE_MAP.auth}/login`,
  loginOtp: `${ADMIN_ROUTE_MAP.auth}/loginOtp`,
  register: `${ADMIN_ROUTE_MAP.auth}/register`,
  registerOtp: `${ADMIN_ROUTE_MAP.auth}/registerOtp`,
};

ADMIN_ROUTE_MAP.adminModule = {
  dashboard: "/",
  manageUsers: {
    home: `/${MANAGE_USERS}`,
    list: `/${MANAGE_USERS}/list`,
    createUser:`/${MANAGE_USERS}/create-update-user`
  },
  manageForms: {
    list: "manageForms/list",
  },
  desktopAnalysis: {
    list: "desktopAnalysis/list",
    viewForm: "desktopAnalysis/view"
  },
  onGroundInspection: {
    list: "groundInspection/list",
    viewForm: "groundInspection/view",
  },
  certificateManagement: {
    list: "certificate/list",
  },
  scheduleManagement: {
    list: "schedule/list",
  },
};

//Ground Inspection Routes
ADMIN_ROUTE_MAP.onGroundInspection = {
  home: "/groundInspection",
};

ADMIN_ROUTE_MAP.onGroundInspection = {
  list: `${ADMIN_ROUTE_MAP.onGroundInspection.home}/list`,
  viewForm: `${ADMIN_ROUTE_MAP.onGroundInspection.home}/view`,
};

// Desktop Analysis Routes
ADMIN_ROUTE_MAP.desktopAnalysis = {
  home: "/desktopAnalysis",
};

ADMIN_ROUTE_MAP.desktopAnalysis= {
  list: `${ADMIN_ROUTE_MAP.desktopAnalysis.home}/list`,
  viewForm: `${ADMIN_ROUTE_MAP.desktopAnalysis.home}/view`,
};

//Manage Users Routes
ADMIN_ROUTE_MAP.manageUsers = {
  home: "/manageUsers",
  
};

ADMIN_ROUTE_MAP.manageUsers = {
  // list: `${ADMIN_ROUTE_MAP.manageUsers.home}/list`,
  viewForm: `${ADMIN_ROUTE_MAP.manageUsers.home}/view`,
};

export default ADMIN_ROUTE_MAP;
