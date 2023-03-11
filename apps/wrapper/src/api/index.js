const GITPOD_URL = process.env.REACT_APP_GITPOD_WORKSPACE_URL

const makeHasuraCalls = async (query) => {
    // const userData = getCookie("userData");
    return fetch(`${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "8080-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}`, {
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