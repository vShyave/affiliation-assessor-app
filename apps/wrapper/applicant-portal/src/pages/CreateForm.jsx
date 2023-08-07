import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser";

import {
  FaAngleRight,
  FaArrowLeft,
  FaEye,
  FaFileDownload,
} from "react-icons/fa";

import {
  getCookie,
  getFromLocalForage,
  setToLocalForage,
  updateFormData,
  getSpecificDataFromForage,
  removeItemFromLocalForage,
} from "./../forms";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";
import { Button, Card } from "../components";
import CommonModal from "../Modal";
import Toast from "../components/Toast";

import { getFormData, base64ToPdf, getLocalTimeInISOFormat } from "../api";
import {
  getPrefillXML,
  saveFormSubmission,
  getSubmissionXML,
  getFormURI,
  updateFormSubmission,
} from "../api/formApi";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;

const CreateForm = (props) => {
  let { formName, formId, applicantStatus } = useParams();
  const [encodedFormURI, setEncodedFormURI] = useState("");
  const scheduleId = useRef();
  const navigate = useNavigate();
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [formDataNoc, setFormDataNoc] = useState({});
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [isDownloading, setIsDownloading] = useState(false);

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
  const [onSubmit, setOnSubmit] = useState(false);

  const { userRepresentation } = getCookie("userData");
  const userId = userRepresentation?.id;
  const instituteDetails = getCookie("institutes");

  let formData = {};

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
    formId: formId,
  };

  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  const startingForm = formSpec.start;
  const [encodedFormSpec, setEncodedFormSpec] = useState(
    encodeURI(JSON.stringify(formSpec?.formId))
  );

  const fetchFormData = async () => {
    let formData = {};

    console.log(
      "key - ",
      `${userId}_${formName}_${new Date().toISOString().split("T")[0]}`
    );
    let data = await getFromLocalForage(
      `${userId}_${formName}_${new Date().toISOString().split("T")[0]}`
    );

    console.log("data - ", data);

    if (data) {
      formData = data;
    } else {
      if (formId) {
        const postData = { form_id: formId };
        const res = await getFormData(postData);
        formData = res.data.form_submissions[0];
        console.log("formData - ", formData);
        setFormDataNoc(formData);
      }
    }

    console.log("formData - ", formData);

    let fileGCPPath =
      process.env.REACT_APP_GCP_AFFILIATION_LINK + formName + ".xml";

    let formURI = await getPrefillXML(
      `${fileGCPPath}`,
      formSpec.onSuccess,
      formData?.formData || formData?.form_data,
      formData?.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const afterFormSubmit = async (e) => {
    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        setOnSubmit(true);
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

  const handleSubmit = async () => {
    const updatedFormData = await updateFormData(formSpec.start, userId);
    const storedData = await getSpecificDataFromForage("required_data");

    if (applicantStatus === "returned") {
      const res = await updateFormSubmission({
        form_id: formId,
        form_data: updatedFormData,
        assessment_type: "applicant",
        form_name: formName,
        submission_status: true,
        updated_at: getLocalTimeInISOFormat(),
        form_status: "Resubmitted",
      });
    } else {
      await saveFormSubmission({
        schedule_id: null,
        form_data: updatedFormData,
        assessment_type: "applicant",
        form_name: formName,
        submission_status: true,
        assessor_id: null,
        applicant_id: instituteDetails?.[0]?.id,
        submitted_on: new Date().toJSON().slice(0, 10),
        form_status: "Application Submitted",
      });
    }

    // Delete the data from the Local Forage
    const key = `${storedData?.assessor_user_id}_${formSpec.start}_${
      new Date().toISOString().split("T")[0]
    }`;

    removeItemFromLocalForage(key);

    setOnSubmit(false);
    setToast((prevState) => ({
      ...prevState,
      toastOpen: true,
      toastMsg: "Form Submitted Successfully!.",
      toastType: "success",
    }));

    setTimeout(
      () =>
        setToast((prevState) => ({
          ...prevState,
          toastOpen: false,
          toastMsg: "",
          toastType: "",
        })),
      1500
    );

    setTimeout(
      () => navigate(`${APPLICANT_ROUTE_MAP.dashboardModule.my_applications}`),
      1500
    );
  };

  const handleDownloadNocOrCertificate = () => {
    if (formDataNoc.round == 1) {
      window.open(formDataNoc?.noc_Path, "_blank");
    } else {
      window.open(formDataNoc?.certificate_Path, "_blank");
    }
  };

  const handleFormEvents = async (startingForm, afterFormSubmit, e) => {
    if (typeof e.data === "string" && e.data.includes("webpackHot")) {
      return;
    }

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
          `${userId}_${startingForm}_${new Date().toISOString().split("T")[0]}`
        );
        await setToLocalForage(
          `${userId}_${startingForm}_${new Date().toISOString().split("T")[0]}`,
          {
            formData: JSON.parse(e.data).formData,
            // imageUrls: { ...prevData?.imageUrls, ...images },
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

  const handleFormDownload = async () => {
    try {
      setIsDownloading(true);
      const formUrl = `${ENKETO_URL}/preview?formSpec=${encodeURI(
        JSON.stringify(formSpec)
      )}&xform=${encodedFormURI}&userId=${userId}`;
      const res = await base64ToPdf(formUrl);

      const linkSource = `data:application/pdf;base64,${res.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "enketo_form.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.target = window.safari ? "" : "_blank";
      downloadLink.click();
      setIsDownloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePrintPdf = () => {
  //   const URL = `${ENKETO_URL}/preview?formSpec=${encodeURI(
  //     JSON.stringify(formSpec)
  //   )}&xform=${encodedFormURI}&userId=${userId}`;

  //   var strWindowFeatures =
  //     "fullscreen=1, channelmode=1, status=1, resizable=1";
  //   var win = window.open(URL, "_blank", strWindowFeatures);
  // };

  useEffect(() => {
    fetchFormData();
    bindEventListener();
  }, []);

  return (
    <div>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
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
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-[20px]">
            {formName.split("-")?.join(" ")}
          </h1>
          <div className="flex flex-grow gap-3 justify-end">
            <button
              onClick={handleGoBack}
              className="bg-gray-100 py-2 mb-8 font-medium rounded-[4px] px-2 text-blue-900 border border-gray-500 flex flex-row items-center gap-3"
            >
              Back to my application
            </button>

            <button
              onClick={handleDownloadNocOrCertificate}
              // disabled={formData.form_status !== "Approved"}
              className={`${
                (formData.form_status == "Approved")
                  ? "cursor-not-allowed border border-gray-500 bg-white text-gray-200 px-8 h-[44px]"
                  : "border border-blue-900 bg-blue-900 text-white rounded-[4px] px-2 h-[44px] text-white"
              }`}
              // className="bg-primary-900 py-2 mb-8 font-medium rounded-[4px] px-2 text-white flex flex-row items-center gap-3"
            >
              Download NOC/Certificate
            </button>
          </div>
        </div>
        <Card moreClass="shadow-md">
          <div className="flex flex-col gap-5">
            <div className="flex flex-grow gap-3 justify-end">
              <button className="bg-primary-900 py-3 font-medium rounded-[4px] px-6 text-white flex flex-row items-center gap-3">
                <FaEye />
                <span>Preview</span>
              </button>

              <button
                className={`bg-primary-900 py-3 font-medium rounded-[4px] px-6 text-white flex flex-row items-center gap-3 ${
                  isDownloading ? "cursor-not-allowed" : ""
                }  `}
                onClick={handleFormDownload}
                disabled={isDownloading}
              >
                <FaFileDownload />
                <span>{isDownloading ? "Downloading..." : "Download"}</span>
              </button>
            </div>
            <div className="flex">
              <iframe
                title="form"
                src={`${ENKETO_URL}/preview?formSpec=${encodeURI(
                  JSON.stringify(formSpec)
                )}&xform=${encodedFormURI}&userId=${userId}`}
                style={{ minHeight: "100vh", width: "100%" }}
              />
            </div>
          </div>
        </Card>

        {onSubmit && (
          <CommonModal>
            <p className="text-secondary text-2xl text-semibold font-medium text-center">
              Once form is submitted, it cannot be modified! Are you sure, do
              you want to submit?
            </p>

            <div className="flex flex-row justify-center w-full py-4 gap-5">
              <div
                className="border border-primary bg-primary py-3 px-8 rounded-[4px] cursor-pointer items-center"
                onClick={() => setOnSubmit(false)}
              >
                No
              </div>
              <div
                className="bg-primary-900 py-3 rounded-[4px] px-8 text-white items-center gap-3 border border-primary py-3 px-7 cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Yes! Submit
              </div>
            </div>
          </CommonModal>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
