import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";

import { Card, Button } from "./../../components";

import NocModal from "./NocModal";
import StatusLogModal from "./StatusLogModal";
import IssueNocModal from "./IssueNocModal.jsx";
import RejectNocModal from "./RejectNocModal";
import Sidebar from "../../components/Sidebar";

import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { getFormData } from "../../api";
import { getPrefillXML } from "./../../api/formApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ContextAPI } from "../../utils/ContextAPI";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;

export default function ApplicationPage({
  closeModal,
  closeRejectModal,
  closeStatusModal,
  closeCertificateModal,
}) {
  const reportTemplateRef = useRef(null);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openStatusModel, setOpenStatusModel] = useState(false);
  const [openIssueNocModel, setOpenIssueNocModel] = useState(false);
  const [encodedFormURI, setEncodedFormURI] = useState("");
  let { formName, formId, instituteName, round } = useParams();
  let [instituteNameModal, setInstituteNameModal] = useState(instituteName);
  let [selectRound, setSelectRound] = useState(round);
  console.log(instituteNameModal);
  const {setSpinner} = useContext(ContextAPI)

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

  // const breadCrumbData = [
  //   {
  //     link: "ADMIN_ROUTE_MAP.adminModule.manageForms.home",
  //     text: "Home",
  //   },
  //   {
  //     link: "ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home",
  //     text: "All applications",
  //   },
  // ];

  const fetchFormData = async () => {
    const postData = { form_id: formId };
    try{
      setSpinner(true)
      const res = await getFormData(postData);
    const formData = res.data.form_submissions[0];

    let formURI = await getPrefillXML(
      `${formData?.form_name}`,
      "",
      formData.form_data,
      formData.imageUrls
    );
    setEncodedFormURI(formURI);
    }catch(error){
      console.log(error)
    }finally{
      setSpinner(false)
    }
    
  };

  const handleGeneratePdf = () => {
    // const doc = new jsPDF({
    //   format: "a4",
    //   unit: "px",
    // });

    // // Adding the fonts.
    // doc.setFont("Inter-Regular", "normal");

    html2canvas(
      window.document
        .querySelector("iframe")
        .contentWindow.document.querySelector(".main")
    ).then((canvas) => {
      let base64image = canvas.toDataURL("image/png");
      console.log(base64image);
      let pdf = new jsPDF("p", "px", [1600, 1131]);
      pdf.addImage(base64image, "PNG", 15, 15, 1110, 360);
      pdf.save("enketo-form.pdf");
    });

    // doc.html(reportTemplateRef.current, {
    //   async callback(doc) {
    //     await doc.save("document");
    //   },
    // });
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      {/* Breadcrum */}
      {/* <Breadcrumb data={breadCrumbData} /> */}

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
              {formName.split("_").join(" ")}
            </span>
          </div>
        </div>
      </div>

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-row">
            <div className="flex grow justify-start items-center">
              <h1 className="text-2xl font-bold uppercase">
                {formName.split("_").join(" ")}
              </h1>
            </div>
            <div className="flex grow gap-4 justify-end items-center">
              <button
                onClick={() => setRejectModel(true)}
                disabled={rejectStatus}
                className={
                  !rejectStatus
                    ? "flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                    : "cursor-not-allowed flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                }
              >
                Reject{" "}
                <span>
                  <AiOutlineClose />
                </span>{" "}
              </button>
              <button
                onClick={() => setOpenIssueNocModel(true)}
                disabled={rejectStatus}
                className={
                  !rejectStatus
                    ? "flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                    : "cursor-not-allowed flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
                }
                // className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Approve{" "}
                <span>
                  <AiOutlineCheck />
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
                  <h4 className="text-secondary font-medium">
                    Status: Inspection completed
                  </h4>
                </div>
              </Card>
              <Card moreClass="shadow-md">
                <iframe
                  id="enketo_form_preview"
                  title="form"
                  src={`${ENKETO_URL}preview?formSpec=${encodeURI(
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
        />
      )}
      {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
      {openStatusModel && (
        <StatusLogModal closeStatusModal={setOpenStatusModel} formId={formId} />
      )}
      {openIssueNocModel && (
        <IssueNocModal
          selectRound={round}
          selectInstituteName={instituteName}
          setOpenIssueNocModel={setOpenIssueNocModel}
        />
      )}
    </>
  );
}
