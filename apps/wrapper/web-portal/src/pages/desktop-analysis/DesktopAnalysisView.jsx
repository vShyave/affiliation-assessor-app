import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import { Card, Button } from "./../../components";

// import NocModal from "./NocModal";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
// import RejectNocModal from "./RejectNocModal";
import Sidebar from "../../components/Sidebar";

import { getFormData } from "../../api";
import { getPrefillXML } from "./../../api/formApi";
import Toast from "../../components/Toast";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;

export default function DesktopAnalysisView() {
  // const [rejectModel, setRejectModel] = useState(false)
  // const [openModel, setOpenModel] = useState(false);
  const [openScheduleInspectionModel, setOpenSheduleInspectionModel] =
    useState(false);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  let { formName, formId } = useParams();
  const [formDataFromApi, setFormDataFromApi] = useState();

  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

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

  const fetchFormData = async () => {
    const postData = { form_id: formId };
    const res = await getFormData(postData);
    const formData = res.data.form_submissions[0];
    setFormDataFromApi(res.data.form_submissions[0])
    let formURI = await getPrefillXML(
      `${formData?.form_name}`,
      "",
      formData.form_data,
      formData.imageUrls
    );
    setEncodedFormURI(formURI);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="flex flex-col gap-12">
        <div className="flex flex-row">
          {/* <div className="flex grow justify-start items-center">
                        <h1 className="text-2xl font-bold uppercase">{ formName.split('_').join(' ') }</h1>
                    </div> */}
          <div className="flex grow gap-4 justify-end items-center">
            <button className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 bg-white text-gray-500 w-1/6 h-[40px] font-semibold rounded-[4px]">
              <span>
                <BsArrowLeft />
              </span>
              Return to institute{" "}
            </button>
            <button
              onClick={() => setOpenSheduleInspectionModel(true)}
              className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-1/6 h-[40px] font-semibold rounded-[4px]"
            >
              Send for inspection{" "}
              <span>
                <BsArrowRight />
              </span>
            </button>
            <div className="inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"></div>
            <button className="border border-gray-500 text-blue-600 bg-gray-100 w-[140px] h-[40px] font-medium rounded-[4px]">
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
      </div>
      {/* { openModel && <NocModal closeModal={setOpenModel}/> } */}
      {/* { rejectModel && <RejectNocModal closeRejectModal={setRejectModel}/> } */}
      {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
      {openScheduleInspectionModel && (
        <ScheduleInspectionModal
          closeSchedule={setOpenSheduleInspectionModel}
          setToast={setToast}
          instituteId={formDataFromApi?.institute?.id}
        />
      )}
    </>
  );
}
