const HASURA_URL = process.env.REACT_APP_HASURA_URL
const FORM_MANAGER_URL = process.env.REACT_APP_FORM_MANAGER_URL

const makeHasuraCalls = async (query) => {
    // const userData = getCookie("userData");
    return fetch(`${HASURA_URL}/v1/graphql`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'x-hasura-admin-secret': `myadminsecretkey`,
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

export const saveFormSubmission = (data) => {
    const query = {
        query: `mutation ($object: [form_submissions_insert_input!] = {}) {
        insert_form_submissions(objects: $object) {
          returning {
            id
            created_at
          }
        }
      }`,
        variables: { object: data },
    };
    return makeHasuraCalls(query);
};

export const getPrefillXML = async (form, onFormSuccessData, prefillXML, imageUrls) => {
    try {
        let res = await fetch(`${FORM_MANAGER_URL}/prefillXML?form=${form}&onFormSuccessData=${encodeURI(
            JSON.stringify(onFormSuccessData)
        )}`, {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ prefillXML, imageUrls })
        })
        return await res.text();
    } catch (err) {
        console.log(err);
        return null;
    }
};