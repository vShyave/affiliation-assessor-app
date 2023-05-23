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
  manageForms: {
    convertODKtoXML: `user/convert`
  },
  manageUsers: {
    userList: `${rest}getAllUsers`
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
    ViewStatus:{
    getViewStatus: `${rest}getStatusLog`
  }
};

export default API_URL;
