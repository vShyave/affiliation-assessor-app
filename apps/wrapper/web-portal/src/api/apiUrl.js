const rest = "rest/";

const API_URL = {
  auth: {
    register: `${rest}createAdmin`,
    getRegulator: `${rest}getRegulator`,
  },
  common: {
    registerEvent: `${rest}addEvents`,
  },
  groundAnalysis: {
    viewForm: `${rest}getFormData`,
    list: `${rest}getGroundInspectionAnalysis`,
    markStatus: `${rest}inProgress`,
    acceptApplicant: `${rest}acceptForm`,
    rejectApplicant: `${rest}rejectForm`,
    getGroundInspectionAnalysis: `${rest}getGroundInspectionAnalysis`,
    ViewStatus: {
      getViewStatus: `${rest}getStatusLog`,
    },
    filterOGA: `${rest}filterOGA`
  },
  manageForms: {
    getForms: `${rest}getForms`,
    convertODKtoXML: `user/convert`,
    nocPdfUpload:`user/upload`,
    createForm: `${rest}createForm`,
    publishForms: `${rest}publishForms`,
    unpublishForms: `${rest}unpublishForms`,
    viewForm: `${rest}viewForm`,
    duplicateForm:`${rest}duplicateForm`,
    deleteForm: `${rest}deleteForm`,
    filterForms: `${rest}filterForms`,
    createCourses: `${rest}createCourse`
  },
  manageUsers: {
    userList: `${rest}getAllUsers`,
    specificUser: `${rest}getSpecificUser`,
    filterUsers: `${rest}filterUsers`,
    setActivate: `${rest}setValid`,
    setDeactive: `${rest}setInvalid`,
    addUsers: `${rest}addUsers`,
    deleteUser: `${rest}deleteUser`
  },

desktopAnalysis:{
    getUsersForSchedulingAssessment:`${rest}getUsersForSchedulingAssessment`,
    scheduleAssessment: `${rest}addAssessmentSchedule`,
    getDesktopAnalysisForms: `${rest}getDesktopAnalysis`,
    getCourseOGA : `${rest}getCoursesOGA`,
    filterDesktopAnalysis: `${rest}filterDesktopAnalysis`
  },
  scheduleManagement:{
    getAssessmentSchedule: `${rest}getAssessmentSchedule`,
    filterAssessments: `${rest}filterAssessments`,
    addAssessmentSchedule: `${rest}addAssessmentSchedule`
  },
  SIGNUP: {
    CREATE_BULK_USER: "keycloak/createBulkUser",
    CREATE_USER: "keycloak/user/create"
  },  
  LOGIN: {
    GENERATE_OTP: "user/generateOtp",
    USERLOGIN: "user/login",
  },
  DELETE:{
    DELETE_USER:"keycloak/user/delete"
  },
  NOTIFICATION: {
    SEND_SMS: "",
    SEND_EMAIL: "",
    SAVE: "",
    GET: "",
  },
  GLOBAL_SEARCH: {
    searchUsers: `${rest}searchUsers`,
    searchDesktop: `${rest}searchDesktop`,
    searchOGA: `${rest}searchOGA`,
    searchForms: `${rest}searchForms`,
    searchAssessments: `${rest}searchAssessments`
  },
  ACCESS_TOKEN:{
    TOKEN_URL: "realms/sunbird-rc/protocol/openid-connect/token"
  }
};

export default API_URL;
