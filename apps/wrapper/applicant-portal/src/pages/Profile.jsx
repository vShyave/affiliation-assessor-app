import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Label } from "../components";

import { FaAngleRight } from "react-icons/fa";
import Toast from "../components/Toast";
import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";
import { profileService } from "../services";

export default function Profile(props) {
  const [formData, setFormData] = useState({
    title: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formState,setFormState] = useState(1)

//  const handleEdit = () =>{
//     setFormState(2)
//   }

  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  const signupHandler = async (data) => {
    console.log("data",data)
    const {
      firstName,
      lastName,
      applicantName,
      applicantType,
      courseType,
      email,
      mobilePhone,
    } = data;
    let userDetails = {
      registration: {
        applicationId: process.env.REACT_APP_APPLICATION_ID,
        usernameStatus: "ACTIVE",
        roles: [applicantType],
      },
      user: {
        firstName,
        lastName,
        mobilePhone,
        email,
        fullName: `${firstName} ${lastName}`,
        username: mobilePhone,
        password: mobilePhone,
      },
    };

    const instituteDetails = {
      instituteName: applicantName,
      district: "Varanasi", // Capture it from UI once field is added
      email: email,
      address: "Shivpur, Varanasi", // Capture it from UI once field is added
      course_applied: courseType,
    };

    const instituteViewDetails = {
      // fname: firstName,
      // lname: lastName,
      // name: `${firstName} ${lastName}`,
      // phoneNumber: mobilePhone,
      // user_id: "",
      // institute_id: "",
      institute_id: 262
    };

    try {
      const response = await profileService.getProfileView(instituteViewDetails);
      const formDetail = response.data.institutes[0];
      setFormData({
        first_name: formDetail?.institute_pocs[0].fname,
        last_name: formDetail?.institute_pocs[0].lname,
        phone_number: formDetail?.institute_pocs[0].number,
        email: formDetail?.email,
        applicant_type: [applicantType],
        course_type: formDetail?.course_applied,
      });
      console.log("formData",formData.course_type)
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

  const goBack = () => {
    navigate(-1);
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
              <span className="text-primary-400 cursor-pointer">My Application</span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Profile</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 px-3 min-h-[40vh]">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <form
            onSubmit={handleSubmit((data) => {
              signupHandler(data);
            })}
          >
                  {formState === 1  &&  (<><div className="flex flex-row justify-between bg-white rounded-[4px] w-full p-8 mx-auto">
              <div className="w-1/2">
                <h1 className="text-xl font-semibold">Applicant Details</h1>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="firstname"
                      text="First name"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        value= {formData.first_name}
                        type="text"
                        disabled
                        placeholder="Type here"
                        id="firstname"
                        name="firstname"
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
                    <Label htmlFor="lastname" text="Last name" required></Label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={formData.last_name}
                        disabled
                        placeholder="Type here"
                        name="lastname"
                        id="lastname"
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
                        value={formData.email}
                        disabled
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
                      htmlFor="phonenumber"
                      text="Phonenumber"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        value={formData.phone_number}
                        disabled
                        type="tel"
                        placeholder="Type here"
                        name="phonenumber"
                        id="phonenumber"
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
                      htmlFor="applicanttype"
                      text="Applicant type"
                      required
                    ></Label>
                    <div className="mt-2">
                      <select
                        value={formData.applicant_type}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        label="Select here"
                        id="applicanttype"
                        name="applicanttype"
                        disabled
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
                      htmlFor="coursetype"
                      text="Select Course"
                      required
                    ></Label>
                    <div className="mt-2">
                      <select
                        value={formData.course_type}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        label="Select here"
                        id="coursetype"
                        name="courseType"
                        disabled
                        // {...register("courseType", {
                        //   required: true,
                        // })}
                      >
                        <option  value="Nursing">Nursing</option>
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
                <Button
                  moreClass="px-6 text-white"
                  text="Edit"
                  type="edit"
                  // onClick={handleEdit}
                ></Button>
              </div>
            </div></>)}
             
            { formState === 2 && (<div className="flex flex-row justify-between bg-white rounded-[4px] w-full p-8 mx-auto">
              <div className="w-1/2">
                <h1 className="text-xl font-semibold">Applicant Details</h1>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="firstname"
                      text="First name"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        value= {formData.first_name}
                        type="text"
                        placeholder="Type here"
                        id="firstname"
                        name="firstname"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("firstName", {
                          required: true,
                          maxLength: 20,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                      />
                      {errors?.firstName?.type === "required" && (
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
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <Label htmlFor="lastname" text="Last name" required></Label>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={formData.last_name}
                        placeholder="Type here"
                        name="lastname"
                        id="lastname"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("lastName", {
                          required: true,
                          maxLength: 20,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                      />
                      {errors?.lastName?.type === "required" && (
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
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label htmlFor="email" text="Email Id" required></Label>
                    <div className="mt-2">
                      <input
                        value={formData.email}
                        type="email"
                        placeholder="Type here"
                        id="email"
                        name="email"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("email", {
                          required: true,
                          pattern:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                        })}
                      />
                      {errors?.email?.type === "required" && (
                        <p className="text-red-500 mt-2 text-sm">
                          This field is required
                        </p>
                      )}
                      {errors?.email?.type === "pattern" && (
                        <p className="text-red-500 mt-2 text-sm">
                          This is not a valid email format
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="phonenumber"
                      text="Phonenumber"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        value={formData.phone_number}
                        type="tel"
                        placeholder="Type here"
                        name="phonenumber"
                        id="phonenumber"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("mobilePhone", {
                          required: true,
                          maxLength: 10,
                          pattern: /^([+]\d{2})?\d{10}$/,
                        })}
                      />
                      {errors?.mobilePhone?.type === "required" && (
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
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  
                  <div className="sm:col-span-3 ">
                    <Label
                      htmlFor="applicanttype"
                      text="Applicant type"
                      required
                    ></Label>
                    <div className="mt-2">
                      <select
                        value={formData.applicant_type}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        label="Select here"
                        id="applicanttype"
                        name="applicanttype"
                        {...register("applicantType", {
                          required: true,
                        })}
                      >
                        <option value="Institute">Institute</option>
                      </select>
                      {errors?.applicantType?.type === "required" && (
                        <p className="text-red-500 mt-2 text-sm">
                          This field is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3 ">
                    <Label
                      htmlFor="coursetype"
                      text="Select Course"
                      required
                    ></Label>
                    <div className="mt-2">
                      <select
                      value={formData.course_type}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        label="Select here"
                        id="coursetype"
                        name="courseType"
                        {...register("courseType", {
                          required: true,
                        })}
                      >
                        <option value="Nursing">Nursing</option>
                        <option value="Paramedical">Paramedical</option>
                      </select>
                      {errors?.courseType?.type === "required" && (
                        <p className="text-red-500 mt-2 text-sm">
                          This field is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
              </div>

              <div className="flex flex-row justify-end h-1/2 my-auto mb-0 gap-2">
                <Button
                  moreClass="px-6 text-white"
                  text="Save"
                  type="save"
                  onClick={setFormState(1)}
                ></Button>
              </div>
            </div>)}
            
          </form>
        </div>
      </div>
    </>
  );
}
