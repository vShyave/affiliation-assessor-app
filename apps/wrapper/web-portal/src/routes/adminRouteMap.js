
let ADMIN_ROUTE_MAP = {};

ADMIN_ROUTE_MAP.auth = "/auth";
ADMIN_ROUTE_MAP.loginModule = {
    login: `${ADMIN_ROUTE_MAP.auth}/login`,
    loginOtp: `${ADMIN_ROUTE_MAP.auth}/loginOtp`,
    register: `${ADMIN_ROUTE_MAP.auth}/register`,
    registerOtp: `${ADMIN_ROUTE_MAP.auth}/registerOtp`,
}

ADMIN_ROUTE_MAP.adminModule = {
    dashboard: '/',
    manageUsers: {
        list: 'manageUsers/list'
    },
    manageForms: {
        list: 'manageForms/list'
    },
    desktopAnalysis: {
        list: 'desktopAnalysis/list'
    },
    onGroundInspection: {
        list: 'groundInspection/list',
        viewForm: 'groundInspection/view'
    },
    certificateManagement: {
        list: 'certificate/list',
    },
    scheduleManagement: {
        list: 'schedule/list'
    }
}

export default ADMIN_ROUTE_MAP;
