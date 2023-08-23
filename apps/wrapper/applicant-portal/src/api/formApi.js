import axios from 'axios';
import { registerEvent, getLocalTimeInISOFormat } from './index';
import customPost from "./customPost";
import { APIS } from '../constants';

const ENKETO_MANAGER_URL = process.env.REACT_APP_ENKETO_MANAGER_URL;
const HASURA_CLIENT_NAME = process.env.HASURA_CLIENT_NAME || 'hasura-console';
const X_HASURA_ADMIN_SECRET_KEY = process.env.X_HASURA_ADMIN_SECRET_KEY || 'myadminsecretkey';
const HASURA_URL = process.env.REACT_APP_HASURA_URL || 'https://hasura.upsmfac.org/v1/graphql';

export const getPrefillXML = async (form, onFormSuccessData, prefillXML, imageUrls) => {
    try {
        const res = await axios.post(
            `${ENKETO_MANAGER_URL}prefillXML?formUrl=${form}&onFormSuccessData=${encodeURI(
                JSON.stringify(onFormSuccessData)
            )}`,
            {
                prefillXML,
                imageUrls
            },
            { headers: {} }
        );
        const formURI = res.data;
        return formURI;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const saveFormSubmission = (data) => {
    const query = {
        query: `mutation ($object: [form_submissions_insert_input!] = {}) {
            insert_form_submissions(objects: $object) {
                returning {
                    form_id
                    created_at
                }
            }
        }`,
        variables: { object: data },
    };
    return makeHasuraCalls(query);
};

export const updateFormSubmission = async (data) => {
    const res = await customPost.post(
        APIS.FORM.UPDATE_FORM,
        data
    );
    return res;
}

export const makeHasuraCalls = async (query) => {
    return fetch(HASURA_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Hasura-Client-Name": HASURA_CLIENT_NAME,
            "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET_KEY
            // Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(query),
    })
    .then(async (response) => await validateResponse(response))
    .catch((error) => {
        return error;
    });
};

const validateResponse = async (response) => {
    const apiRes = await response.json();

    registerEvent({
      created_date: getLocalTimeInISOFormat(),
      entity_id: apiRes?.data?.insert_form_submissions?.returning?.[0]?.form_id.toString(),
      entity_type: "form",
      event_name: "Application Submitted",
      remarks: "",
    });

    const jsonResponse = {
        ...apiRes,
        responseStatus: false,
    };
    return jsonResponse;
};

export const getSubmissionXML = async (form, prefillXML, imageUrls) => {
    let new_form = `${process.env.REACT_APP_GCP_AFFILIATION_LINK}${form}.xml`
    console.log("new_form - ", new_form);
    try {
        const res = await axios.post(
            `${ENKETO_MANAGER_URL}submissionXML?form=${new_form}`, {
                prefillXML,
                imageUrls,
            }, { headers: {} }
        );
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const encodeFunction = (func) => encodeURIComponent(JSON.stringify(func));

export const getFormURI = (form, ofsd, prefillSpec) => {
    return encodeURIComponent(
      `${ENKETO_MANAGER_URL}prefillXML?form=${form}&onFormSuccessData=${encodeFunction(
        ofsd
      )}&prefillSpec=${encodeFunction(prefillSpec)}`
    );
};
