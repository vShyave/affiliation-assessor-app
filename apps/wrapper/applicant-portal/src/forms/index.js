import Cookies from "js-cookie";
import localforage from "localforage";

import { getSubmissionXML } from "./../api/formApi";

export const getCookie = (cname) => {
    try {
        let cookie = Cookies.get(cname);
        if (cookie) return JSON.parse(cookie);
    } catch (error) {
        return false;
    }
};

export const getFromLocalForage = async (key) => {
    const user = getCookie("userData");
    try {
      return await localforage.getItem(user.user.id + "_" + key);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getSpecificDataFromForage = async (key) => {
    return await localforage.getItem(key);
};

export const removeItemFromLocalForage = (key) => {
    localforage.removeItem(key);
};

export const setToLocalForage = async (key, value) => {
    const storedData = await getSpecificDataFromForage(key);
    if (storedData) {
        const newData = { ...storedData, ...value };
        await localforage.setItem(key, newData);
    } else {
        await localforage.setItem(key, value);
    }
};

export const updateFormData = async (startingForm) => {
    try {
        let data = await getFromLocalForage(
            startingForm + `${new Date().toISOString().split("T")[0]}`
        );
        let prefilledForm = await getSubmissionXML(
            startingForm,
            data.formData,
            data.imageUrls
        );
        return prefilledForm;
    } catch (err) {}
};
