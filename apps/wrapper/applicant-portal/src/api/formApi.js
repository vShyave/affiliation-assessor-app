import axios from 'axios';

const ENKETO_MANAGER_URL = process.env.REACT_APP_ENKETO_MANAGER_URL;
const HASURA_CLIENT_NAME = process.env.HASURA_CLIENT_NAME || 'hasura-console';
const X_HASURA_ADMIN_SECRET_KEY = process.env.X_HASURA_ADMIN_SECRET_KEY || 'myadminsecretkey';

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

export const makeHasuraCalls = async (query) => {
    // const userData = getCookie("userData");
    return fetch(process.env.REACT_APP_HASURA_URL, {
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
    const jsonResponse = {
        ...apiRes,
        responseStatus: false,
    };
    return jsonResponse;
};

export const getSubmissionXML = async (form, prefillXML, imageUrls) => {
    console.log("form - ", form);
    let new_form =
      "https://storage.googleapis.com/dev-public-upsmf/affiliation/" +
      form +
      ".xml";
    console.log("prefillXML - ", prefillXML);
    console.log("imageUrls - ", imageUrls);
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