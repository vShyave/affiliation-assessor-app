import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
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

  const { userRepresentation } = getCookie("userData");
  const userId = userRepresentation?.id;
  const instituteDetails = getCookie("institutes");

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
      process.env.REACT_APP_GCP_AFFILIATION_LINK + formName + ".xml";

    let formURI = await getPrefillXML(
      `${fileGCPPath}`,
      formSpec.onSuccess,
      formData?.form_data,
      formData?.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const afterFormSubmit = async (e) => {
    if (typeof e.data !== "object") {
      return;
    }

    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        const updatedFormData = await updateFormData(formSpec.start);
        const storedData = await getSpecificDataFromForage("required_data");

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
        const key = `${storedData?.assessor_user_id}_${formSpec.start}_${
          new Date().toISOString().split("T")[0]
        }`;
        console.log("key - ", key);
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
          `${userId}_${startingForm}_${new Date().toISOString().split("T")[0]}`,
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

  const handleGoBack = () => {
    navigate(-1);
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
            <Link>
              <span
                onClick={handleGoBack}
                className="text-primary-400 flex flex-row gap-2"
              >
                <div className="flex items-center">
                  <FaArrowLeft className="text-[16px]" />
                </div>
                Back
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
