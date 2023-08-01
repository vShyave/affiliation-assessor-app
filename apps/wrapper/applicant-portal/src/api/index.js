import { APIS } from "../constants";
import customPost from "./customPost";
import axios from 'axios';

export const getFormData = async (postData) => {
    const res = await customPost.post(
        APIS.FORM.VIEW_FORM,
        postData
    );
    return res;
};

export const base64ToPdf = async (postData) => {
    const res = await axios.post(`${process.env.REACT_APP_PDF_DOWNLOAD_URL}/convert-via-puppeteer/pdfpuppeteer`, {
        url: postData,
    });
    return res;
};