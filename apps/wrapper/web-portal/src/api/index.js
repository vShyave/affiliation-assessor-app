import API_URL from "./apiUrl";
import adminCustomPost from "./adminCustomApi";

export const registerUser = async (postData) => {
    const res = await fetch.post(API_URL.auth.register, postData);
    return res;
}

export const getFormData = async (postData) => {
    const res = await adminCustomPost.post(API_URL.groundAnalysis.viewForm, postData);
    return res;
}