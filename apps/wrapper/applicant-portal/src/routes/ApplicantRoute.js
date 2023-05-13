let APPLICANT_ROUTE_MAP = {};

APPLICANT_ROUTE_MAP.auth = '/auth';
APPLICANT_ROUTE_MAP.loginModule = {
    login: `${APPLICANT_ROUTE_MAP.auth}/login`,
    register: `${APPLICANT_ROUTE_MAP.auth}/register`,
    loginOTP: `${APPLICANT_ROUTE_MAP.auth}/loginOTP`,
};

export default APPLICANT_ROUTE_MAP;