// import customPost from "./customPost";
import API_URL from "./apiUrl";

export const registerUser = async (postData) => {
    const res = await fetch.post(API_URL.auth.register, postData);
    return res;
}


// export const getAssessorDetails = async (postData) => {
//     const res = await customPost.post(API_URL.auth.register, postData);
//     return res;
// }