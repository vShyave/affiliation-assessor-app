import React from "react";
import { MdDashboard , MdOutlineStickyNote2 , MdLibraryBooks , MdPlaylistAddCheck , MdBook} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa"
// import Header from "./Header";
import Table from "./Table";
import FilteringTable from "./FilteringTable";
import PaginationTable from "./PaginationTable";


export default function OnGroundInspectionAnalysis() {
  return (
        <>
            {/* <Header/> */}
            <div className="bg-gray-100 flex flex-col w-full h-full">
                <div className="container mx-auto">
                    <div className="flex flex-col py-8">
                        <h1 className="text-2xl font-medium">
                            Your activity
                        </h1>
                    </div>
                    <div className="container mx-auto">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-8 border shadow-md p-2 bg-white w-[200px] h-[100px] rounded-[4px]">
                                <div className="flex flex-col place-items-start justify-center gap-2">
                                    
                                    <h3 className="text-xl mt-2 font-medium">12</h3>
                                    <p className="text-sm font- text-gray-700">Total pending</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 border shadow-md p-2 bg-white w-[200px] h-[100px] rounded-[4px]">
                                <div className="flex flex-col place-items-start justify-center gap-2">
                                    
                                    <h3 className="text-xl mt-2 font-medium">8</h3>
                                    <p className="text-sm font-normal text-gray-700">Received today</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 border shadow-md p-2 bg-white w-[200px] h-[100px] rounded-[4px]">
                                <div className="flex flex-col place-items-start justify-center gap-2">
                                    
                                    <h3 className="text-xl mt-2 font-medium">2</h3>
                                    <p className="text-sm text-gray-700">In progress</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 border shadow-md p-2 bg-white w-[200px] h-[100px] rounded-[4px]">
                                <div className="flex flex-col place-items-start justify-center gap-2">
                                    
                                    <h3 className="text-xl mt-2 font-medium">3</h3>
                                    <p className="text-sm text-gray-700">Reviewed today</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 border shadow-md p-2 bg-white w-[200px] h-[100px] rounded-[4px]">
                                <div className="flex flex-col place-items-start justify-center gap-2">
                                    
                                    <h3 className="text-xl mt-2 font-medium">312</h3>
                                    <p className="text-sm text-gray-700">Reviewed in total</p>
                                </div>
                            </div>
                        </div>
                        <div className="container mx-auto">
                            <div className="flex flex-col py-6">
                                <h1 className="text-2xl font-medium">
                                    All applications
                                </h1>
                            </div>
                
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900" >
                                        Select Round
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="role"
                                        name="role"
                                        className="block w-full rounded-md border-0 py-3 p-2 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option >Round one</option>
                                            <option>Round two</option>
                                        </select>
                                    </div>
                                </div> 
                            </div>      
                        </div>
                                        
                        <div className=" mx-auto">
                            <div className="flex flex-col mt-8">
                                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                    <ul className="flex flex-wrap -mb-px">
                                        <li className="mr-2">
                                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">New</a>
                                        </li>
                                        <li className="mr-2">
                                            <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-600" aria-current="page">Approved</a>
                                        </li>
                                        <li className="mr-2">
                                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Rejected</a>
                                        </li>
                                        
                                        {/* <li>
                                            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                                        </li> */}
                                    </ul>
                                </div>
                                {/* <div>create a search bar and filter component here</div> */}
                                {/* table creation starts here */}
        
                                <div className="container mt-8 mx-auto">
                                    <div className="flex flex-col">
                                        <div className="text-2xl mt-4 font-medium">
                                            {/* <Table/> */}
                                            <FilteringTable/>
                                            {/* <PaginationTable/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>     
        </>
   );
 }
