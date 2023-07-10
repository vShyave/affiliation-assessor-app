import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import "./UploadForm.css";
import { FaAngleRight } from "react-icons/fa";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { Card, Button, Label, Input } from "../../components";
import { MdEventBusy } from "react-icons/md";

import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

const UploadForm = ({ setFormStage, handleFile, xmlData, formData }) => {
  const [fileName, setFileName] = useState("");
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    setFileName(
      fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
    );
    handleFile(fileUploaded);
  };

  const downloadXmlFile = () => {
    var filename = `${fileName}.xml`;
    var element = document.createElement("a");
    var file = new Blob([xmlData], { type: "text/plain" });

    element.setAttribute("href", window.URL.createObjectURL(file));
    element.setAttribute("download", filename);

    element.dataset.downloadurl = [
      "text/plain",
      element.download,
      element.href,
    ].join(":");
    element.draggable = true;
    element.classList.add("dragout");

    element.click();
  };

  return (
    <>
      {/* <div className="h-[48px] bg-white drop-shadow-sm ">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link
              to={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.list}
            >
              <span className="text-primary-400 cursor-pointer">Schedule Management</span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Upload CSV</span>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-2xl font-medium">Schedule management</h1>
            </div>
            <div className="flex justify-end">
              <button className="flex flex-wrap items-center justify-center gap-2 border border-blue-900 text-blue-900 bg-white w-[100px] h-[45px] text-md font-medium rounded-[4px]">
                Cancel
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className=" w-[30%] h-full bg-white">
              <div className="flex flex-col">
                <div className="flex flex-row gap-4 p-6 text-2xl font-semibold border-b-gray-400 border-b-[2px]">
                  <span className="mt-1">
                    <HiOutlineInformationCircle />
                  </span>
                  <h1>Instruction</h1>
                </div>

                <div className="inst_list flex flex-col p-6">
                  <ul className="flex flex-col gap-3">
                    <li>Download CSV Template</li>
                    <li>
                      Based on reference, Create a CSV file
                      {/* <a
                        className="text-primary-600"
                        href="https://docs.getodk.org"
                        target="_blank"
                      >
                        https://docs.getodk.org
                      </a> */}
                    </li>
                    <li>Upload CSV file</li>
                  </ul>
                </div>
                <div className="flex justify-center p-6">
                  <Link
                    to="/files/Template_Form_Creation.xlsx"
                    target="_blank"
                    download
                  >
                    <Button
                      moreClass="text-primary-600 border border-primary-600 bg-white"
                      text="Download Template"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-8">
              <div className="flex flex-col h-[48vh] gap-8 justify-between">
                <div className="font-semibold text-xl">Upload CSV</div>
                <div className="flex flex-col m-auto">
                  <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={hiddenFileInput}
                    // onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    moreClass="text-white w-full px-6"
                    text="Browse file"
                    // onClick={handleClick}
                  />
                </div>
                <div className="">
                  <Button
                    moreClass="text-gray-500 w-1/6 bg-white border border-gray-500"
                    text="Back"
                    // onClick={() => setFormStage(1)}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
