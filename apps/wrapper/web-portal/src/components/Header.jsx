import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

import { AiOutlineMenu, AiOutlineClose, AiFillHome } from "react-icons/ai";

import { setCookie, getCookie, removeCookie } from "../utils/common";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";

// import SelfRegistration from "./SelfRegistration";
// import Congratulations from "./Congratulations";
// import Cards from "./Cards";
// import AdminDashboard from "./AdminHome";
// import AdminLogin from "./AdminLogin";
// import EnterOtp from "./EnterOtp";
// import AdminCreateUser from "./AdminCreateUser";
// import AdminUserDetails from "./AdminUserDetails";
// import AdminSignUp from "./AdminSignUp";
// import LoginEnterOpt from "./LoginEnterOtp";
// import AdminManageForms from "./AdminManageForms";
// import AdminCreateForm from "./AdminCreateForm";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [userInfoChars, setUserInfoChars] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    removeCookie("userData");
    removeCookie("regulator");
    navigate(ADMIN_ROUTE_MAP.loginModule.login);
  };

  useEffect(() => {
    const isAuthenticated = getCookie("regulator");
    if (!isAuthenticated) return;
    const name = isAuthenticated[0]?.full_name;
    const firstName = name?.split(" ")[0].charAt(0).toUpperCase();
    const lastName = name
      ?.split(" ")
      [name.split(" ").length - 1].charAt(0)
      .toUpperCase();
    const chars = firstName + lastName;
    setUserInfoChars(chars);
  }, []);

  return (
    <>
      <div className="relative min-h-[148px] z-10">
        <div className="top-0 fixed left-0 right-0 bg-white">
          <div className="container py-2 px-3 mx-auto">
            <div className="flex flex-row">
              <div className="flex grow">
                <img src="/images/upsmf.png" alt="logo" className="h-[84px]" />
              </div>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="border-green-500 bg-green-500 inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                    }}
                  >
                    {userInfoChars}
                  </button>
                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div class="py-1" role="none">
                        <button
                          type="button"
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-3"
                          onClick={logout}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="container px-3 mx-auto">
            <div className="flex items-center h-[48px] py-2">
              {/* <div className="flex bg-white hidden md:contents"> */}
              <ul className="flex md nav-items text-gray-500 text-[14px] font-bold uppercase gap-4 justify-center align-center menus">
                <li className="flex bg-primary-800 rounded-md items-center justify-center h-8 w-8 hover:cursor-pointer">
                  <NavLink to={ADMIN_ROUTE_MAP.adminModule.dashboard}>
                    <AiFillHome className="text-white text-xl" />
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  {/* <NavLink to="/">Dashboard</NavLink> */}
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink to={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}>
                    Manage Users
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink to={ADMIN_ROUTE_MAP.adminModule.manageForms.home}>
                    Manage Forms
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home}
                  >
                    Desktop Analysis
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home}
                  >
                    On Ground Inspection Analysis
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.certificateManagement.list}
                  >
                    Certificate Management
                  </NavLink>
                </li>
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.list}
                  >
                    Schedule Management
                  </NavLink>
                </li>
              </ul>
              {/* </div> */}

              {/* <ul className={`nav-items duration-500 font-bold md:hidden flex flex-col text-gray-600 p-4 bg-gray-200 fixed w-4/5 h-screen left-0 top-[100px] gap-10 ${toggle ? "left-[0%]" : "left-[-100%]"} `}>
                                <Link to="/">
                                    <li className="bg-primary-800 rounded-md flex items-center justify-center h-8 w-8 hover:cursor-pointer"><AiFillHome className="text-white text-xl"/></li>
                                </Link>
                                <Link>
                                    <li className="hover:text-primary-600 hover:cursor-pointer">DASHBOARD</li>
                                </Link>
                                <Link to="/Admincreateuser">
                                    <li className="hover:text-primary-600 hover:cursor-pointer">MANAGE USERS</li>
                                </Link>
                                <Link to="Adminmanageform">
                                    <li className="hover:text-primary-600 hover:cursor-pointer">MANAGE FORMS</li>
                                </Link>
                                <Link>
                                    <li className="hover:text-primary-600 hover:cursor-pointer">VERIFICATION ANALYSIS</li>
                                </Link>
                                <Link>
                                    <li className="hover:text-primary-600 hover:cursor-pointer">ON GROUND INSPECTION ANALYSIS</li>
                                </Link>
                                <Link>
                                    <li className="hover:text-primary-600 hover:cursor-pointer">CERTIFICATE ISSUANCE</li>
                                </Link>
                            </ul>
                            {
                                toggle ? (
                                    <AiOutlineClose onClick={() => { setToggle(!toggle) }} className="flex mx-auto mr-5 text-2xl  text-gray-800 md:hidden block" />
                                ) : (
                                    <AiOutlineMenu onClick={() => { setToggle(!toggle) }} className="flex mx-auto mr-5 text-2xl text-gray-800  md:hidden block" />
                                )
                            } */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto h-[64px] flex justify-between items-center">
                <div className="flex bg-white hidden md:contents">
                    <ul className="flex md nav-items text-gray-500 gap-4">
                        <Link to="/">
                            <li className="bg-primary-800 rounded-md flex items-center justify-center h-8 w-8 hover:cursor-pointer"><AiFillHome className="text-white text-xl"/></li>
                        </Link>
                        <Link>
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">DASHBOARD</li>
                        </Link>
                        <Link to="/Admincreateuser">
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">MANAGE USERS</li>
                        </Link>
                        <Link to="/Adminmanageform">
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">MANAGE FORMS</li>
                        </Link>
                        <Link to="/Admindesktopanalysis">
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">DESKTOP ANALYSIS</li>
                        </Link>
                        <Link to="/Adminongroundinspectionanalysis">
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">ON GROUND INSPECTION ANALYSIS</li>
                        </Link>
                        <Link>
                            <li className="hover:text-primary-600 hover:cursor-pointer font-medium">CERTIFICATE ISSUANCE</li>
                        </Link>
                    </ul>
                </div>

                <ul className={`nav-items duration-500 font-bold md:hidden flex flex-col text-gray-600 p-4 bg-gray-200 fixed w-4/5 h-screen left-0 top-[100px] gap-10 ${toggle ? "left-[0%]" : "left-[-100%]"} `}>
                    <Link to="/">
                        <li className="bg-primary-800 rounded-md flex items-center justify-center h-8 w-8 hover:cursor-pointer"><AiFillHome className="text-white text-xl"/></li>
                    </Link>
                    <Link>
                        <li className="hover:text-primary-600 hover:cursor-pointer">DASHBOARD</li>
                    </Link>
                    <Link to="/Admincreateuser">
                        <li className="hover:text-primary-600 hover:cursor-pointer">MANAGE USERS</li>
                    </Link>
                    <Link to="Adminmanageform">
                        <li className="hover:text-primary-600 hover:cursor-pointer">MANAGE FORMS</li>
                    </Link>
                    <Link>
                        <li className="hover:text-primary-600 hover:cursor-pointer">VERIFICATION ANALYSIS</li>
                    </Link>
                    <Link>
                        <li className="hover:text-primary-600 hover:cursor-pointer">ON GROUND INSPECTION ANALYSIS</li>
                    </Link>
                    <Link>
                        <li className="hover:text-primary-600 hover:cursor-pointer">CERTIFICATE ISSUANCE</li>
                    </Link>
                </ul>
                {
                    toggle ? (
                        <AiOutlineClose onClick={() => { setToggle(!toggle) }} className="flex mx-auto mr-5 text-2xl  text-gray-800 md:hidden block" />
                    ) : (
                        <AiOutlineMenu onClick={() => { setToggle(!toggle) }} className="flex mx-auto mr-5 text-2xl text-gray-800  md:hidden block" />
                    )
                }
            </div> */}
    </>
  );
}
