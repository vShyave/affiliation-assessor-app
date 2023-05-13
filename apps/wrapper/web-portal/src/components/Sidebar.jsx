import React from "react";

export default function Sidebar() {
    return (
            <div className="flex flex-col h-screen w-full">
                    <ul className="flex flex-col text-sm font-medium">
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Institution details</span>
                        </li>
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Application details</span>
                        </li>
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Form details - part 1</span>
                        </li>
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Form details - part 2</span>
                        </li>
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Related Photographs</span>
                        </li>
                        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
                            <span>Application fee &amp; Inspection fee details</span>
                        </li>
                    </ul>
                </div>
            )
        }