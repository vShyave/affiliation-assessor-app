import React, { useState } from 'react'
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import { getMedicalAssessmentsUpcoming } from "../api";


const PastInspections = () => {

    const inspection_data = [{
        institute: {
            name: 'RYMEC',
            district: 'Ballari',
        },
        date: '24 March 2023'
    },
    {
        institute: {
            name: 'SLN',
            district: 'Raichur',
        },
        date: '24 Feb 2023'
    },
    {
        institute: {
            name: 'DBIT',
            district: 'Bengaluru',
        },
        date: '24 Feb 2023'
    },
    {
        institute: {
            name: 'PDIT',
            district: 'Vijayanagara',
        },
        date: '24 Feb 2023'
    }];
    const [inspectionData, setInspectionData] = useState(inspection_data);

    return (
        <CommonLayout back={ROUTE_MAP.root} logoutDisabled pageTitle="Past Inspections">
            <div className={`flex flex-col px-6 h-[calc(100vh-214px)] overflow-y-auto gap-4 pb-5 ${!inspectionData?.length ? 'justify-center' : '' }`}>
                { 
                    inspectionData?.length ? (
                        inspectionData.map((el, idx) => {
                            return <div className="flex flex-col bg-tertiary w-full p-7 rounded-[8px] gap-3" key={idx}>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl lg:text-4xl text-gray-600" />
                                        <div className="text-gray-500">Completed on</div>
                                    </div>
                                    <div className="text-secondary text-[18px] font-medium">{ el.date || 'NA' }</div>
                                </div>
                                <hr className="border-slate-300" />
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <FontAwesomeIcon icon={faBuilding} className="text-1xl lg:text-4xl text-gray-600" />
                                        <div className="text-gray-500">Applicant name</div>
                                    </div>
                                    <div className="text-secondary text-[18px] font-medium">{ el.institute.name || 'NA' }</div>
                                </div>
                                <hr className="border-slate-300" />
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                                        <div className="text-gray-500">District</div>
                                    </div>
                                    <div className="text-secondary text-[18px] font-medium">{ el.institute.district || 'NA' }</div>
                                </div>
                            </div>
                        })
                    ) : (
                        <div className="flex flex-col">
                            <div className="w-full bg-tertiary p-7 font-medium rounded-[8px]">
                                <div className="text-secondary text-[24px] text-center">Couldn't able to find Past Inspections Data</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </CommonLayout>
    );
}

export default PastInspections;
