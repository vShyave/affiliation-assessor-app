import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";

import { FaAngleRight } from "react-icons/fa";

import { useForm } from "react-hook-form";

import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { Button, Label } from "../../components";

import {
  createBulkUserHasura,
  createBulkUsersKeyCloak,
  editUserHasura,
  editUserKeycloak,
  getSpecificUser,
} from "./../../api";
import { userService } from "../../api/userService";
import { removeCookie, setCookie } from "../../utils";
import Toast from "../../components/Toast";

export default function AdminCreateUser() {
  let { userId } = useParams();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    // role: "",
  });
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  const navigation = useNavigate();

  const fetchUser = async () => {
    const res = await getSpecificUser({ userId });
    setUser({
      firstname:
        res.data.assessors[0]["fname"] || res.data.assessors[0]["name"],
      lastname: res.data.assessors[0]["lname"],
      email: res.data.assessors[0]["email"],
      phonenumber: res.data.assessors[0]["phonenumber"],
      // role: res.data.assessors[0]["role"],
    });
  };

  const handleChange = (name, value) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFieldsValid = () => {
    if (
      user.firstname === "" ||
      user.lastname === "" ||
      user.email === "" ||
      user.phonenumber === "" ||
      user.phonenumber.length > 10 ||
      user.phonenumber.length < 10
    ) {
      return false;
    } else return true;
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    let errorFlag = false
    let accessTokenObj = {
      grant_type: "client_credentials",
      client_id: "admin-api",
      client_secret: "edd0e83d-56b9-4c01-8bf8-bad1870a084a",
    };
    //Access Token API call
    const accessTokenResponse = await userService.getAccessToken(
      accessTokenObj
    );
    setCookie(
      "access_token",
      "Bearer " + accessTokenResponse?.data?.access_token
    );
    if(accessTokenResponse.status!==200){
      errorFlag=true
    }

    if (userId) {
      //for edit user
      
      try {
        let postDataKeyCloak = {
          username: user.email,
          firstName: user.firstname,
          lastName: user.lastname,
          roleNames: ["Assessor", "default-roles-ndear"],
        };
        //keycloak edit user
        const singleEditKeycloak = await editUserKeycloak(postDataKeyCloak);
        if(singleEditKeycloak.status!==200){
          errorFlag=true
        }

        //hasura edit user
        let postDataHasura = {
          user_id: userId,
          fname: user.firstname,
          lname: user.lastname,
          full_name: user.firstname + " " + user.lastname,
          phno: user.phonenumber,
        };
        const singleEditHasura = await editUserHasura(postDataHasura);
        if(singleEditHasura.status!==200){
          errorFlag=true
        }
        if (!errorFlag) {
          setToast((prevState) => ({
            ...prevState,
            toastOpen: true,
            toastMsg: "User updated successfully!",
            toastType: "success",
          }));
          setTimeout(
            () =>
              {setToast((prevState) => ({
                ...prevState,
                toastOpen: false,
                toastMsg: "",
                toastType: "",
              }));
            },
            3000
          );
        }

      } catch (error) {
        console.log(error);
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Error occured while updating user!",
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
    } else {
      // for create user
      let postDataKeyCloak = [];

      let postDataHasura = {
        assessors: [],
        regulators: [],
      };

      try {
        postDataKeyCloak = [
          {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            username: user.email,
            password: "rkr",
            roleName: "Assessor",
          },
        ];

        //keycloak API call
        const keycloakRes = await createBulkUsersKeyCloak(postDataKeyCloak);

        if(keycloakRes?.data?.failedUser.length){
          errorFlag=true
        }

        //Hasura API call

        postDataHasura["assessors"].push({
          code: `${Math.floor(1000 + Math.random() * 9000)}`,
          user_id: keycloakRes.data.succeedUser.filter(
            (item) => item.email === user.email
          )[0].userId,
          email: user.email,
          name: user.firstname + " " + user.lastname,
          phonenumber: user.phonenumber,
          fname: user.firstname,
          lname: user.lastname,
        });

        const hasuraRes = await createBulkUserHasura(postDataHasura);
        if(hasuraRes.status!==200){
          errorFlag=true
        }
        if (!errorFlag) {
          setToast((prevState) => ({
            ...prevState,
            toastOpen: true,
            toastMsg: "User created successfully!",
            toastType: "success",
          }));
          setTimeout(
            () =>
              {setToast((prevState) => ({
                ...prevState,
                toastOpen: false,
                toastMsg: "",
                toastType: "",
              }));
              navigation(ADMIN_ROUTE_MAP.adminModule.manageUsers.home);
            },
            3000
          );
        }
      } catch (error) {
        console.log("error - ", error);
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Error occured while creating user!",
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
    }
    removeCookie("access_token");
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      {/* Breadcrum */}
      {/* <Breadcrumb data={breadCrumbData} /> */}
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}

      <div className="h-[48px] bg-white flex justify-start drop-shadow-sm">
        <div className="container mx-auto flex px-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}>
              <span className="text-primary-400 cursor-pointer">
                Manage Users
              </span>
            </Link>
            <FaAngleRight className="text-gray-500 text-[16px]" />
            <Link to={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}>
              <span className="text-gray-500">Create user</span>
            </Link>
            {/* <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500 uppercase">User details</span> */}
          </div>
        </div>
      </div>
      <div>
        <div
          className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}
        >
          <form>
            <div className="flex flex-row mb-4 justify-between">
              <h1 className="text-2xl font-bold">User details</h1>
            </div>
            <div className="flex flex-row justify-between bg-white h-[560px] rounded-[4px] p-8 mx-auto">
              <div className="w-1/2">
                <h1 className="text-xl font-semibold">User details</h1>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="firstname"
                      text="First name"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Type here"
                        id="firstname"
                        name="firstname"
                        defaultValue={user.firstname}
                        onChange={(e) =>
                          handleChange("firstname", e.target.value)
                        }
                        // disabled={userId?true:false}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <Label htmlFor="lastname" text="Last name" required></Label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Type here"
                        name="lastname"
                        id="lastname"
                        defaultValue={user.lastname}
                        onChange={(e) =>
                          handleChange("lastname", e.target.value)
                        }
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // disabled={userId?true:false}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Label htmlFor="email" text="Email Id" required></Label>
                    <div className="mt-2">
                      <input
                        type="email"
                        placeholder="Type here"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={userId ? true : false}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <Label
                      htmlFor="phonenumber"
                      text="Phone number"
                      required
                    ></Label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        placeholder="Type here"
                        name="phonenumber"
                        id="phonenumber"
                        defaultValue={user.phonenumber}
                        onChange={(e) =>
                          handleChange("phonenumber", e.target.value)
                        }
                        // disabled={userId?true:false}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                {/** TODO: role to be taken later for v2 */}
                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 ">
                    <Label htmlFor="role" text="Role" required></Label>
                    <div className="mt-2">
                      <Select
                        name="role"
                        id="role"
                        label="Select here"
                        defaultValue={user.role}
                        onChange={(value) => handleChange("role",value)}
                        // disabled={userId?true:false}
                      >
                        <Option value="admin">Admin</Option>
                        <Option value="applicant">Applicant</Option>
                        <Option value="assessor">Assessor</Option>
                      </Select>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="footer flex flex-row gap-4 justify-end">
                  <Button
                    onClick={() => {
                      navigation(ADMIN_ROUTE_MAP.adminModule.manageUsers.home);
                    }}
                    moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                    text="Cancel"
                  ></Button>

                  <Button
                    moreClass="border text-white w-[120px]"
                    text={!userId ? "Submit" : "Save"}
                    otherProps={{
                      disabled: !isFieldsValid(),
                    }}
                    onClick={submitUserData}
                  ></Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
