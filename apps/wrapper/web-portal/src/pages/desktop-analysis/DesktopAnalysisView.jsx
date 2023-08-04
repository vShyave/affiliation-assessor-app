import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import StatusLogModal from "../ground-analysis/StatusLogModal";
import XMLParser from "react-xml-parser";

// import NocModal from "./NocModal";
// import RejectNocModal from "./RejectNocModal";
import { Card, Button } from "./../../components";
import CommonModal from "./../../Modal";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";

import { getFormData } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import {
  getFormURI,
  saveFormSubmission,
  getPrefillXML,
} from "./../../api/formApi";
import {
  updateFormData,
  getSpecificDataFromForage,
  removeItemFromLocalForage,
  getFromLocalForage,
  setToLocalForage,
} from "../../forms";
import { ContextAPI } from "../../utils/ContextAPI";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;

export default function DesktopAnalysisView() {
  // const [rejectModel, setRejectModel] = useState(false)
  // const [openModel, setOpenModel] = useState(false);
  const [openScheduleInspectionModel, setOpenSheduleInspectionModel] =
    useState(false);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  let { formName, formId } = useParams();
  const [formDataFromApi, setFormDataFromApi] = useState();

  const [openStatusModel, setOpenStatusModel] = useState(false);

  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  const { setSpinner } = useContext(ContextAPI);

  const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
  const formSpec = {
    skipOnSuccessMessage: true,
    prefill: {},
    submissionURL: "",
    name: formName,
    successCheck: "async (formData) => { return true; }",
    onSuccess: {
      notificationMessage: "Feedback submitted successfully",
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
  const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
  const [onFormFailureData, setOnFormFailureData] = useState(undefined);
  const [onSubmit, setOnSubmit] = useState(false);
  const [encodedFormSpec, setEncodedFormSpec] = useState(
    encodeURI(JSON.stringify(formSpec.formId))
  );

  const fetchFormData = async () => {
    let formData = {};
    let filePath =
      process.env.REACT_APP_GCP_AFFILIATION_LINK + formName + ".xml";

    let data = await getFromLocalForage(
      `${userId}_${formName}_${new Date().toISOString().split("T")[0]}`
    );
    // if (data) {
    //   formData = data;
    // } else {
    const postData = { form_id: formId };
    try {
      setSpinner(true);
      const res = await getFormData(postData);
      formData = res.data.form_submissions[0];
      setFormDataFromApi(res.data.form_submissions[0]);

      await setToLocalForage(
        `${userId}_${startingForm}_${new Date().toISOString().split("T")[0]}`,
        {
          formData: formData?.form_data,
          imageUrls: { ...data?.imageUrls },
        }
      );
      // }

      let formURI = await getPrefillXML(
        `${filePath}`,
        formSpec.onSuccess,
        formData?.form_data,
        formData?.imageUrls
      );
      setEncodedFormURI(formURI);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const afterFormSubmit = async (e) => {
    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

    try {
      const { nextForm, formData, onSuccessData, onFailureData } = data;
      if (data?.state === "ON_FORM_SUCCESS_COMPLETED") {
        handleSubmit();
        // setOnSubmit(true);
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
      console.log("error = ", e);
    }
  };

  const handleSubmit = async () => {
    const updatedFormData = await updateFormData(formSpec.start, userId);
    console.log("updatedFormData - ", updatedFormData);
    return;
    const storedData = await getSpecificDataFromForage("required_data");

    saveFormSubmission({
      schedule_id: null,
      form_data: updatedFormData,
      assessment_type: "admin",
      form_name: formName,
      submission_status: true,
      assessor_id: null,
      applicant_id: null,
      submitted_on: new Date().toJSON().slice(0, 10),
      form_status: "Application Submitted",
    });

    // Delete the data from the Local Forage
    const key = `${storedData?.assessor_user_id}_${formSpec.start}_${
      new Date().toISOString().split("T")[0]
    }`;

    removeItemFromLocalForage(key);

    // setOnSubmit(false);
    // setToast((prevState) => ({
    //   ...prevState,
    //   toastOpen: true,
    //   toastMsg: "Form Submitted Successfully!.",
    //   toastType: "success",
    // }));

    // setTimeout(
    //   () =>
    //     setToast((prevState) => ({
    //       ...prevState,
    //       toastOpen: false,
    //       toastMsg: "",
    //       toastType: "",
    //     })),
    //   1500
    // );

    // setTimeout(
    //   () => navigate(`${APPLICANT_ROUTE_MAP.dashboardModule.my_applications}`),
    //   1500
    // );
  };

  const handleFormEvents = async (startingForm, afterFormSubmit, e) => {
    if (typeof e.data === "string" && e.data.includes("webpackHot")) {
      return;
    }

    if (
      ENKETO_URL === e.origin + "/enketo/" &&
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

        // console.log("formData - ", JSON.parse(e.data).formData);
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

  useEffect(() => {
    fetchFormData();
    bindEventListener();
  }, []);

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      {/* Breadcrum */}
      {/* <Breadcrumb data={breadCrumbData} /> */}

      <div className="h-[48px] bg-white flex justify-start drop-shadow-sm">
        <div className="container mx-auto flex px-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home}>
              <span className="text-primary-400">
                Desktop analysis - All applications
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500 uppercase">
              {formName.split("_").join(" ")}
            </span>
          </div>
        </div>
      </div>

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-row">
            <div className="flex grow gap-4 justify-end items-center">
              <button className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 bg-white text-gray-500 w-fit h-fit p-2 font-semibold rounded-[4px]">
                <span>
                  <BsArrowLeft />
                </span>
                Return to institute{" "}
              </button>
              <button
                onClick={() => setOpenSheduleInspectionModel(true)}
                className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-fit h-fit p-2 font-semibold rounded-[4px]"
              >
                Send for inspection{" "}
                <span>
                  <BsArrowRight />
                </span>
              </button>
              <div className="inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"></div>
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
              <Sidebar />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Card
                moreClass="flex flex-col shadow-md border border-[#F5F5F5] gap-4"
                styles={{ backgroundColor: "#F5F5F5" }}
              >
                <div
                  className="p-1 flex justify-center border border-[#D9D9D9] rounded-[4px]"
                  style={{ backgroundColor: "#EBEBEB" }}
                >
                  <h4 className="text-secondary font-medium">Status: New</h4>
                </div>
                <p className="flex text-gray-500 justify-center">
                  Your application is on-hold 23/03/2023
                </p>
              </Card>
              <Card moreClass="shadow-md">
                <iframe
                  title="form"
                  src={`${ENKETO_URL}preview?formSpec=${encodeURI(
                    JSON.stringify(formSpec)
                  )}&xform=${encodedFormURI}&userId=${userId}`}
                  style={{ minHeight: "100vh", width: "100%" }}
                />
              </Card>
            </div>
          </div>

          {/* { openModel && <NocModal closeModal={setOpenModel}/> } */}
          {/* { rejectModel && <RejectNocModal closeRejectModal={setRejectModel}/> } */}
          {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
          {openStatusModel && (
            <StatusLogModal
              closeStatusModal={setOpenStatusModel}
              formId={formId}
            />
          )}
          {openScheduleInspectionModel && (
            <ScheduleInspectionModal
              closeSchedule={setOpenSheduleInspectionModel}
              setToast={setToast}
              instituteId={formDataFromApi?.institute?.id}
              instituteName={formDataFromApi?.institute?.course_applied}
            />
          )}
        </div>
      </div>

      {onSubmit && (
        <CommonModal>
          <p className="text-secondary text-2xl text-semibold font-medium text-center">
            Are you sure, do you want to submit?
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
    </>
  );
}
