
let ADMIN_ROUTE_MAP = {};

ADMIN_ROUTE_MAP.loginModule = {
    login: `auth/login`,
    registerOtp: `auth/registerOtp`,
    signup: `auth/register`,
    loginOtp: `auth/loginOtp`,
}

ADMIN_ROUTE_MAP.adminModule = {
    onGroundInspection: {
        list: '/groundInspection/list',
        viewForm: '/groundInspection/view'
    }
}

export default ADMIN_ROUTE_MAP;
