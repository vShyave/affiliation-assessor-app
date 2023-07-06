import { APIS } from "../constants";
import  axiosService  from "./axiosService";

const addInstitute  =  (instituteDetails) => {
    return axiosService.post(APIS.APPLICANT.ADD_INSTITUTE, instituteDetails);
}

const addInstitutePoc  = (institutePocDetails) => {
    return axiosService.post(APIS.APPLICANT.ADD_INSTITUTE_POC, institutePocDetails);

}

const getApplicantDetails = (applicantDetails) => {
    return axiosService.post(APIS.APPLICANT.GET_APPLICANT_DETAILS, applicantDetails);
  }
 

export const applicantService = {   
  addInstitute,
  addInstitutePoc,
  getApplicantDetails
};