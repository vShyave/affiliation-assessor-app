import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import beautify from "xml-beautifier";
import { saveFormSubmission } from '../../api';

const GITPOD_URL = process.env.REACT_APP_GITPOD_WORKSPACE_URL

const GenericForm = (props) => {
  const { selectedFlow, setSelectedFlow } = props;
  const formSpec = require(`../../${selectedFlow.config}`);
  const [formData, setFormData] = useState("");
  const [formDataJson, setFormDataJSON] = useState("");
  const [isXml, setIsXml] = useState(false);

  // Encode string method to URI
  const encodeFunction = (func) => {
    return encodeURIComponent(JSON.stringify(func));
  }

  const getFormURI = (form, ofsd, prefillSpec) => {
    // console.log(form, ofsd, prefillSpec);
    // return encodeURIComponent(`https://3006-samagradevelop-workflow-gkbrz650idv.ws-us89b.gitpod.io/prefill?form=${form}&onFormSuccessData=${encodeFunction(ofsd)}&prefillSpec=${encodeFunction(prefillSpec)}`);
    return encodeURIComponent(`${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "3006-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}/prefill?form=${form}&onFormSuccessData=${encodeFunction(ofsd)}&prefillSpec=${encodeFunction(prefillSpec)}`);
  }

  const startingForm = formSpec.startingForm;
  const [formId, setFormId] = useState(startingForm);
  const [encodedFormSpec, setEncodedFormSpec] = useState(encodeURI(JSON.stringify(formSpec.forms[formId])));
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [encodedFormURI, setEncodedFormURI] = useState(getFormURI(formId, formSpec.forms[formId].onFormSuccess, formSpec.forms[formId].prefill));
  const formSubmitted = useRef(false);

  useEffect(() => {
    // Manage onNext
    window.addEventListener('message', async function (e) {
      const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      try {
        const { nextForm, formData, onSuccessData, onFailureData } = data;
        // console.log("data--->", data)

        if (data?.state != "ON_FORM_SUCCESS_COMPLETED" && formData) {
          setFormData(beautify(formData))
          let jsonRes = await parseFormData(formData);
          if (jsonRes) setFormDataJSON(JSON.stringify(jsonRes, null, 2));
        }

        if (data?.state == "ON_FORM_SUCCESS_COMPLETED" && selectedFlow.submitToHasura && !formSubmitted.current) {
          formSubmitted.current = true;
          await saveFormSubmission({
            form_data: formData,
            form_name: formSpec.startingForm,
          });
          formSubmitted.current = false;
        }
        if (nextForm.type === 'form') {
          setFormId(nextForm.id);
          setOnFormSuccessData(onSuccessData);
          setOnFormFailureData(onFailureData);
          setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
          setEncodedFormURI(getFormURI(nextForm.id, onSuccessData, formSpec.forms[nextForm.id].prefill));
        } else {
          window.location.href = nextForm.url;
        }

      }
      catch (e) {
        console.log(e)
      }
    });
  }, []);

  const handleFormView = async (e) => {
    setIsXml(e)
    if (e) {
      let jsonRes = await parseFormData(formData);
      if (jsonRes) setFormDataJSON(JSON.stringify(jsonRes, null, 2));
    }
  }

  const parseFormData = async (formData) => {
    let jsonRes = await fetch(`${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "3006-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}/parse`, {
      method: 'POST',
      body: JSON.stringify({
        xml: formData,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
    jsonRes = await jsonRes.json();
    return jsonRes?.data;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => setSelectedFlow({})}>Go Back</div>
        <div>Workflow /{selectedFlow.name}</div>
      </div>
      <div className={styles.formContainer}>
        <iframe title='current-form'
          className={styles.odkForm}
          src={
            `${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "8065-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}/preview?formSpec=${encodedFormSpec}&xform=${encodedFormURI}`
          }
        />
        <div className={styles.jsonResponse}>
          <div className={styles.toggleBtn}>
            <label class={styles.switch}>
              <input type="checkbox" value={isXml} onChange={e => handleFormView(e.target.checked)} />
              <span class={styles.slider}></span>
            </label>
            {isXml ? <span className='animate__animated animate__fadeIn'>XML</span> : <span className='animate__animated animate__fadeIn'>JSON</span>}
          </div>
          <textarea value={!isXml ? formData : formDataJson} className={styles.formText}>
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default GenericForm;
