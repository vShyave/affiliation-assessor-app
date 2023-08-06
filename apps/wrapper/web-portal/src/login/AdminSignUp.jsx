import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import customPost from "../api/adminCustomApi";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
import { registerUser } from "../api";
import { userService } from "../api/userService";

import { Card, Label, Button, Input } from "../components";
//import { forkJoin, lastValueFrom } from "rxjs";
import { removeCookie, setCookie } from "../utils/common";
import { ContextAPI } from "../utils/ContextAPI";
import { useContext } from "react";

export default function AdminSingUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const { setSpinner, setToast,toast } = useContext(ContextAPI);
  const signupHandler = async (data) => {
    const { firstName, lastName, email, mobilePhone } = data;
    let userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: email,
      password: "rkr",
      roleName: "Regulator",
    };
    try {
      setSpinner(true);
      let accessTokenObj = {
        grant_type: "client_credentials",
        client_id: "admin-api",
        client_secret: "edd0e83d-56b9-4c01-8bf8-bad1870a084a",
      };
      const accessTokenResponse = await userService.getAccessToken(
        accessTokenObj
      );
      setCookie(
        "access_token",
        "Bearer " + accessTokenResponse.data.access_token
      );

      const keyCloakSignupRes = await userService.signup(userDetails);

      const adminDetails = {
        user_id: keyCloakSignupRes.data.userId,
        fname: firstName,
        lname: lastName,
        fullName: firstName + " " + lastName,
        email: email,
        phoneNumber: mobilePhone,
      };
      const adminRes = await registerUser(adminDetails);
      navigate(ADMIN_ROUTE_MAP.loginModule.login);
      removeCookie("access_token");
    } catch (error) {
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "User already registered.",
        toastType: "error",
      }));
      console.error("Registration failed due to some error:", error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      
      <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
        <form
          onSubmit={handleSubmit((data) => {
            signupHandler(data);
          })}
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-center mb-8">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName" text="First name" required></Label>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Type here"
                    className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    {...register("firstName", {
                      required: true,
                      pattern: /^[A-Za-z ]+$/i,
                    })}
                  />
                  {errors?.firstName?.type === "required" && (
                    <div className="text-red-500 mt-2 text-sm">
                      This field is required
                    </div>
                  )}
                  {errors?.firstName?.type === "pattern" && (
                    <div className="text-red-500 mt-2 text-sm">
                      Alphabetical characters only
                    </div>
                  )}
                </div>
                <Label htmlFor="lastName" text="Last name" required></Label>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Type here"
                    className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    {...register("lastName", {
                      required: true,
                      pattern: /^[A-Za-z ]+$/i,
                    })}
                  />
                  {errors?.lastName?.type === "required" && (
                    <div className="text-red-500 mt-2 text-sm">
                      This field is required
                    </div>
                  )}
                  {errors?.lastName?.type === "pattern" && (
                    <div className="text-red-500 mt-2 text-sm">
                      Alphabetical characters only
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                    <Label htmlFor="email" text="Email id" required></Label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@email.com"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      noValidate
                    />
                    {errors?.email?.type === "required" && (
                      <div className="text-red-500 mt-2 text-sm">
                        This field is required
                      </div>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <div className="text-red-500 mt-2 text-sm">
                        This is not a valid email format
                      </div>
                    )}
                  </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="phoneNumber"
                  text="Mobile Number"
                  required
                ></Label>
                <div>
                  <input
                    type="tel"
                    placeholder="Type here"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("mobilePhone", {
                      required: true,
                      maxLength: 10,
                      pattern: /^([+]\d{2})?\d{10}$/,
                    })}
                  />
                  {errors?.mobilePhone?.type === "required" && (
                    <div className="text-red-500 mt-2 text-sm">
                      This field is required
                    </div>
                  )}
                  {errors?.mobilePhone?.type === "pattern" && (
                    <div className="text-red-500 mt-2 text-sm">
                      This is not a valid mobile number
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              moreClass="uppercase w-full mt-7 text-white"
              text="Continue"
            ></Button>
            <div className="flex justify-center my-6">
              <span className="text-gray-400">Have an account, </span>&nbsp;
              <Link
                to={ADMIN_ROUTE_MAP.loginModule.login}
                className="text-primary-700 "
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}
