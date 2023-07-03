import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";
import { set, useForm } from "react-hook-form";
import Button from "../../components/Button";

import { FaAngleRight } from "react-icons/fa";
import UploadForm from "./UploadForm";
import { convertODKtoXML, createForm, viewForm } from "../../api";
import Toast from "../../components/Toast";
import { Label } from "../../components";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formStage, setFormStage] = useState(1);
  const [xmlData, setXmlData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStage(2);
  };

  const handleFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    uploadOdkForm(formData);
  };

  const handleSaveDraft = async () => {
    let newForm = new FormData();
    Object.keys(formData).forEach((key) => newForm.append(key, formData[key]));
    // TODO: make user_id dynamic
    newForm.append("user_id", "53c57d13-d33d-439a-bd72-1f56b189642d");
    newForm.append("form_status", "Draft");
    try {
      const createFormResponse = await createForm(newForm);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Form successfully saved as draft!",
        toastType: "success",
      }));
      setTimeout(() => {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: false,
          toastMsg: "",
          toastType: "",
        }));
        navigate(ADMIN_ROUTE_MAP.adminModule.manageForms.home);
      }, 3000);
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while saving form!",
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

  const uploadOdkForm = async (postData) => {
    try {
      const res = await convertODKtoXML(postData);
      setXmlData(res.data);
      setFormData((prevState) => ({ ...prevState, path: res.data.fileUrl,file_name:res.data.fileName }));
      //TODO: function call to invoke API for uploading xml file and get the remote path
      //TODO: add remote path to formData (state).
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "File successfully converted to XML format!",
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
        3000
      );
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

  const getFormDetails = async (formData) => {
    try {
      const response = await viewForm(formData);
      const formDetail = response.data.forms[0];
      setFormData({
        application_type: formDetail?.application_type,
        assignee: formDetail?.assignee,
        course_type: formDetail?.course_type,
        labels: formDetail?.labels,
        round_no: formDetail?.round,
        title: formDetail?.title,
        path: formDetail?.path,
        file_name: formDetail?.file_name
      });
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

  useEffect(() => {
    if (window.location.pathname.includes("view")) {
      let form_id = window.location.pathname.split("/")[4];
      let formData = new FormData();
      formData.append("form_id", form_id);
      getFormDetails(formData);
    }
  }, []);

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="container mx-auto px-3 min-h-[40vh]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Create form</h1>
            <div className="flex gap-4">
              <Button
                moreClass="px-6 text-primary-600 bg-white border border-primary-600"
                style={{ backgroundColor: "" }}
                text="Cancel"
                onClick={() =>
                  navigate(ADMIN_ROUTE_MAP.adminModule.manageForms.home)
                }
              ></Button>
              <Button
                moreClass={`${
                  Object.values(formData).length !== 8
                    ? "text-gray-500 bg-white border border-gray-300 cursor-not-allowed"
                    : "text-white bg-primary-500 border border-primary-500"
                } px-6`}
                text="Save as draft"
                onClick={handleSaveDraft}
                otherProps={{ disabled: Object.values(formData).length !== 8 }}
              ></Button>
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-center">
            <div
              className={`${
                formStage === 1 ? "bg-black text-white" : "bg-white text-black"
              } py-3 px-10 rounded-[4px] text-[16px]`}
            >
              1. Add attributes
            </div>
            <div
              className={`${
                formStage === 2 ? "bg-black text-white" : "bg-white text-black"
              } py-3 px-10 rounded-[4px] text-[16px]`}
            >
              2. Upload ODK
            </div>
          </div>

          {formStage === 1 && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col bg-white rounded-[4px] p-8 gap-8">
                <div className="flex">
                  <h1 className="text-xl font-semibold">Add attributes</h1>
                </div>
                <div className="flex flex-grow">
                  <div className="grid grid-rows-3 grid-cols-6 gap-8">
                    <div className="sm:col-span-3">
                      <Label
                        required
                        text="Form title"
                        moreClass="block text-sm font-medium leading-6 text-gray-900"
                      />
                      <div className="mt-2">
                        <input
                          required
                          value={formData.title}
                          type="text"
                          placeholder="Type here"
                          id="title"
                          name="title"
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3 ">
                      <Label
                        required={true}
                        text="Application type"
                        htmlFor="application_type"
                        moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      />

                      <select
                        required
                        value={formData.application_type}
                        name="application_type"
                        id="application_type"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="new_institute">New Institute</option>
                        <option value="new_course">New Course</option>
                        <option value="seat_enhancement">
                          Seat Enhancement
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-3 ">
                      <Label
                        required
                        text="Round No."
                        htmlFor="round_no"
                        moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      />

                      <select
                        required
                        value={formData.round_no}
                        name="round_no"
                        id="round_no"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value={1}>Round 1</option>
                        <option value={2}>Round 2</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        required
                        text="Course name"
                        htmlFor="course_type"
                        moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      />

                      <select
                        required
                        value={formData.course_type}
                        name="course_type"
                        id="course_type"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="nursing">Nursing</option>
                        <option value="paramedical">Paramedical</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3 ">
                      <Label
                        required
                        text="Form labels"
                        htmlFor="labels"
                        moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      />

                      <select
                        required
                        value={formData.labels}
                        name="labels"
                        id="labels"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="teaching_learning_process">
                          Teaching Learning Process
                        </option>
                        <option value="objective_structured_clinical_examination">
                          Objective Structured Clinical Examination
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        required
                        text="Assignee"
                        htmlFor="assignee"
                        moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      />

                      <select
                        required
                        value={formData.assignee}
                        name="assignee"
                        id="assignee"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="applicant">Applicant</option>
                        <option value="admin">Admin</option>
                        <option value="government">Government</option>
                        <option value="desktop_assessor">
                          Desktop Assessor
                        </option>
                        <option value="on-ground_assessor">
                          On-ground Assessor
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className={`${
                      Object.values(formData).length < 6
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "px-6 text-white bg-primary-500 border border-primary-500"
                    } border w-[140px] h-[40px] font-medium rounded-[4px] `}
                    style={{ backgroundColor: "" }}
                    type="submit"
                    disabled={
                      Object.values(formData).length < 6 ? true : false
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          )}

          {formStage === 2 && (
            <UploadForm
              setFormStage={setFormStage}
              handleFile={handleFile}
              xmlData={xmlData}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateForm;
