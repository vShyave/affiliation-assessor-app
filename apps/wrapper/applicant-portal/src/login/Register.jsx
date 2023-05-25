import React from "react";

import { Link, useNavigate } from 'react-router-dom';

import { Select,     } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Button} from '../components'

import { FaAngleRight } from "react-icons/fa";

import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute';
import { userService } from '../services';




export default function SelfRegistration() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      
    const signupHandler = async (data) => {
        console.log("signup data" ,data)
        const { firstName, lastName, applicantName, applicantType, courseType, email, mobilePhone} = data;
        let userDetails = {
            registration: {
                applicationId:  process.env.REACT_APP_APPLICATION_ID,
                usernameStatus: "ACTIVE",
                roles: [
                    applicantType
                ],
            },
            user: {
                firstName,
                lastName,
                mobilePhone,
                email,
                fullName: `${firstName} ${lastName}`,
                username: mobilePhone,
                password: mobilePhone
            }
        }
        const signupRes = await userService.signup(userDetails);    

        console.log("userDetails", userDetails);
        navigate(APPLICANT_ROUTE_MAP.dashboardModule.congratulations);

    };  

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
        <div className="h-[48px] bg-white drop-shadow-sm">
            <div className='container mx-auto px-3 py-3'>
                <div className='flex flex-row font-bold gap-2 items-center'>
                    <Link to={APPLICANT_ROUTE_MAP.dashboardModule.self_registration}>
                        <span className='text-primary-400 cursor-pointer'>Home</span>
                    </Link>
                    <FaAngleRight className='text-[16px]'/>
                    <span className='text-gray-500'>Self Registration</span>
                </div>
            </div>
        </div>
        <div className="container mx-auto py-12 px-3 min-h-[40vh]">
            <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-semibold">
                        Self Registration
                    </h1>
                <form onSubmit={handleSubmit((data)=>{ signupHandler(data)})}>
                    <div className="flex flex-row justify-between bg-white rounded-[4px] w-full p-8 mx-auto">
                        <div className="w-1/2">
                            <h1 className="text-xl font-semibold">Basic Details</h1>
                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input  
                                        type="text"
                                        placeholder="Type here"
                                        id="firstname"
                                        name="firstName"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("firstName", {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i
                                        })}
                                        />
                                            {errors?.firstName?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.firstName?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )}
                                            {errors?.firstName?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                                            )}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            name="lastName"
                                            id="lastname"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("lastName", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })}
                                        />
                                            {errors?.lastName?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.lastName?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )}
                                            {errors?.lastName?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Email Id
                                    </label>
                                    <div className="mt-2">
                                        <input  
                                            type="email"
                                            placeholder="Type here"
                                            id="email"
                                            name="email"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("email", {
                                                required: true,
                                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                                            })}
                                        />
                                            {errors?.email?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.email?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">This is not a valid email format</p>
                                            )}                    
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="tel"
                                            placeholder="Type here"
                                            name="mobilePhone"
                                            id="phonenumber"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("mobilePhone", {
                                                required: true,
                                                maxLength: 10,
                                                pattern: /^([+]\d{2})?\d{10}$/

                                            })}
                                        />
                                            {errors?.mobilePhone?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.mobilePhone?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">Phonenumber cannot exceed 10 characters</p>
                                            )}
                                            {errors?.mobilePhone?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Please provide valid phone number</p>
                                            )}
                                    </div>
                                </div>
                            </div>
                                        
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="applicantname"  className="block text-sm font-medium leading-6 text-gray-900">
                                        Applicant name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            id="applicantname"
                                            name="applicantName"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("applicantName", {
                                                required: true,
                                                maxLength: 50,
                                                pattern: /^[a-zA-Z ]*$/
                                            })}
                                        />
                                            {errors?.applicantName?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.applicantName?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">Applicant  name cannot exceed 50 characters</p>
                                            )}
                                            {errors?.applicantName?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                                            )}
                                    </div>
                                </div>
                                <div className="sm:col-span-3 ">
                                    <label htmlFor="applicanttype" className="block text-sm font-medium leading-6 text-gray-900">
                                        Applicant type
                                    </label>
                                    <div className="mt-2">
                                        <select 
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            label="Select here"
                                            id= "applicanttype"
                                            name="applicantType"
                                            {...register("applicantType", {
                                                required: true,
                                            
                                            })}
                                        >
                                            <option value="Institute">Institute</option>
                                        </select>
                                        {errors?.applicantType?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}

                                    </div>
                                </div> 
                            </div> 
                                        
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3 ">
                                    <label htmlFor="coursetype" className="block text-sm font-medium leading-6 text-gray-900">
                                        Course name
                                    </label>
                                    <div className="mt-2">
                                        <select 
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
                                        {errors?.courseType?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                    </div>
                                </div>
                            </div>
                        </div> 
                            
                        <div className="flex flex-row justify-end h-1/2 my-auto mb-0 gap-2">
                            <Button moreClass="px-6 text-primary-600" style={{backgroundColor: '#fff'}} text="Cancel" onClick={goBack}></Button>
                            <Button moreClass="px-6 text-white" text="Submit" type="submit"></Button>
                        </div>
                    </div>  
                </form>
            </div>
        </div>
    </>
);
}
