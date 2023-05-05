import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SelfRegistration from "./SelfRegistration";
import Congratulations from "./Congratulations";
import Cards from "./Cards";
import AdminDashboard from "./AdminHome";
import AdminLogin from "./AdminLogin";
import EnterOtp from "./EnterOtp";
import AdminCreateUser from "./AdminCreateUser";
import AdminUserDetails from "./AdminUserDetails";
import AdminSignUp from "./AdminSignUp";
import LoginEnterOpt from "./LoginEnterOtp";
import AdminManageForms from "./AdminManageForms";
import AdminCreateForm from "./AdminCreateForm";


import { AiOutlineMenu, AiOutlineClose,AiFillHome } from "react-icons/ai";

import Group from "../utils/assets/Group.png";
import Nirmaya from "../utils/assets/Nirmaya.png";



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
                <div className="container py-2 mx-auto h-[100px]">
                    <div className="flex flex-row justify-center justify-between bg-white">
                        <div className="flex flex-row gap-4">
                            <img className="logo" src={Group} alt="logo1" />
                              <div
                                className="inline-block h-[76px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50">                                             
                              </div>
                            <img className="logo" src={Nirmaya} alt="logo1" />
                        </div>
                            <div>
                                <div className="border bg-green-800 mt-6 w-[30px] md:h-[25px] rounded-[4px]">
                                <p className="text-white  text-center">{userInfoChars}</p>
                            </div>
                        </div>
                    </div>
                </div>
{/*                                 <div className="bg-gray-200 rounded-full flex items-center justify-center h-12 w-12">
 */}
            <hr/>
                <div className="container mx-auto h-[64px] flex justify-between items-center">
                    <div className="flex bg-white hidden md:contents">
                        <ul className="flex md nav-items text-gray-500 gap-4">
                            <Link to="/">
                            <li className="bg-blue-800 rounded-md flex items-center justify-center h-8 w-8 hover:cursor-pointer"><AiFillHome className="text-white text-xl"/></li>
                            </Link>
                            <Link>
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">DASHBOARD</li>
                            </Link>
                            <Link to="/Admincreateuser">
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">MANAGE USERS</li>
                            </Link>
                            <Link to="/Adminmanageform">
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">MANAGE FORMS</li>
                            </Link>
                            <Link to="/Admindesktopanalysis">
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">DESKTOP ANALYSIS</li>
                            </Link>
                            <Link to="/Adminongroundinspectionanalysis">
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">ON GROUND INSPECTION ANALYSIS</li>
                            </Link>
                            <Link>
                            <li className="hover:text-blue-600 hover:cursor-pointer font-medium">CERTIFICATE ISSUANCE</li>
                            </Link>

                        </ul>
                    </div>

        {/* Responsive */}

                            <ul
                            className={`nav-items duration-500 font-bold md:hidden flex flex-col text-gray-600 p-4 bg-gray-200 fixed w-4/5 h-screen left-0 top-[100px] gap-10
                            ${toggle ? "left-[0%]" : "left-[-100%]"} `}>
                                <Link to="/">
                                <li className="bg-blue-800 rounded-md flex items-center justify-center h-8 w-8 hover:cursor-pointer"><AiFillHome className="text-white text-xl"/></li>
                                </Link>
                                <Link>
                                <li className="hover:text-blue-600 hover:cursor-pointer">DASHBOARD</li>
                                </Link>
                                <Link to="/Admincreateuser">
                                <li className="hover:text-blue-600 hover:cursor-pointer">MANAGE USERS</li>
                                </Link>
                                <Link to="Adminmanageform">
                                <li className="hover:text-blue-600 hover:cursor-pointer">MANAGE FORMS</li>
                                </Link>
                                <Link>
                                <li className="hover:text-blue-600 hover:cursor-pointer">VERIFICATION ANALYSIS</li>
                                </Link>
                                <Link>
                                <li className="hover:text-blue-600 hover:cursor-pointer">ON GROUND INSPECTION ANALYSIS</li>
                                </Link>
                                <Link>
                                <li className="hover:text-blue-600 hover:cursor-pointer">CERTIFICATE ISSUANCE</li>
                                </Link>
                            </ul>
                            {toggle ? (
                             <AiOutlineClose
                             onClick={() => {
                             setToggle(!toggle);
                             }}
                             className="flex mx-auto mr-5 text-2xl  text-gray-800 md:hidden block"
                             />
                                 ) : (
                             <AiOutlineMenu
                              onClick={() => {
                              setToggle(!toggle);
                              }}
                              className="flex mx-auto mr-5 text-2xl text-gray-800  md:hidden block"
                             />
                          )}
                    </div>
               </>
             );
           }
