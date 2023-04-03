import React from 'react'
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import { getMedicalAssessmentsUpcoming } from "../api";


const PastInspections = () => {
    return (
        <CommonLayout back={ROUTE_MAP.root} logoutDisabled pageTitle="Past Inspections">
            <div className="flex flex-col px-6">
                <div className="flex flex-col bg-tertiary w-full p-7 rounded-[8px] gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl lg:text-4xl text-gray-600" />
                            <div className="text-gray-500">Completed on</div>
                        </div>
                        <div className="text-secondary text-[18px] font-medium">22 March 2023</div>
                    </div>
                    <hr className="border-slate-300" />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faBuilding} className="text-1xl lg:text-4xl text-gray-600" />
                            <div className="text-gray-500">Applicant name</div>
                        </div>
                        <div className="text-secondary text-[18px] font-medium">Delhi Public School</div>
                    </div>
                    <hr className="border-slate-300" />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                            <div className="text-gray-500">District</div>
                        </div>
                        <div className="text-secondary text-[18px] font-medium">Lucknow</div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}

export default PastInspections;
