import axios from 'axios';

const ENKETO_MANAGER_URL = process.env.REACT_APP_ENKETO_MANAGER_URL;

export const getPrefillXML = async (form, onFormSuccessData, prefillXML, imageUrls) => {
    try {
        const res = await axios.post(
            `${ENKETO_MANAGER_URL}prefillXML?form=${form}&onFormSuccessData=${encodeURI(
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