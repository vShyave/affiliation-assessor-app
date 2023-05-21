import React from "react";

import { Link, useNavigate } from 'react-router-dom';

import { Select, Option } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Button} from '../components'

import { FaAngleRight } from "react-icons/fa";

import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute';




export default function SelfRegistration() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
      
    //   const onSubmit = (data) => {
    //     alert(JSON.stringify(data));
    //   };  

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
                <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
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
                                        name="firstname"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("firstname", {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i
                                        })}
                                        />
                                            {errors?.firstname?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.firstname?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )}
                                            {errors?.firstname?.type === "pattern" && (
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
                                            name="lastname"
                                            id="lastname"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("lastname", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })}
                                        />
                                            {errors?.lastname?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.lastname?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )}
                                            {errors?.lastname?.type === "pattern" && (
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
                                            name="phonenumber"
                                            id="phonenumber"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                                        
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Applicant name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            id="applicantname"
                                            name="applicantname"
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("applicantname", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })}
                                        />
                                            {errors?.applicantname?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.applicantname?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )}
                                            {errors?.applicantname?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                                            )}
                                    </div>
                                </div>
                                <div className="sm:col-span-3 ">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                        Application type
                                    </label>
                                    <div className="mt-2">
                                    <Select label="Select here">
                                    <Option>Admin</Option>
                                    <Option>Applicant</Option>
                                    </Select>
                                    </div>
                                </div> 
                            </div> 
                                        
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3 ">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                        Course name
                                    </label>
                                    <div className="mt-2">
                                    <Select label="Select here">
                                    <Option>ANM</Option>
                                    <Option>GNM</Option>
                                    </Select>
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
