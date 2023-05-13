const API_URL = {
  auth: {
    register: "user/registration",
  },
  groundAnalysis: {
    viewForm: "rest/getFormData",
    list: "rest/getGroundInspectionAnalysis",
  },
  manageUsers: {

  },
  acceptApplication:{
    acceptApplicant: "rest/acceptApplicant"
  },
  rejectApplication:{
    rejectApplicant: "rest/rejectApplicant"
  },
  groundInspectionAnalysis:{
    getGroundInspectionAnalysis: "rest/getGroundInspectionAnalysis"
  }
};

export default API_URL;
