export const APIS = {
    APPLICATIONS: {
      STATUS_LIST: "/rest/getApplicationStatus",
    },
    FORMS: {
      LIST: "/rest/getAllCourses",
    },
    SIGNUP: {
      FUSION_AUTH_REGISTRATION: "user/registration",
    },
    LOGIN: {
      OTP_SEND: "user/otpSend",
      OTP_VERIFY:  "user/otpVerify",
      USERLOGIN: "login",
    },
    APPLICANT: {
      ADD_INSTITUTE: "rest/addInstitute",
      ADD_INSTITUTE_POC: "rest/addInstitutePoc",
      GET_APPLICANT_DETAILS: "rest/getApplicant"
    },
    FORM: {
      VIEW_FORM: "rest/getFormData"
    }

  };