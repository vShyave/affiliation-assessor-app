import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
import { userService } from "../api/userService";
import { getRegulator } from "../api/index";
import { Card, Label, Button, Input } from "../components";
import { useForm } from "react-hook-form";
import { setCookie, getCookie, removeCookie } from "../utils/common";
import { forkJoin, lastValueFrom, from } from "rxjs";
import { mergeMap } from "rxjs/operators";

const AdminLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [enableOtp, setEnableOtp] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Check if user is already logged in (e.g., using your authentication logic)
    const checkLoggedInStatus = () => {
      const isAuthenticated = getCookie("userData");
      console.log("test");
      if (isAuthenticated) {
        setIsLoggedIn(true);
        navigate(ADMIN_ROUTE_MAP.adminModule.manageUsers.home); // Redirect to home page
      }
    };

    checkLoggedInStatus();
  }, [navigate]);

  const login = async (data) => {
    try {
      const loginRes = await userService.sendOtp(data.phone);

      if (Object.keys(loginRes.data).length === 0) {
        setEnableOtp(true);
        setPhoneNumber(data.phone);
      } else {
        console.log("Something went wrong", loginRes);
      }
    } catch (error) {
      console.log("Otp not sent due to some error", error);
    }
  };

  const verifyOtp = async (data) => {
    try {
      // const verifyOtpRes = await userService.verifyOtp(data.phone, data.otp);
      // //below logic will be modified with real login api
      // console.log("Verify Otp response", verifyOtpRes)
      // if(verifyOtpRes?.data?.data?.Status === "Success") {
      //     const loginDetails  = { loginId: data.phone, password: data.phone, noJWT: false };
      //     const fusionAuthLoginReq = userService.login(loginDetails);
      //     const applicantDetailsReq = applicantService.getApplicantDetails({user_id: });
      //     const loginResult = await userService.login(loginDetails);
      //     if(loginResult.data.user) {
      //         setCookie("userData", loginResult.data);
      //         navigate(APPLICANT_ROUTE_MAP.dashboardModule.my_applications);
      //     }
      // } else {
      //     console.log("Something went wrong", verifyOtpRes?.data?.status);
      // }
      const loginDetails = {
        loginId: data.phone,
        password: data.phone,
        noJWT: false,
      };
      const verifyOtpReq = userService.verifyOtp(data.phone, data.otp);
      const fusionAuthLoginReq = from(verifyOtpReq).pipe(
        mergeMap((verifyOtpRes) => {
          return userService.login(loginDetails);
        })
      );

      const adminDetailsReq = from(fusionAuthLoginReq).pipe(
        mergeMap((fusionAuthLoginRes) => {
          setCookie("userData", fusionAuthLoginRes.data);
          return getRegulator({
            phoneNumber: data.phone,
          });
        })
      );

      const [verifyOtpRes, fusionAuthLoginRes, adminDetailsRes] =
        await lastValueFrom(
          forkJoin([verifyOtpReq, fusionAuthLoginReq, adminDetailsReq])
        );
      setCookie("regulator", adminDetailsRes.data.regulator);
      navigate(ADMIN_ROUTE_MAP.adminModule.manageUsers.home);
    } catch (error) {
      console.log(
        "Otp veriification and login failed due to some error",
        error
      );
      removeCookie("regulator");
      removeCookie("userData");
    }
  };
  if (!isLoggedIn) {
    return (
      <>
        <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-center mb-8">Login</h1>
            {!enableOtp && (
              <>
                <form
                  onSubmit={handleSubmit((data) => {
                    login(data);
                  })}
                  noValidate
                >
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      text="Mobile Number"
                      required
                    ></Label>
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="Mobile number"
                      {...register("phone", {
                        required: true,
                        pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/i,
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      noValidate
                    />
                    {errors?.phone?.type === "required" && (
                      <p className="text-red-500 mt-2 text-sm">
                        This field is required
                      </p>
                    )}
                    {errors?.phone?.type === "pattern" && (
                      <p className="text-red-500 mt-2 text-sm">
                        This is not a valid mobile number
                      </p>
                    )}
                  </div>
                  <Button
                    moreClass="uppercase text-white w-full mt-7"
                    text="Get Otp"
                    type="submit"
                  ></Button>
                  <p className="flex justify-center my-6">
                    <span className="text-gray-400">Create an account, </span>
                    &nbsp;
                    <Link
                      to={ADMIN_ROUTE_MAP.loginModule.register}
                      className="text-primary-700"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </>
            )}
            {enableOtp && (
              <>
                <form
                  onSubmit={handleSubmit((data) => {
                    verifyOtp(data);
                  })}
                  noValidate
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp" text="Enter OTP" required></Label>
                    <input
                      type="otp"
                      name="otp"
                      id="otp"
                      placeholder="0-0-0-0-0-0"
                      {...register("otp", {
                        required: true,
                        pattern: /^\d{1,6}$/i,
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      noValidate
                    />
                    {errors?.otp?.type === "required" && (
                      <p className="text-red-500 mt-2 text-sm">
                        This field is required
                      </p>
                    )}
                    {errors?.otp?.type === "pattern" && (
                      <p className="text-red-500 mt-2 text-sm">
                        Please enter 6 digit otp
                      </p>
                    )}
                  </div>
                  <Button
                    moreClass="uppercase w-full mt-7"
                    text="Sign in"
                    type="submit"
                  ></Button>
                  <p className="flex justify-center my-6">
                    <span
                      className="text-primary-700"
                      onClick={() => {
                        setEnableOtp(false);
                      }}
                    >
                      Go back, re-enter the mobile number
                    </span>
                  </p>
                </form>
              </>
            )}
          </div>
        </Card>
      </>
    );
  }
  return null;
};

export default AdminLogin;
