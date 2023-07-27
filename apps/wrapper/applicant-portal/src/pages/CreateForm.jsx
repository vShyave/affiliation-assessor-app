import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import XMLParser from "react-xml-parser";

import {
  getCookie,
  getFromLocalForage,
  setToLocalForage,
  updateFormData,
  getSpecificDataFromForage,
  removeItemFromLocalForage,
} from "./../forms";

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
console.log("ENKETO_URL - ", ENKETO_URL);

const CreateForm = () => {
  let { formName, formId } = useParams();
  // const formId = 59;
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
  // const { user } = getCookie("userData") || {
  //   id: "427d473d-d8ea-4bb3-b317-f230f1c9b2f7",
  // };
  const user = {
    id: "427d473d-d8ea-4bb3-b317-f230f1c9b2f7",
  };
  const instituteDetails = getCookie("institutes");

  // const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
  const formSpec = {
    skipOnSuccessMessage: true,
    prefill: {},
    submissionURL: "",
    name: formName,
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
    start: formName,
  };

  const startingForm = formSpec.start;
  const [encodedFormSpec, setEncodedFormSpec] = useState(
    encodeURI(JSON.stringify(formSpec.formId))
  );

  const fetchFormData = async () => {
    let formData = {};
    if (formId) {
      const postData = { form_id: formId };
      const res = await getFormData(postData);
      formData = res.data.form_submissions[0];
    }

    let fileGCPPath =
      "https://storage.googleapis.com/dev-public-upsmf/affiliation/" +
      formName +
      ".xml";

    let formURI = await getPrefillXML(
      `${formData?.form_name || fileGCPPath}`,
      formSpec.onSuccess
      // formData?.form_data,
      // formData?.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const afterFormSubmit = async (e) => {
    //    console.log("e - ", e);

    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        const updatedFormData = await updateFormData(formSpec.start);
        const storedData = await getSpecificDataFromForage("required_data");
        console.log("updatedFormData - ", updatedFormData);

        saveFormSubmission({
          schedule_id: null,
          form_data: updatedFormData,
          assessment_type: "applicant",
          form_name: formName,
          submission_status: true,
          assessor_id: null,
          applicant_id: instituteDetails?.[0]?.id || 11,
        });

        // Delete the data from the Local Forage
        const key = `${storedData?.assessor_user_id}_${formSpec.start}${
          new Date().toISOString().split("T")[0]
        }`;
        removeItemFromLocalForage(key);
      }

      if (nextForm?.type === "form") {
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
      } else if (nextForm?.type === "url") {
        window.location.href = nextForm.url;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormEvents = async (startingForm, afterFormSubmit, e) => {
    if (
      ENKETO_URL === e.origin + "/enketo" &&
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
          `${user.id}_${startingForm}_${
            new Date().toISOString().split("T")[0]
          }`,
          {
            formData: JSON.parse(e.data).formData,
            imageUrls: { ...prevData?.imageUrls, ...images },
          }
        );
      }
    }
    afterFormSubmit(e);
  };

  const handleEventTrigger = async (e) => {
    handleFormEvents(startingForm, afterFormSubmit, e);
  };

  const bindEventListener = () => {
    window.addEventListener("message", handleEventTrigger);
  };

  useEffect(() => {
    fetchFormData();
    bindEventListener();
    // return () => {
    //   detachEventBinding();
    //   setData(null);
    //   setPrefilledFormData(null);
    // };
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
        {console.log(
          `${ENKETO_URL}/preview?formSpec=${encodeURI(
            JSON.stringify(formSpec)
          )}&xform=${encodedFormURI}&userId=${user.id}`
        )}
        <Card moreClass="shadow-md">
          <iframe
            title="form"
            src={`${ENKETO_URL}/preview?formSpec=${encodeURI(
              JSON.stringify(formSpec)
            )}&xform=${encodedFormURI}&userId=${user.id}`}
            style={{ minHeight: "100vh", width: "100%" }}
          />
        </Card>
        {/* <div className="bg-white min-h-[40vh]"></div> */}
      </div>
    </div>
  );
};

export default CreateForm;
