import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const GITPOD_URL = process.env.GITPOD_WORKSPACE_URL

const GenericForm = (props) => {
  const { selectedFlow } = props;
  const formSpec = require(`../../${selectedFlow.config}`);
  const [isFirst, setIsFirst] = useState(true);
  // Encode string method to URI
  const encodeFunction = (func) => {
    return encodeURIComponent(JSON.stringify(func));
  }

  const getFormURI = (form, ofsd, prefillSpec) => {
    console.log(form, ofsd, prefillSpec);
    return encodeURIComponent(`${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "3006-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}/prefill?form=${form}&onFormSuccessData=${encodeFunction(ofsd)}&prefillSpec=${encodeFunction(prefillSpec)}`);
  }

  const startingForm = formSpec.startingForm;
  const [formId, setFormId] = useState(startingForm);
  const [encodedFormSpec, setEncodedFormSpec] = useState(encodeURI(JSON.stringify(formSpec.forms[formId])));
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [encodedFormURI, setEncodedFormURI] = useState(getFormURI(formId, formSpec.forms[formId].onFormSuccess, formSpec.forms[formId].prefill));

  useEffect(() => {
    // Manage onNext
    window.addEventListener('message', function (e) {
      const data = e.data;

      try {
        /* message = {
          nextForm: "formID",
          formData: {},
        }
        */
        const { nextForm, formData, onSuccessData, onFailureData } = JSON.parse(data);
        console.log({ nextForm, formData, onSuccessData, onFailureData });
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
        // console.log(e)
      }
    });
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Go back</div>
        <div>{selectedFlow.name}</div>
      </div>
      <iframe title='current-form'
        className={styles.odkForm}
        src={
          `${GITPOD_URL.slice(0, GITPOD_URL.indexOf('/') + 2) + "8065-" + GITPOD_URL.slice(GITPOD_URL.indexOf('/') + 2)}/preview?formSpec=${encodedFormSpec}&xform=${encodedFormURI}`
        }
      />
    </div>
  );
}

export default GenericForm;
