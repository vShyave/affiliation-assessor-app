import React, { useContext, useState } from "react";
import {
  getAcceptApplicant,
  getAcceptApplicantCertificate,
  nocPdfUploader,
  getAcceptApplicantNoc,
  registerEvent,
  updateFormStatus,
} from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { getCookie } from "../../utils";

import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { ContextAPI } from "../../utils/ContextAPI";
import { getLocalTimeInISOFormat } from "../../utils";

function IssueNocModal({
  setOpenIssueNocModel,
  selectRound,
  formId,
  selectInstituteName,
  setRejectStatus,
}) {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState({});
  const [comment, setComment] = useState("");
  const [fileTypeError, setFileTypeError] = useState(false);
  let pathName = "";
  let nocorCertificateFileName = "";
  const { setSpinner, setToast } = useContext(ContextAPI);
  const userDetails = getCookie("userData");

 const user_details = userDetails?.userRepresentation
  const hiddenFileInput = React.useRef(null);
  let selectedRound = "";
  if (selectRound == 1) {
    selectedRound = "noc";
  } else {
    selectedRound = "certificate";
  }

  const handleFile = (uploadFile) => {
    const formData = {
      file: uploadFile,
      type: selectedRound,
      prefix: selectInstituteName,
    };

    getNocOrCertificatePdf(formData);
  };

  const handleChangeComments = (e) => {
    setComment(e.target.value);
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded.name.includes(".pdf") || fileUploaded.size > 5000000) {
      setFileTypeError(true);
    } else {
      setFileName(
        fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
      );
      setFileTypeError(false);

      setFile(fileUploaded);
    }
  };

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const getNocOrCertificatePdf = async (postData) => {
    try {
      setSpinner(true);
      const res = await nocPdfUploader(postData);
      console.log("postData", postData);
      console.log("res", res);
      pathName = res?.data?.fileUrl;
      nocorCertificateFileName = res?.data?.fileName;

      postData?.type?.toLowerCase() === "noc"
        ? handleAcceptApplicantRoundOne()
        : handleAcceptApplicantRoundTwo();

      if (res.status === 200) {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "File uploaded successfully!",
          toastType: "success",
        }));
        navigate("/groundInspection/noc-issued");
      }
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
    } finally {
      setSpinner(false);
    }
  };

  const handleAcceptApplicantRoundOne = async () => {
    const postData = {
      form_id: formId,
      remarks: comment,
      date: new Date().toISOString().substring(0, 10),
      noc_Path: pathName,
      noc_fileName: nocorCertificateFileName,
    };
    try {
      setSpinner(true);
      const responseNoc = await getAcceptApplicantNoc(postData);
      // const formStatus =
      //   responseNoc?.data?.update_form_submissions?.returning[0]?.form_status;
      // setRejectStatus(formStatus === "Approved" ? true : false);
      // console.log("responseNoc", responseNoc);
      registerEvent({
        created_date: getLocalTimeInISOFormat(),
        entity_id: formId.toString(),
        entity_type: "form",
        event_name: "Approved",
        remarks: `${user_details?.firstName} ${user_details?.lastName} has approved the form!`,
      });

      updateFormStatus({           
        form_id: formId * 1,
        form_status: "Approved",
      });
      pathName = "";
      nocorCertificateFileName = "";
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleAcceptApplicantRoundTwo = async () => {
    const postData = {
      form_id: formId,
      remarks: comment,
      date: new Date().toISOString().substring(0, 10),
      noc_Path: pathName,
      noc_fileName: nocorCertificateFileName,
    };
    try {
      setSpinner(true);
      const responseCertificate = await getAcceptApplicantCertificate(postData);
      const formStatus =
        responseCertificate?.data?.update_form_submissions?.returning[0]
          ?.form_status;
      setRejectStatus(formStatus === "Approved" ? true : false);
      console.log("responseCertificate", responseCertificate);
      console.log("hasura certificate done");
      registerEvent({
        created_date: getLocalTimeInISOFormat(),
        entity_id: formId,
        entity_type: "form",
        event_name: "Approve",
        remarks: `${user_details?.firstName} ${user_details?.lastName} has approved the form!`
      });

      updateFormStatus({
        form_id: formId * 1,
        form_status: "Approved",
      });
      pathName = "";
      nocorCertificateFileName = "";
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };
  // const handleAcceptApplicant = async () => {
  // navigate to next page
  // { navigate(ADMIN_ROUTE_MAP.adminModule.onGroundInspection.nocForm) }
  // };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-fit">
          <div className="flex flex-col gap-4">
            <div className="title text-base flex font-bold">
              <h1>Upload NOC</h1>
            </div>
            <hr />
            <div className="body w-[496px] flex flex-col  flex justify-center items-center">
              <input
                type="file"
                accept="application/pdf, .pdf"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <div className="text-yellow-900 text-sm mb-2">
                Upload pdf file of size {"<"} 5mb
              </div>
              <Button
                moreClass="text-white flex justify-center h-fit w-1/2 px-6"
                text="Browse file to upload(.pdf)"
                onClick={handleClick}
              />{" "}
              {fileTypeError && (
                <div className="text-red-500">
                  {"Only pdf files accepted!(max size 5MB)"}
                </div>
              )}
              <textarea
                onChange={handleChangeComments}
                placeholder="Remarks"
                className="border w-[480px] h-[120px] p-2 mt-[8px] rounded-xl resize-none"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="footer flex flex-row justify-between">
              <button
                onClick={() => {
                  setOpenIssueNocModel(false);
                }}
                className="border border-blue-900 bg-white text-blue-900 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFile(file)}
                disabled={fileName && !fileTypeError ? false : true}
                // className="border border-blue-900 text-white bg-blue-900 w-[140px] h-[40px] font-medium rounded-[4px]"
                className={`${
                  fileName && !fileTypeError
                    ? "border border-blue-900 text-white bg-blue-900 w-[140px] h-[40px] font-medium rounded-[4px]"
                    : "cursor-not-allowed border border-gray-500 bg-white text-gray-500 px-8 h-[44px]"
                }`}
              >
                {selectRound == 1 ? "Issue NOC" : "Issue Certificate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IssueNocModal;
