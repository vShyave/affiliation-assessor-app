import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css"

import { AiOutlineMenu, AiOutlineClose,AiFillHome } from "react-icons/ai";

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
    const [userInfoChars, setUserInfoChars] = useState("")

    useEffect(() => {
        const name = "akansh dhyani" 
        const firstName = (name.split(" ")[0].charAt(0).toUpperCase())
        const lastName = (name.split(" ")[name.split(" ").length-1].charAt(0).toUpperCase())
        const chars = firstName + lastName;
        setUserInfoChars(chars)
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
                            <div className="flex grow justify-end items-center">
                                <div className="border bg-green-800 w-[36px] h-[32px] p-1 rounded-[4px] font-bold text-[14px]">
                                    <p className="text-white text-center tracking-[1px]">{userInfoChars}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="container px-3 mx-auto">
                        <div className="flex items-center h-[48px] py-2">
                            {/* <div className="flex bg-white hidden md:contents"> */}
                            <ul className="flex md nav-items text-gray-500 text-[14px] font-bold uppercase gap-4 justify-center align-center menus">
                                <li className="flex bg-primary-800 rounded-md items-center justify-center h-8 w-8 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.dashboard}><AiFillHome className="text-white text-xl"/></Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.manageUsers.home}>Manage Users</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.manageForms.home}>Manage Forms</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.list}>Desktop Analysis</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.list}>On Ground Inspection Analysis</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.certificateManagement.list}>Certificate Management</Link>
                                </li>
                                <li className="flex hover:text-primary-600 hover:cursor-pointer">
                                    <Link to={ADMIN_ROUTE_MAP.adminModule.scheduleManagement.list}>Schedule Management</Link>
                                </li>
                            </ul>
                            {/* </div> */}

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
