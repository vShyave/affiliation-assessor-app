export const APIS = {
    APPLICATIONS: {
      STATUS_LIST: "/rest/getApplicationStatus",
    },
    FORMS: {
      LIST: "/rest/getAllCourses",
      VIEW_FORM: `/rest/getFormData`,
    },
    SIGNUP: {
      CREATE_USER: "keycloak/user/create",
    },
    LOGIN: {
      GENERATE_OTP: "user/generateOtp",
      USERLOGIN: "user/login",
    },
    APPLICANT: {
      ADD_INSTITUTE: "rest/addInstitute",
      ADD_INSTITUTE_POC: "rest/addInstitutePoc",
      GET_APPLICANT_DETAILS: "rest/getApplicant"
    },
    PROFILE:{
      VIEW_PROFILE : "rest/getInstitute",
      EDIT_PROFILE : "rest/editInstitute"
    },
    ACCESS_TOKEN:{
      TOKEN_URL: "realms/sunbird-rc/protocol/openid-connect/token"
    }

  };
