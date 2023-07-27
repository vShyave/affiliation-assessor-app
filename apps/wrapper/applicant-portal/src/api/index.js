import { APIS } from "../constants";
import customPost from "./customPost";

export const getFormData = async (postData) => {
    const res = await customPost.post(
        APIS.FORM.VIEW_FORM,
        postData
    );
    return res;
};