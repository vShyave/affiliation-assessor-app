
let ADMIN_ROUTE_MAP = {};

ADMIN_ROUTE_MAP.loginModule = {
    login: `auth/login`,
    loginOtp: `auth/loginOtp`,
    register: `auth/register`,
    registerOtp: `auth/registerOtp`,
}

ADMIN_ROUTE_MAP.adminModule = {
    dashboard: '/',
    onGroundInspection: {
        list: '/groundInspection/list',
        viewForm: '/groundInspection/view'
    }
}

export default ADMIN_ROUTE_MAP;
