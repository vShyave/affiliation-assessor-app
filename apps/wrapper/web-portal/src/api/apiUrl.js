const rest = "rest/";

const API_URL = {
  auth: {
    register: "user/registration",
  },
  groundAnalysis: {
    viewForm: `${rest}getFormData`,
    list: `${rest}getGroundInspectionAnalysis`,
    markStatus: `${rest}inProgress`
  },
  manageUsers: {
    userList: `${rest}getAllUsers`,
    specificUser: `${rest}getSpecificUser`
  },
  acceptApplication:{
    acceptApplicant: `${rest}acceptForm`
  },
  rejectApplication:{
    rejectApplicant: `${rest}rejectForm`
  },
  groundInspectionAnalysis:{
    getGroundInspectionAnalysis: `${rest}getGroundInspectionAnalysis`
  },
  UsersForSchedulingAssessment:{
    getUsersForSchedulingAssessment:"rest/getUsersForSchedulingAssessment",
    ViewStatus:{
      getViewStatus: `${rest}getStatusLog`
    }
  }
}

export default API_URL;
