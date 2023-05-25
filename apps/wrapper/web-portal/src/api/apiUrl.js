const rest = "rest/";

const API_URL = {
  auth: {
    register: "user/registration",
  },
  groundAnalysis: {
    viewForm: `${rest}getFormData`,
    list: `${rest}getGroundInspectionAnalysis`,
    markStatus: `${rest}inProgress`,
    acceptApplicant: `${rest}acceptForm`,
    rejectApplicant: `${rest}rejectForm`,
    getGroundInspectionAnalysis: `${rest}getGroundInspectionAnalysis`,
    ViewStatus:{
      getViewStatus: `${rest}getStatusLog`
    }
  
  },
  manageForms: {
    convertODKtoXML: `user/convert`
  },
  manageUsers: {
    userList: `${rest}getAllUsers`,
    specificUser: `${rest}getSpecificUser`,
  },
<<<<<<< HEAD
  acceptApplication: {
    acceptApplicant: `${rest}acceptForm`,
  },
  rejectApplication: {
    rejectApplicant: `${rest}rejectForm`,
  },
  groundInspectionAnalysis: {
    getGroundInspectionAnalysis: `${rest}getGroundInspectionAnalysis`,
  },
  UsersForSchedulingAssessment: {
    getUsersForSchedulingAssessment: "rest/getUsersForSchedulingAssessment",
    ViewStatus: {
      getViewStatus: `${rest}getStatusLog`,
    },
  },
};
=======

  desktopAnalysis:{
    getUsersForSchedulingAssessment:"rest/getUsersForSchedulingAssessment",
    scheduleAssessment: `rest/scheduleAssessment`
  }
}
>>>>>>> 82891716aae1cc80acf73eb91fb4fe14b17cafc6

export default API_URL;
