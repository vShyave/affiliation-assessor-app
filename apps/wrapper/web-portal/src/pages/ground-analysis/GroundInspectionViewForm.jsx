import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";

import { Card, Button } from "./../../components";

import NocModal from "./NocModal";
import StatusLogModal from "./StatusLogModal";
import IssueNocModal from "./IssueNocModal.jsx";
import RejectNocModal from "./RejectNocModal";
import OGASidebar from "./OGASidebar";

import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import {
  getFormData,
  fetchOGAFormsList,
  getRejectApplicant,
  getAcceptApplicantNoc,
  getAcceptApplicantCertificate,
  registerEvent,
  updateFormStatus,
} from "../../api";
import { getPrefillXML } from "./../../api/formApi";
import { ContextAPI } from "../../utils/ContextAPI";
import { getCookie, getLocalTimeInISOFormat } from "../../utils";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;
const GCP_URL = process.env.REACT_APP_GCP_AFFILIATION_LINK;

export default function ApplicationPage({
  closeModal,
  closeRejectModal,
  closeStatusModal,
  closeCertificateModal,
}) {
  const reportTemplateRef = useRef(null);
  const [formStatus, setFormStatus] = useState("");
  const [formDataFromApi, setFormDataFromApi] = useState();
  const [rejectModel, setRejectModel] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openStatusModel, setOpenStatusModel] = useState(false);
  const [openIssueNocModel, setOpenIssueNocModel] = useState(false);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  let { formName, formId, instituteName, round } = useParams();
  let [instituteId, setInstituteId] = useState();
  let [selectRound, setSelectRound] = useState(round);
  let [OGAFormsList, setOGAFormsList] = useState([]);
  let [formSelected, setFormSelected] = useState();
  const { setSpinner,setToast } = useContext(ContextAPI);
  const userDetails = getCookie("userData");

  const user_details = userDetails?.userRepresentation;

  const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
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
  };

  const setIframeFormURI = async (formDataObj) => {
    const form_path = `${GCP_URL}${formDataObj?.form_name}.xml`;
    let formURI = await getPrefillXML(
      `${form_path}`,
      "",
      formDataObj?.form_data,
      formDataObj?.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  const fetchFormData = async () => {
    const postData = { form_id: formId };
    try {
      const res = await getFormData(postData);
      const formData = res.data.form_submissions[0];
      setFormDataFromApi(res.data.form_submissions[0]);
      const statusOfForm = formData?.form_status;
      setFormStatus(statusOfForm);
      setInstituteId(formData?.institute?.id);
      setIframeFormURI(formData);
    } catch (error) {
      console.log(error);
    } finally {
      // setSpinner(false);
    }
  };

  const handleRejectOGA = async () => {
    const postData = {
      form_id: formSelected.form_id,
      remarks: "",
      date: new Date().toISOString().substring(0, 10),
    };
    try {
      setSpinner(true);
      const res = await getRejectApplicant(postData);
      const formStatus =
        res?.data?.update_form_submissions?.returning[0]?.form_status;
      let tempOGAFormsList = [...OGAFormsList];
      tempOGAFormsList.forEach((item) => {
        if (item.form_id === formSelected.form_id) {
          item.form_status = formStatus;
          item.noc_recommendation = "Not recommended"
        }
      });
      setOGAFormsList(tempOGAFormsList);
      registerEvent({
        created_date: getLocalTimeInISOFormat(),
        entity_id: formSelected.form_id.toString(),
        entity_type: "form",
        event_name: "Rejected",
        remarks: `${user_details?.firstName} ${user_details?.lastName} has rejected the form!`,
      });

      updateFormStatus({
        form_id: formSelected.form_id * 1,
        form_status: "Rejected",
      });
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "The form is rejected!",
        toastType: "success",
      }));
    } catch (error) {
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "The form rejection failed!",
        toastType: "error",
      }));
    } finally {
      setSpinner(false);
    }
  };

  const handleAcceptOGA = async () => {
    const postData = {
      form_id: formSelected.form_id,
      remarks: "",
      date: new Date().toISOString().substring(0, 10),
      noc_Path: "",
      noc_fileName: "",
    };
    try {
      setSpinner(true);
      let response;
      if (round == 1) {
        response = await getAcceptApplicantNoc(postData);
      }
      if (round == 2) {
        response = await getAcceptApplicantCertificate(postData);
      }

      const formStatus =
      response?.data?.update_form_submissions?.returning[0]?.form_status;
      let tempOGAFormsList = [...OGAFormsList];
      tempOGAFormsList.forEach((item) => {
        if (item.form_id === formSelected.form_id) {
          item.form_status = formStatus;
          item.noc_recommendation = "Recommended"
        }
      });
      setOGAFormsList(tempOGAFormsList);
      registerEvent({
        created_date: getLocalTimeInISOFormat(),
        entity_id: formSelected.form_id.toString(),
        entity_type: "form",
        event_name: "Approved",
        remarks: `${user_details?.firstName} ${user_details?.lastName} has approved the form!`,
      });

      updateFormStatus({
        form_id: formSelected.form_id * 1,
        form_status: "Approved",
      });
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "The form is approved!",
        toastType: "success",
      }));
    } catch (error) {
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "The form approval failed!",
        toastType: "error",
      }));
    } finally {
      setSpinner(false);
    }
  };

  const handleVerifyOGA = (action) => {
    if (!action) {
      handleRejectOGA();
    } else {
      handleAcceptOGA();
    }
  };

  const checkIframeLoaded = () => {
    if (!window.location.host.includes("localhost")) {
      const iframeElem = document.getElementById("enketo_OGA_preview");
      var iframeContent =
        iframeElem?.contentDocument || iframeElem?.contentWindow.document;
      if (!iframeContent) return;

      var section = iframeContent?.getElementsByClassName("or-group");
      if (!section) return;
      for (var i = 0; i < section?.length; i++) {
        var inputElements = section[i].querySelectorAll("input");
        inputElements.forEach((input) => {
          input.disabled = true;
        });
      }

      iframeContent.getElementById("submit-form").style.display = "none";
      iframeContent.getElementById("save-draft").style.display = "none";

      // Need to work on Save draft...
      var draftButton = iframeContent.getElementById("save-draft");
      draftButton?.addEventListener("click", function () {
        alert("Hello world!");
      });
    }

    setSpinner(false);
  };

  const getOGAFormsList = async () => {
    const postData = { applicant_form_id: 338, submitted_on: "2023-09-04" };
    const res = await fetchOGAFormsList(postData);
    setOGAFormsList(res?.data?.form_submissions);
  };

  useEffect(() => {
    getOGAFormsList();
    setSpinner(true);
    fetchFormData();
    setTimeout(() => {
      checkIframeLoaded();
    }, 2500);
  }, []);

  useEffect(() => {
    if (formSelected) {
      setIframeFormURI(formSelected);
    } else {
      fetchFormData();
    }
  }, [formSelected]);

  return (
    <>
      {/* Breadcrum */}
      <div className="h-[48px] bg-white flex justify-start drop-shadow-sm">
        <div className="container mx-auto flex px-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home}>
              <span className="text-primary-400">
                On Ground Inspection - All applications
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500 uppercase">
              {formDataFromApi?.course?.course_name.split("_").join(" ")}
            </span>
          </div>
        </div>
      </div>

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-row">
            <div className="flex grow justify-start items-center"></div>
            <div className="flex grow gap-4 justify-end items-center">
              <button
                onClick={() => setRejectModel(true)}
                disabled={
                  formStatus == "Approved" ||
                  formStatus == "Rejected" ||
                  rejectStatus
                    ? true
                    : false
                }
                className={
                  formStatus == "Approved" ||
                  formStatus == "Rejected" ||
                  rejectStatus
                    ? "invisible cursor-not-allowed flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                    : "flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                }
              >
                Reject
                <span>
                  <AiOutlineClose />
                </span>
              </button>
              <button
                onClick={() => setOpenIssueNocModel(true)}
                disabled={
                  formStatus == "Approved" ||
                  formStatus == "Rejected" ||
                  rejectStatus
                    ? true
                    : false
                }
                className={
                  formStatus == "Approved" ||
                  formStatus == "Rejected" ||
                  rejectStatus
                    ? "invisible cursor-not-allowed flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                    : "flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                }
              >
                Approve
                <span>
                  <AiOutlineCheck />
                </span>
              </button>
              <div
                className={
                  formStatus == "Approved" ||
                  formStatus == "Rejected" ||
                  rejectStatus
                    ? "invisible"
                    : "inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"
                }
              ></div>

              <button
                onClick={() => setOpenStatusModel(true)}
                className="border border-gray-500 text-blue-600 bg-gray-100 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                View status log
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex w-[30%]">
              <OGASidebar
                OGAFormsList={OGAFormsList}
                setFormSelected={setFormSelected}
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Card moreClass="flex flex-col gap-5 shadow-md">
                {formSelected && !formSelected?.noc_recommendation && (
                  <div className="flex grow gap-4 justify-end items-center">
                    <button
                      onClick={() => handleVerifyOGA(true)}
                      className="border border-gray-500 text-green-600 w-[140px] h-[40px] font-medium rounded-[4px]"
                    >
                      Approve OGA
                    </button>
                    <button
                      onClick={() => handleVerifyOGA(false)}
                      className="border border-gray-500 text-red-600 w-[140px] h-[40px] font-medium rounded-[4px]"
                    >
                      Reject OGA
                    </button>
                  </div>
                )}
                <iframe
                  id="enketo_OGA_preview"
                  title="form"
                  src={`${ENKETO_URL}/preview?formSpec=${encodeURI(
                    JSON.stringify(formSpec)
                  )}&xform=${encodedFormURI}&userId=${userId}`}
                  style={{ minHeight: "100vh", width: "100%" }}
                  ref={reportTemplateRef}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* {openModel && <NocModal closeModal={setOpenModel}  setOpenIssueNocModel={setOpenIssueNocModel} setToast={setToast} />} */}
      {rejectModel && (
        <RejectNocModal
          closeRejectModal={setRejectModel}
          setRejectStatus={setRejectStatus}
          formId={formId}
          instituteId={instituteId}
          instituteName={instituteName}
        />
      )}
      {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
      {openStatusModel && (
        <StatusLogModal closeStatusModal={setOpenStatusModel} formId={formId} />
      )}
      {openIssueNocModel && (
        <IssueNocModal
          selectRound={round}
          // setRejectStatus={setRejectStatus}
          selectInstituteName={instituteName}
          formId={formId}
          setOpenIssueNocModel={setOpenIssueNocModel}
          instituteId={instituteId}
        />
      )}
    </>
  );
}
