import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";
import { set, useForm } from "react-hook-form";
import Button from "../../components/Button";

import { FaAngleRight } from "react-icons/fa";
import UploadForm from "./UploadForm";
import { convertODKtoXML, createForm } from "../../api";
import Toast from "../../components/Toast";

const CreateForm = () => {
  const [formStage, setFormStage] = useState(1);
  const [xmlData, setXmlData] = useState(null);
  const [formData, setFormData] = useState({});
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newForm = Object.fromEntries(formData)
    setFormData(newForm)
    console.log(newForm)
    // TODO: add form validations
    setFormStage(2)
  };

  const handleFile = (file) => {
    console.log(file);
    console.log(file.type);
    const formData = new FormData();
    formData.append("file", file);
    uploadOdkForm(formData);


  };

  const uploadOdkForm = async (postData) => {
    try {
      const res = await convertODKtoXML(postData);
      console.log(res);
      setXmlData(res.data);
      //TODO: function call to invoke API for uploading xml file and get the remote path
      //TODO: add remote path to formData (state).
      // TODO:  uncomment below API call to create form
      // const createFormResponse = await createForm(formData)
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
              ></Button>
              <Button
                moreClass="px-6 text-gray-500 bg-white border border-gray-300"
                text="Save as draft"
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
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Form title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Type here"
                          id="title"
                          name="title"
                          required
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.title?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )}
                        {errors?.title?.type === "maxLength" && (
                          <p className="text-red-500 mt-2 text-sm">
                            First name cannot exceed 20 characters
                          </p>
                        )}
                        {errors?.title?.type === "pattern" && (
                          <p className="text-red-500 mt-2 text-sm">
                            Alphabetical characters only
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3 ">
                      <label
                        htmlFor="institute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Application type
                      </label>
                      <select
                        required
                        name="institute"
                        id="institute"
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
                      <label
                        htmlFor="round_no"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Round No.
                      </label>
                      <select
                        required
                        name="round_no"
                        id="round_no"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value={1}>Round 1</option>
                        <option value={2}>Round 2</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="course_type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Course name
                      </label>
                      <select
                        required
                        name="course_type"
                        id="course_type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="nursing">Nursing</option>
                        <option value="paramedical">Paramedical</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3 ">
                      <label
                        htmlFor="labels"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Form labels
                      </label>
                      <select
                        required
                        name="labels"
                        id="labels"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="teaching_learning_process">
                          Teaching Learning Process
                        </option>
                        <option value="objective_structured_clinical_examination">
                          Objective Structured Clinical Examincation
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="assignee"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Assignee
                      </label>
                      <select
                        required
                        name="assignee"
                        id="assignee"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select here</option>
                        <option value="applicant">Applicant</option>
                        <option value="admin">Admin</option>
                        <option value="government">Government</option>
                        <option value="desktop_assessor">
                          Desktop Assessor
                        </option>
                        <option value="onground_assessor">
                          On-ground Assessor
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    moreClass="px-6 text-white bg-primary-500 border border-primary-500"
                    style={{ backgroundColor: "" }}
                    text="Next"
                    type="submit"
                  ></Button>
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
