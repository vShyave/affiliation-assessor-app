import React from "react";

export default function Sidebar() {
    return (
            <div className="flex flex-col h-screen w-80">
                    <ul className="flex flex-col gap-4 text-sm font-medium">
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="#">
                                <span>Institution details</span>
                            </a>
                        </li>
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="#">
                                <span>Application details</span>
                            </a>
                        </li>
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="#">
                                <span>Form details- part 1</span>
                            </a>
                        </li>
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="">
                                <span>Form details- part 2</span>
                            </a>
                        </li>
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="#">
                                <span>Related Photographs</span>
                            </a>
                        </li>
                        <li className="p-4 hover:bg-gray-200 hover:border-4 border-l-blue-700 hover:font-bold">
                            <a href="#">
                                <span>Application fee & Inspection fee details</span>
                            </a>
                        </li>
                    </ul>
                </div>
            )
        }