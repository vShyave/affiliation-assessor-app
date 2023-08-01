import React, { useState } from "react";
import { getAcceptApplicant, nocPdfUploader } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import Toast from "../../components/Toast";

function IssueNocModal({ setOpenIssueNocModel, selectRound,selectInstituteName}) {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const[file,setFile] = useState({})
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  console.log(selectRound)
  console.log(selectInstituteName)
  const hiddenFileInput = React.useRef(null);

  let selectedRound = ""
   if(selectRound == 1){
    selectedRound = "noc"
  } else{
    selectedRound = "certificate"
  }

  const handleFile = (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("type", selectedRound );
    formData.append("prefix", selectInstituteName );

    getNocOrCertificatePdf(formData);
  };

  const handleChange = (e) => {

    setComment(e.target.value);

    const fileUploaded = e.target.files[0];
    setFileName(
      fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
    );
    setFile(fileUploaded);
  };

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const getNocOrCertificatePdf = async (postData) => {
    try {
      const res = await nocPdfUploader(postData);
      // setXmlData(res.data);
      // setFormData((prevState) => ({
      //   ...prevState,
      //   path: res.data.fileUrl,
      //   file_name: res.data.fileName,
      // }));
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
      navigate("/groundInspection/noc-issued")
    }, 3000);
  } }catch (error) {
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
            <div className="body w-[496px] h-full flex justify-center items-center">
              <input
                type="file"
                accept="application/pdf"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <Button
                moreClass="text-white flex justify-center h-fit w-1/2 px-6"
                text="Browse file to upload(.pdf)"
                onClick={handleClick}
              />{" "}
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
                onClick={() => handleFile(file) }
                
                className="border border-blue-900 text-white bg-blue-900 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IssueNocModal;
