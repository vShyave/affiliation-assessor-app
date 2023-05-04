import axios from "axios";
import customPost from "./customPost";





export const getAssessor = async (postData) => {
    const res = await customPost.post('user/registration', postData);
    return res;
  }