
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
    onGroundInspection: {
        list: '/groundInspection/list',
        viewForm: '/groundInspection/view'
    }
}

export default ADMIN_ROUTE_MAP;
