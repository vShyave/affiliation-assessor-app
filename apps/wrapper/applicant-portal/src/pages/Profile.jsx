import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Label } from "../components";

import { FaAngleRight } from "react-icons/fa";

import Toast from "../components/Toast";

import { getCookie } from "../utils";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";

import { profileService } from "../services";

export default function Profile() {
  const instituteData = getCookie("institutes");

  const [text, setText] = useState("Edit");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    course_type: "",
  });
  const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPreview) {
      handleEditProfile();
    }
  };

  const [formState, setFormState] = useState(1);
  const [isPreview, setIsPreview] = useState(true);

  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleEditProfile = async () => {
    console.log("data", formData);
    const {
      firstName,
      lastName,
      applicantName,
      applicantType,
      courseType,
      email,
      mobilePhone,
    } = formData;
    const instituteDetails = {
      instituteName: applicantName,
      district: "Varanasi", // Capture it from UI once field is added
      email: email,
      address: "Shivpur, Varanasi", // Capture it from UI once field is added
      course_applied: courseType,
    };

    const institutePocDetils = {
      fname: firstName,
      lname: lastName,
      name: `${firstName} ${lastName}`,
      phoneNumber: mobilePhone,
      user_id: "",
      institute_id: "",
    };
    const instituteEditDetails = {
      institute_id: instituteData[0]?.id,
      institute_name: instituteDetails.instituteName,
      // institute_email: instituteDetails.email,
      institute_course: instituteDetails.course_applied,
      institutePOC_fname: formData?.first_name,
      institutePOC_lname: formData?.last_name,
      institutePOC_name: formData?.name,
      institutePOC_phno: formData?.phone_number,
    };

    try {
      const response = await profileService.getProfileEdit(
        instituteEditDetails,

        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "User successfully edited",
          toastType: "success",
        }))
      );
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
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "User already registered.",
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
      console.error("Registration failed due to some error:", error);
    }
  };

  const handleChange = (e) => {
    console.log("handlechange", e.target);
    setFormData((prevState) => ({ ...prevState, [e.target]: e.target.value }));
  };

  const getProfileDetails = async () => {
    const instituteViewDetails = {
      institute_id: instituteData[0]?.id,
    };

    try {
      const response = await profileService.getProfileView(
        instituteViewDetails
      );
      const formDetail = response.data.institutes[0];
      setFormData({
        first_name: formDetail?.institute_pocs[0].fname,
        last_name: formDetail?.institute_pocs[0].lname,
        phone_number: formDetail?.institute_pocs[0].number,
        email: formDetail?.email,
        name: formDetail?.institute_pocs[0].name,
        // applicant_type: [applicantType],
        course_type: formDetail?.course_applied,
      });
      console.log("formDetail", formDetail);
    } catch (error) {
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "User already registered.",
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
      console.error("Can not see profile due to some error:", error);
    }
  };

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="h-[48px] bg-white drop-shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}>
              <span className="text-primary-400 cursor-pointer">
                My Application
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Profile</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 px-3 min-h-[40vh]">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">My Profile</h1>

          <form>
            {formState === 1 && (
              <div className="flex flex-row justify-between bg-white rounded-[4px] w-full p-8 mx-auto">
                <div className="w-1/2">
                  <h1 className="text-xl font-semibold">Applicant Details</h1>
                  <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="first_name"
                        text="First name"
                        required
                      ></Label>
                      <div className="mt-2">
                        <input
                          onChange={handleChange}
                          defaultValue={formData.first_name}
                          type="text"
                          placeholder="Type here"
                          disabled={isPreview}
                          id="first_name"
                          name="first_name"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // {...register("firstName", {
                          //   required: true,
                          //   maxLength: 20,
                          //   pattern: /^[A-Za-z]+$/i,
                          // })}
                        />
                        {/* {errors?.firstName?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )}
                        {errors?.firstName?.type === "maxLength" && (
                          <p className="text-red-500 mt-2 text-sm">
                            First name cannot exceed 20 characters
                          </p>
                        )}
                        {errors?.firstName?.type === "pattern" && (
                          <p className="text-red-500 mt-2 text-sm">
                            Alphabetical characters only
                          </p>
                        )} */}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="last_name"
                        text="Last name"
                        required
                      ></Label>
                      <div className="mt-2">
                        <input
                          type="text"
                          defaultValue={formData.last_name}
                          disabled={isPreview}
                          onChange={handleChange}
                          placeholder="Type here"
                          name="last_name"
                          id="last_name"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // {...register("lastName", {
                          //   required: true,
                          //   maxLength: 20,
                          //   pattern: /^[A-Za-z]+$/i,
                          // })}
                        />
                        {/* {errors?.lastName?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )}
                        {errors?.lastName?.type === "maxLength" && (
                          <p className="text-red-500 mt-2 text-sm">
                            First name cannot exceed 20 characters
                          </p>
                        )}
                        {errors?.lastName?.type === "pattern" && (
                          <p className="text-red-500 mt-2 text-sm">
                            Alphabetical characters only
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Label htmlFor="email" text="Email Id" required></Label>
                      <div className="mt-2">
                        <input
                          defaultValue={formData.email}
                          disabled={true}
                          onChange={handleChange}
                          type="email"
                          placeholder="Type here"
                          id="email"
                          name="email"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // {...register("email", {
                          //   required: true,
                          //   pattern:
                          //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                          // })}
                        />
                        {/* {errors?.email?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )}
                        {errors?.email?.type === "pattern" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This is not a valid email format
                          </p>
                        )} */}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <Label
                        htmlFor="phone_number"
                        text="Phonenumber"
                        required
                      ></Label>
                      <div className="mt-2">
                        <input
                          defaultValue={formData.phone_number}
                          disabled={isPreview}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Type here"
                          name="phone_number"
                          id="phone_number"
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          // {...register("mobilePhone", {
                          //   required: true,
                          //   maxLength: 10,
                          //   pattern: /^([+]\d{2})?\d{10}$/,
                          // })}
                        />
                        {/* {errors?.mobilePhone?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )}
                        {errors?.mobilePhone?.type === "maxLength" && (
                          <p className="text-red-500 mt-2 text-sm">
                            Phonenumber cannot exceed 10 characters
                          </p>
                        )}
                        {errors?.mobilePhone?.type === "pattern" && (
                          <p className="text-red-500 mt-2 text-sm">
                            Please provide valid phone number
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 ">
                      <Label
                        htmlFor="applicant_type"
                        text="Applicant type"
                        required
                      ></Label>
                      <div className="mt-2">
                        <select
                          defaultValue={formData.applicant_type}
                          disabled={isPreview}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          label="Select here"
                          id="applicant_type"
                          name="applicant_type"
                          // {...register("applicantType", {
                          //   required: true,
                          // })}
                        >
                          <option value="Institute">Institute</option>
                        </select>
                        {/* {errors?.applicantType?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )} */}
                      </div>
                    </div>
                    <div className="sm:col-span-3 ">
                      <Label
                        htmlFor="course_type"
                        text="Select Course"
                        required
                      ></Label>
                      <div className="mt-2">
                        <select
                          defaultValue={formData.course_type}
                          disabled={isPreview}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          label="Select here"
                          id="course_type"
                          name="course_type"
                          // {...register("courseType", {
                          //   required: true,
                          // })}
                        >
                          <option value="Nursing">Nursing</option>
                          <option value="Paramedical">Paramedical</option>
                        </select>
                        {/* {errors?.courseType?.type === "required" && (
                          <p className="text-red-500 mt-2 text-sm">
                            This field is required
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
                </div>

                <div className="flex flex-row justify-end h-1/2 my-auto mb-0 gap-2">
                  <button
                    className="bg-gray-50 px-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onClick={() => {
                      navigate(
                        APPLICANT_ROUTE_MAP.dashboardModule.my_applications
                      );
                    }}
                  >
                    Clear
                  </button>
                  <Button
                    moreClass="px-6 text-white"
                    text={text}
                    onClick={function (e) {
                      setText("Save");
                      setIsPreview(false);
                      // {text==="Save" && navigate(APPLICANT_ROUTE_MAP.dashboardModule.my_applications)}
                      handleSubmit(e);
                    }}
                  ></Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
