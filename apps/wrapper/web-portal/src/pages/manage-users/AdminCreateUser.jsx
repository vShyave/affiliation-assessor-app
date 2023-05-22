import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { Select, Option } from "@material-tailwind/react";

import { useForm } from "react-hook-form";

import { Button } from "../../components";

import { getSpecificUser } from "./../../api";

export default function AdminCreateUser() {

    let { userId } = useParams();
    const [ user, setUser ] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
      
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    const fetchUser = async () => {
        const res = await getSpecificUser({userId});
        setUser(res.data.assessors[0]);
    }

    useEffect(() => {
        fetchUser();
    }, [userId])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
                <div className="flex flex-row mb-4 justify-between">
                        <h1 className="text-2xl font-bold">
                            User details
                        </h1>
                        {/* <div className="flex gap-2">
                            <Button moreClass="px-6 text-white" style={{backgroundColor: '#fff'}} text="Cancel"></Button>
                            <Button moreClass="px-6 text-white" text="Submit"></Button>
                        </div> */}
                    </div>
                    <div className="flex flex-row justify-between bg-white h-[560px] rounded-[4px] p-8 mx-auto">
                        <div className="w-1/2">
                            <h1 className="text-xl font-semibold">User details</h1>
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
                                            value={user?.fname || user?.name}
                                            readOnly
                                            disabled
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {
                                                ...register("firstname", {
                                                    required: true,
                                                    maxLength: 20,
                                                    pattern: /^[A-Za-z]+$/i
                                                })
                                            }
                                        />
                                        {
                                            errors?.firstname?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>
                                        }
                                        {
                                            errors?.firstname?.type === "maxLength" && (
                                                <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                                            )
                                        }
                                        {
                                            errors?.firstname?.type === "pattern" && (
                                                <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                                            )
                                        }
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
                                            value={user?.lname}
                                            readOnly
                                            disabled
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
                                            value={user?.email}
                                            readOnly
                                            disabled
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {
                                                ...register("email", {
                                                    required: true,
                                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                                                })
                                            }
                                        />
                                            {
                                                errors?.email?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>
                                            }
                                            {
                                                errors?.email?.type === "pattern" && (
                                                    <p className="text-red-500 mt-2 text-sm">This is not a valid email format</p>
                                                )
                                            }
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
                                            value={user?.phonenumber}
                                            readOnly
                                            disabled
                                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("phonenumber", {
                                                required: true,
                                                maxLength: 10,
                                                pattern: /^([+]\d{2})?\d{10}$/

                                            })}
                                        />
                                            {errors?.phonenumber?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                                            {errors?.phonenumber?.type === "maxLength" && (
                                            <p className="text-red-500 mt-2 text-sm">Phonenumber cannot exceed 10 characters</p>
                                            )}
                                            {errors?.phonenumber?.type === "pattern" && (
                                            <p className="text-red-500 mt-2 text-sm">Please provide valid phone number</p>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3 ">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <Select label="Select here" value="Assessor" readOnly disabled>
                                            <Option value="admin">Admin</Option>
                                            <Option value="applicant">Applicant</Option>
                                            <Option value="assessor">Assessor</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>  
                </form>
            </div>
        </>
    );
}
