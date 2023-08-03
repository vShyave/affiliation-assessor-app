import { APIS } from "../constants";
import customPost from "./customPost";
import axios from 'axios';

export const getFormData = async (postData) => {

  const res = await customPost.post(
    APIS.FORMS.VIEW_FORM,
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

export const getLocalTimeInISOFormat = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now - offset * 60 * 1000);
  return localTime.toISOString();
}

export const registerEvent = async (postData) => {
  const events = {
    events: []
  };
  events.events.push(postData);

  const res = await customPost.post(
    APIS.COMMON.REGISTER_EVENT,
    events
  );
  return res;
}