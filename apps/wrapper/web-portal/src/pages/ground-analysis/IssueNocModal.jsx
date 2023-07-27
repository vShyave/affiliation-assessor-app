import React, { useState } from "react";
import { getAcceptApplicant } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

function IssueNocModal({ setOpenIssueNocModel, setToast }) {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const hiddenFileInput = React.useRef(null);

  const handleFile = (file) => {
    // const formData = new FormData();
    // formData.append("file", file);
    // uploadOdkForm(formData);
    console.log(file)
  };

  const handleChange = (e) => {
    setComment(e.target.value);

    const fileUploaded = e.target.files[0];
    setFileName(
      fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
    );
    handleFile(fileUploaded);
  };

  const [comment, setComment] = useState("");

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleAcceptApplicant = async () => {
    // navigate to next page
    // { navigate(ADMIN_ROUTE_MAP.adminModule.onGroundInspection.nocForm) }
  };

  return (
    <>
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
                onClick={() => navigate("/groundInspection/noc-issued")}
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
