let APPLICANT_ROUTE_MAP = {};

APPLICANT_ROUTE_MAP.auth = '/auth';
APPLICANT_ROUTE_MAP.loginModule = {
    login: `${APPLICANT_ROUTE_MAP.auth}/login`,
    loginOTP: `${APPLICANT_ROUTE_MAP.auth}/loginOTP`,
    
};

APPLICANT_ROUTE_MAP.dashboard = '/';
APPLICANT_ROUTE_MAP.dashboardModule = {
    register: `${APPLICANT_ROUTE_MAP.dashboard}register`,
    my_applications: `${APPLICANT_ROUTE_MAP.dashboard}my_applications`,
    all_applications: `${APPLICANT_ROUTE_MAP.dashboard}all_applications`,
    congratulations: `${APPLICANT_ROUTE_MAP.dashboard}congratulations`,
    createForm: `${APPLICANT_ROUTE_MAP.dashboard}create-form`
};

export default APPLICANT_ROUTE_MAP;