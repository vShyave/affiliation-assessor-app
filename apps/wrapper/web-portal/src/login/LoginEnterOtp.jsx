import React from "react";
import Group from "../utils/assets/Group.png";
import Nirmaya from "../utils/assets/Nirmaya.png";



export default function LoginEnterOtp() {
                  return (
                            <>
                                <div className="bg-gray-100 flex flex-col py-16 w-full h-screen">
                                    <div className="flex flex-col container items-center mx-auto">
                                        <div className="flex flex-col py-12">
                                        <div className="flex flex-row gap-4">
                                                <img className="logo" src={Group} alt="logo1" />
                                                <div
                                                  className="inline-block h-[72px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50">                                             
                                              </div>
                                                <img className="logo" src={Nirmaya} alt="logo2" />
                                            </div>
                                        </div>
                                         <div className="flex container justify-center py-8 mx-auto">
                                            <div className="flex flex-col items-center shadow-md bg-white w-[624px] h-[400px]">
                                                    <h1 className="text-2xl font-medium p-6 font-md">
                                                            Login
                                                    </h1>
                                                <div className="sm:col-span-4">
                                                  <label htmlFor="email" className="p-2 block mt-6 text-left leading-6 text-gray-800">
                                                    Enter OTP
                                                  </label>
                                                    <div className="p-2">
                                                           <input
                                                           id="email"
                                                           placeholder="0-0-0-0-0-0"
                                                           className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                          />
                                                          <p className="p-2  text-sm text-gray-400">Enter the 6 digit OTP sent to your email address</p>
                                                        <button className="mt-4 border border-blue-900 text-white bg-blue-900 w-[400px] py-3 font-medium rounded-[4px]">SIGN IN</button>
                                                        <p className="p-4 font-medium text-blue-700 text-center">Go back, re-enter the email</p>
                                                   </div>
                                              </div> 
                                         </div>                                     
                                    </div>
                                </div>
                            </div>
                          </>
                         );
                       }
