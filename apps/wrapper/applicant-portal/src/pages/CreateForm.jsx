import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import XMLParser from "react-xml-parser";
import Cookies from "js-cookie";
import localforage from "localforage";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";
import { Card } from "../components";

import { getFormData } from "../api";
import {
  getPrefillXML,
  saveFormSubmission,
  getSubmissionXML,
  getFormURI,
} from "../api/formApi";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;
// const ENKETO_URL = "https://enketo.upsmfac.org";

const CreateForm = () => {
  let { formName, formId } = useParams();
  const [encodedFormURI, setEncodedFormURI] = useState("");
  const scheduleId = useRef();
  const navigate = useNavigate();
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [assData, setData] = useState({
    district: "",
    instituteName: "",
    nursing: "",
    paramedical: "",
    type: "",
    latitude: null,
    longitude: null,
  });
  const [prefilledFormData, setPrefilledFormData] = useState();

  const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
  const formSpec = {
    forms: {
      [formName]: {
        skipOnSuccessMessage: true,
        prefill: {},
        submissionURL: "",
        name: "bsc_nursing",
        successCheck: "async (formData) => { return true; }",
        onSuccess: {
          notificationMessage: "Form submitted successfully",
          sideEffect: "async (formData) => { console.log(formData); }",
        },
        onFailure: {
          message: "Form submission failed",
          sideEffect: "async (formData) => { console.log(formData); }",
          next: {
            type: "url",
            id: "google",
          },
        },
      },
    },
    start: formName,
  };

  // const formSpec = {
  //   skipOnSuccessMessage: true,
  //   prefill: {},
  //   submissionURL: "",
  //   name: "bsc_nursing",
  //   successCheck: "async (formData) => { return true; }",
  //   onSuccess: {
  //     notificationMessage: "Form submitted successfully",
  //     sideEffect: "async (formData) => { console.log(formData); }",
  //   },
  //   onFailure: {
  //     message: "Form submission failed",
  //     sideEffect: "async (formData) => { console.log(formData); }",
  //     next: {
  //       type: "url",
  //       id: "google",
  //     },
  //   },
  //   start: formName,
  // };

  const [encodedFormSpec, setEncodedFormSpec] = useState(
    encodeURI(JSON.stringify(formSpec.forms[formId]))
  );

  const startingForm = formSpec.start;
  // const [formId, setFormId] = useState(startingForm);

  const removeItemFromLocalForage = (key) => {
    localforage.removeItem(key);
  };

  const fetchFormData = async () => {
    const postData = { form_id: formId || 14 };
    const res = await getFormData(postData);
    const formData = res.data.form_submissions[0];
    console.log("formData - ", formData);
    let formURI = await getPrefillXML(
      `${formData?.form_name}`,
      "",
      formData.form_data,
      formData.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const updateFormData = async (startingForm) => {
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

  const afterFormSubmit = async (e) => {
    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    console.log("data - ", data);

    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        const updatedFormData = await updateFormData(formSpec.start);
        console.log("updatedFormData - ", updatedFormData);
        const storedData = await getSpecificDataFromForage("required_data");

        saveFormSubmission({
          schedule_id: scheduleId.current,
          form_data: updatedFormData,
          assessment_type: formName.startsWith("hospital")
            ? "hospital"
            : "institute",
          form_name: formSpec.start,
          submission_status: true,
          assessor_id: storedData?.assessor_user_id,
          applicant_id: storedData?.institute_id,
          submitted_on: new Date().toJSON().slice(0, 10),
        });

        // Delete the data from the Local Forage
        const key = `${storedData?.assessor_user_id}_${formSpec.start}${
          new Date().toISOString().split("T")[0]
        }`;
        console.log("key - ", key);
        removeItemFromLocalForage(key);
      }

      if (nextForm?.type === "form") {
        // setFormId(nextForm.id);
        setOnFormSuccessData(onSuccessData);
        setOnFormFailureData(onFailureData);
        setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
        setEncodedFormURI(
          getFormURI(
            nextForm.id,
            onSuccessData,
            formSpec.forms[nextForm.id].prefill
          )
        );
        // navigate(
        //   formName.startsWith("hospital")
        //     ? ROUTE_MAP.hospital_forms
        //     : ROUTE_MAP.medical_assessment_options
        // );
      } else if (nextForm?.type === "url") {
        window.location.href = nextForm.url;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEventTrigger = async (e) => {
    console.log("e - ", e);
    handleFormEvents(startingForm, afterFormSubmit, e);
  };

  const bindEventListener = () => {
    window.addEventListener("message", handleEventTrigger);
  };

  const detachEventBinding = () => {
    window.removeEventListener("message", handleEventTrigger);
  };

  const handleFormEvents = async (startingForm, afterFormSubmit, e) => {
    const user = getCookie("userData");
    console.log("ENKETO_URL - ", ENKETO_URL);
    if (
      e.origin === ENKETO_URL &&
      typeof e?.data === "string" &&
      JSON.parse(e?.data)?.state !== "ON_FORM_SUCCESS_COMPLETED"
    ) {
      var formData = new XMLParser().parseFromString(
        JSON.parse(e.data).formData
      );
      if (formData) {
        let images = JSON.parse(e.data).fileURLs;
        let prevData = await getFromLocalForage(
          startingForm + `${new Date().toISOString().split("T")[0]}`
        );
        await setToLocalForage(
          user.user.id +
            "_" +
            startingForm +
            `${new Date().toISOString().split("T")[0]}`,
          {
            formData: JSON.parse(e.data).formData,
            imageUrls: { ...prevData?.imageUrls, ...images },
          }
        );
      }
    }
    afterFormSubmit(e);
  };

  const getFromLocalForage = async (key) => {
    const user = getCookie("userData");
    try {
      return await localforage.getItem(user.user.id + "_" + key);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const setToLocalForage = async (key, value) => {
    const storedData = await getSpecificDataFromForage(key);
    if (storedData) {
      const newData = { ...storedData, ...value };
      await localforage.setItem(key, newData);
    } else {
      await localforage.setItem(key, value);
    }
  };

  const getSpecificDataFromForage = async (key) => {
    return await localforage.getItem(key);
  };

  const getCookie = (cname) => {
    try {
      let cookie = Cookies.get(cname);
      if (cookie) return JSON.parse(cookie);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchFormData();
    bindEventListener();
    return () => {
      detachEventBinding();
      setData(null);
      setPrefilledFormData(null);
    };
  }, []);

  return (
    <div>
      <div className="h-[48px] bg-white drop-shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}>
              <span className="text-primary-400 cursor-pointer">
                My Application
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Create form</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-3 min-h-[40vh]">
        <Card moreClass="shadow-md">
          <iframe
            title="form"
            src={`${ENKETO_URL}/preview?formSpec=${encodeURI(
              JSON.stringify(formSpec)
            )}&xform=${encodedFormURI}&userId=${userId}`}
            style={{ minHeight: "100vh", width: "100%" }}
          />
        </Card>
        {/* <div className="bg-white min-h-[40vh]"></div> */}
      </div>
    </div>
  );
};

export default CreateForm;
