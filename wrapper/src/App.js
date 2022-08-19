import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

import formSpec from "./forms.json";

const oldSpecToNew = (oldFormSpec) => {
  const newFormSpec = {};
  newFormSpec.forms = [];
  oldFormSpec.forEach((form) => {
    newFormSpec.forms.push({
      name: form.name,
      submissionURL: form.submissionURL,
      nextFormOnSuccess: form.nextFormOnSuccess,
      nextFormOnFailure: form.nextFormOnFailure,
      messageOnSuccess: form.messageOnSuccess,
      messageOnFailure: form.messageOnFailure,
      onFormSuccessExecute: form.onFormSuccessExecute,
      onFormFailureExecute: form.onFormFailureExecute,
      isSuccessExecute: form.isSuccessExecute,
      isFailureExecute: form.isFailureExecute,
    });
  });
  return newFormSpec;
}


function App() {

  const getForm = (form, onFormSuccessData, prefillSpec) => {
    console.error({form, onFormSuccessData, prefillSpec});
    return encodeURIComponent(`http://192.168.0.108:3002/prefill?form=${form}&onFormSuccessData=${encodeURI(JSON.stringify(onFormSuccessData))}&prefillSpec=${encodeURI(JSON.stringify(prefillSpec))}`);
  }

  const startingForm = formSpec.startingForm;
  const [form, setForm] = useState(startingForm);
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);

  useEffect(() => {
    window.addEventListener('message', function (e) {
      const data = e.data;
      try {
        /* message = {
          nextForm: "formID",
          formData: {},
        }
        */
        const {nextForm, formData, onFormSuccessData, onFormFailureData} = JSON.parse(data);
        console.log({nextForm, formData, onFormSuccessData, onFormFailureData});
        if(nextForm.type === 'form') {
          setForm(nextForm.id);
          setOnFormSuccessData(onFormSuccessData);
        }else {
          window.location.href = nextForm.url;
        }
      }
      catch (e) {
        // console.log(e)
      }
    });
  }, []);


  return (
    <div className="App">
        <iframe style={{height: "100vh", width: "100vw"}} 
          src={
            `http://localhost:8005/preview?formSpec=${encodeURI(JSON.stringify(formSpec.forms[form]))}&xform=${getForm(form, onFormSuccessData, formSpec.forms[form].prefill)}`
          }
        />

    </div>
  );
}

export default App;
