const rest = "rest/";

const API_URL = {
  auth: {
    register: `${rest}createAdmin`,
    getRegulator: `${rest}getRegulator`,
  },
  common: {
    registerEvent: `${rest}addEvents`,
    updateForm: `${rest}updateForm`
  },
  notifications:{
    insertNotifications: `${rest}insertNotifications`,
    getNotifications: `${rest}getNotifications`,
    readNotification: `${rest}readNotification`,
    viewNotification: `${rest}viewNotification`
  },
  groundAnalysis: {
    viewForm: `${rest}getFormData`,
    list: `${rest}getGroundInspectionAnalysis`,
    markStatus: `${rest}inProgress`,
    acceptApplicantNoc: `${rest}acceptFormR1`,
    acceptApplicantCertificate: `${rest}acceptFormR2`,

    rejectApplicant: `${rest}rejectForm`,
    getGroundInspectionAnalysis: `${rest}getGroundInspectionAnalysis`,
    filterOGA: `${rest}filterOGA`,
  },
  manageForms: {
    getForms: `${rest}getForms`,
    convertODKtoXML: `user/convert`,
    nocPdfUpload: `user/upload`,
    createForm: `${rest}createForm`,
    publishForms: `${rest}publishForms`,
    unpublishForms: `${rest}unpublishForms`,
    viewForm: `${rest}viewForm`,
    duplicateForm: `${rest}duplicateForm`,
    deleteForm: `${rest}deleteForm`,
    filterForms: `${rest}filterForms`,
    createCourses: `${rest}createCourse`,
    updateForms: `${rest}updateForms`,
  },
  manageUsers: {
    userList: `${rest}getAllUsers`,
    specificUser: `${rest}getSpecificUser`,
    filterUsers: `${rest}filterUsers`,
    setActivate: `${rest}setValid`,
    setDeactive: `${rest}setInvalid`,
    addUsers: `${rest}addUsers`,
    deleteUser: `${rest}deleteUser`,
    editUser: `${rest}editUser`,
  },

  desktopAnalysis: {
    getUsersForSchedulingAssessment: `${rest}getUsersForSchedulingAssessment`,
    scheduleAssessment: `${rest}addAssessmentSchedule`,
    getDesktopAnalysisForms: `${rest}getDesktopAnalysis`,
    getCourseOGA : `${rest}getCoursesOGA`,
    filterDesktopAnalysis: `${rest}filterDesktopAnalysis`,
    updateFormSubmission: `${rest}updateFormSubmission`,
  },
  scheduleManagement: {
    getAssessmentSchedule: `${rest}getAssessmentSchedule`,
    filterAssessments: `${rest}filterAssessments`,
    addAssessmentSchedule: `${rest}addAssessmentSchedule`,
    deleteSchedule: `${rest}deleteSchedule`,
  },
  viewStatus: {
    getViewStatus: `${rest}getEvents`,
  },
  SIGNUP: {
    CREATE_BULK_USER: "keycloak/createBulkUser",
    CREATE_USER: "keycloak/user/create",
    EDIT_USER: "keycloak/user/update",
  },
  LOGIN: {
    GENERATE_OTP: "user/generateOtp",
    USERLOGIN: "user/login",
  },
  DELETE: {
    DELETE_USER: "keycloak/user/delete",
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
    searchAssessments: `${rest}searchAssessments`,
  },
  ACCESS_TOKEN: {
    TOKEN_URL: "realms/sunbird-rc/protocol/openid-connect/token",
  },
};

export default API_URL;
