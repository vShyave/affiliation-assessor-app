import React, { useState } from "react";
import {
  getAcceptApplicant,
  getAcceptApplicantCertificate,
  nocPdfUploader,
  getAcceptApplicantNoc,
} from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import Toast from "../../components/Toast";

function IssueNocModal({
  setOpenIssueNocModel,
  selectRound,
  selectInstituteName,
}) {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState({});
  const [comment, setComment] = useState("");
  const [fileTypeError, setFileTypeError] = useState(false);
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  let pathName = "";
  let nocorCertificateFileName = "";
  // console.log(selectRound);
  // console.log(selectInstituteName);
  // console.log("file",file);

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

  const handleChange = (e) => {
    setComment(e.target.value);

    const fileUploaded = e.target.files[0];
    console.log("fileUploaded",fileUploaded)
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
      const res = await nocPdfUploader(postData);
      console.log("postData", postData);
      console.log("res", res);
      pathName = res?.data?.fileUrl;
      nocorCertificateFileName = res?.data?.fileName;
      
      postData.type == "noc"
        ? handleAcceptApplicantRoundOne()
        : handleAcceptApplicantRoundTwo();

      if (res.status === 200) {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "File uploaded successfully!",
          toastType: "success",
        }));
        setTimeout(() => {
          setToast((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastMsg: "",
            toastType: "",
          }));
          navigate("/groundInspection/noc-issued");
        }, 3000);
      }
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
      setTimeout(
        () =>
          setToast((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastMsg: "",
            toastType: "",
          })),
        3000
      );
    }
  };
  const handleAcceptApplicantRoundOne = async () => {
    const postData = {
      form_id: 23,
      remarks: comment,
      date: new Date().toISOString().substring(0, 10),
      noc_Path: pathName,
      noc_fileName: nocorCertificateFileName,
    };
    const responseNoc = await getAcceptApplicantNoc(postData);
    console.log("noc hasura done");
    let pathName = "";
  let nocorCertificateFileName = "";
  };
  const handleAcceptApplicantRoundTwo = async () => {
    const postData = {
      form_id: 23,
      remarks: comment,
      date: new Date().toISOString().substring(0, 10),
      noc_Path: pathName,
      noc_fileName: nocorCertificateFileName,
    };
    const responseCertificate = await getAcceptApplicantCertificate(postData);
    console.log("hasura certificate done");
    let pathName = "";
  let nocorCertificateFileName = "";
  };
  // const handleAcceptApplicant = async () => {
  // navigate to next page
  // { navigate(ADMIN_ROUTE_MAP.adminModule.onGroundInspection.nocForm) }
  // };

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]">
          <div className="flex flex-col gap-4">
            <div className="title text-base flex font-bold">
              <h1>Upload NOC</h1>
            </div>
            <hr />
            <div className="body w-[496px] flex flex-col h-full flex justify-center items-center">
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
                moreClass="text-white flex justify-center  h-fit w-1/2 px-6"
                text="Browse file to upload(.pdf)"
                onClick={handleClick}
              />{" "}
              {fileTypeError && (
                <div className="text-red-500">{"Only pdf files accepted!(max size 5MB)"}</div>
              )}
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
