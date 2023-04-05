import React, { useEffect, useState } from "react";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";

import { getUpcomingAssessments } from "../api";
import { readableDate } from "./../utils/common";

const UpcomingMedicalAssessments = () => {
  
  const [inspectionData, setInspectionData] = useState();
  const getData = async () => {
    const postData = {
      "date" : new Date().toJSON().slice(0, 10)
    };

    try {
      const res = await getUpcomingAssessments(postData);
      console.log('res - ', res);
      if (res?.data?.assessment_schedule?.length) {
        setInspectionData(res.data.assessment_schedule);
      } else {
        setInspectionData([]);
      }
    } catch(error) {
      console.log('error - ', error);
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CommonLayout back={ROUTE_MAP.root} logoutDisabled pageTitle="Upcoming Inspections">
      <div className={`flex flex-col px-6 h-[calc(100vh-214px)] overflow-y-auto gap-4 pb-5 ${!inspectionData?.length ? 'justify-center' : '' }` }>
        { 
          inspectionData?.length ? (
            inspectionData.map((el, idx) => {
              return <div className="flex flex-col bg-tertiary w-full p-7 rounded-[8px] gap-3" key={idx}>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="text-1xl lg:text-4xl text-gray-600" />
                    <div className="text-gray-500">District</div>
                  </div>
                  <div className="text-secondary text-[18px] font-medium">{ el.institute?.district || 'NA' }</div>
                </div>
                <hr className="border-slate-300" />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-1xl lg:text-4xl text-gray-600" />
                    <div className="text-gray-500">Scheduled on</div>
                  </div>
                  <div className="text-secondary text-[18px] font-medium">{ readableDate(el.date) || 'NA' }</div>
                </div>
              </div>
            })
          ) : (
            <div className="flex flex-col">
              <div className="w-full bg-tertiary p-7 rounded-[8px]">
                <div className="text-secondary text-[24px] text-center font-medium">No Upcoming Inspections found!</div>
              </div>
            </div>
          )
        }
      </div>
    </CommonLayout>
  );
};

export default UpcomingMedicalAssessments;
