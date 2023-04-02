import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faCalendar, faCalendarDay, faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import { getMedicalAssessmentsUpcoming } from "../api";
import ROUTE_MAP from "../routing/routeMap";

const UpcomingMedicalAssessments = () => {
  const [inspectionData, setInspectionData] = useState();

  const getData = async () => {
    const res = await getMedicalAssessmentsUpcoming();
    console.log('res - ', res);
    if (res?.data?.assessment_schedule?.length)
      setInspectionData(res.data.assessment_schedule);
    else setInspectionData([]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CommonLayout back={ROUTE_MAP.root} logoutDisabled pageTitle="Upcoming Inspections" iconType="backArrow">
      <div className={`flex flex-col px-6 h-full ${!inspectionData?.length ? 'justify-center' : '' }` }>
        { 
          inspectionData?.length ? (
            inspectionData.map((el, idx) => {
              return <div className="w-full bg-tertiary flex flex-col p-7 lg:w-[90%] font-medium overflow-scroll rounded-[8px] mb-8" key={idx}>
                <div className="flex flex-col pb-4">
                  <div className="flex flex-row">
                    <div>
                      <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                    </div>
                    <div className="text-gray-500 ml-2">District</div>
                  </div>
                  <div className="mt-2 text-secondary text-[18px]">{ el.institute?.district || 'NA' }</div>
                </div>
                <hr className="border-slate-400" />
                <div className="flex flex-col pt-4">
                  <div className="flex flex-row">
                    <div>
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl lg:text-4xl text-gray-600" />
                    </div>
                    <div className="text-gray-500 ml-2">Scheduled on</div>
                  </div>
                  <div className="mt-2 text-secondary text-[18px]">{ el.date || 'NA' }</div>
                </div>
              </div>
            })
          ) : (
            <div className="flex flex-col">
              <div className="w-full bg-tertiary flex flex-col p-7 lg:w-[90%] font-medium overflow-scroll rounded-[8px]">
                <div className="text-secondary text-[24px] text-center">No data found!</div>
              </div>
            </div>
          )
        }
      </div>
    </CommonLayout>
  );
};

export default UpcomingMedicalAssessments;
