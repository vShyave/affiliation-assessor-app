const API_URL = {
  auth: {
    register: "user/registration",
  },
  groundAnalysis: {
    viewForm: "rest/getFormData",
    list: "rest/getGroundInspectionAnalysis",
    markStatus: "rest/inProgress"
  },
  manageUsers: {

  },
  acceptApplication:{
    acceptApplicant: "rest/acceptForm"
  },
  rejectApplication:{
    rejectApplicant: "rest/rejectForm"
  },
  groundInspectionAnalysis:{
    getGroundInspectionAnalysis: "rest/getGroundInspectionAnalysis"
  },
    ViewStatus:{
    getViewStatus: "rest/getStatusLog"
  }
};

export default API_URL;
