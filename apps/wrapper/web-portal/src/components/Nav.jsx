import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./Header.css";

import { AiFillHome } from "react-icons/ai";

import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";

export default function Nav() {

  return (
    <>
        <div className="h-[48px] bg-white drop-shadow-sm">
          <div className="container px-3 mx-auto">
            <div className="flex items-center h-[48px] py-2">
              {/* <div className="flex bg-white hidden md:contents"> */}
              <ul className="flex md nav-items text-gray-500 text-[14px] font-bold uppercase gap-4 justify-center align-center menus">
                <li className="flex bg-primary-800 rounded-md items-center justify-center h-8 w-8 hover:cursor-pointer">
                  <NavLink to={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}>
                    <AiFillHome className="text-white text-xl" />
                  </NavLink>
                </li>
                {/* <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink to={ADMIN_ROUTE_MAP.adminModule.dashboard}>Dashboard</NavLink>
                </li> */}
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
                {/* <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.certificateManagement.home }
                  >
                    Certificate Management
                  </NavLink>
                </li> */}
                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                  <NavLink
                    to={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.home}
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
            </div>
          </div>
        </div>
      
      
    </>
  );
}
