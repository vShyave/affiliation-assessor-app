
let ADMIN_ROUTE_MAP = {
    auth: '/auth'
};

ADMIN_ROUTE_MAP.loginModule = {
    logIn: `${ADMIN_ROUTE_MAP.auth}/login`,
    otp: `${ADMIN_ROUTE_MAP.auth}/otp`,
    signup: `${ADMIN_ROUTE_MAP.auth}/register`,
}

export default ADMIN_ROUTE_MAP;
