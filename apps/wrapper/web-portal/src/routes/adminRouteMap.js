
let ADMIN_ROUTE_MAP = {};

ADMIN_ROUTE_MAP.loginModule = {
    login: `auth/login`,
    registerotp: `auth/registerotp`,
    signup: `auth/register`,
    loginotp: `auth/loginotp`,
}

ADMIN_ROUTE_MAP.adminModule = {
    onGroundInspection: {
        list: '/groundInspection/list',
        viewForm: '/groundInspection/view'
    }
}

export default ADMIN_ROUTE_MAP;
