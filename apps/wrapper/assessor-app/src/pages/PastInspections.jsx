import React, { useState } from "react";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";

import { getPastInspections } from "../api";
import { readableDate } from "./../utils/common";
import { getSpecificDataFromForage, setToLocalForage } from "./../utils";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const PastInspections = () => {
  const navigate = useNavigate();
  const [inspectionData, setInspectionData] = useState([]);
  let current_assessor_id = ""

  const getPastInspectionData = async () => {
    const assessor_id = await getSpecificDataFromForage("required_data");
    const postData = {
      // date: new Date().toJSON().slice(0, 10),
      date: new Date("2023-06-15").toJSON().slice(0,10),
      assessor_id: assessor_id?.assessor_user_id,
    };
    current_assessor_id=assessor_id?.assessor_user_id

    try {
      const res = await getPastInspections(postData);
      if (res?.data?.assessment_schedule?.length) {
        setInspectionData(res.data.assessment_schedule);
        setToLocalForage("past_inspections",{"assessment_schedule":res.data.assessment_schedule})
      } else {
        setInspectionData([]);
      }
    } catch (error) {
      console.log("error - ", error);
      alert(error);
    }
  };

  const handleClick = (route) =>{
    navigate(route)
  }

  useState(() => {
    getPastInspectionData();
  }, []);

  return (
    <CommonLayout
      back={ROUTE_MAP.root}
      logoutDisabled
      pageTitle="Past Inspections"
    >
      <div
        className={`flex flex-col px-6 h-[calc(100vh-214px)] overflow-y-auto gap-4 pb-5 ${
          !inspectionData?.length ? "justify-center" : ""
        }`}
      >
        {inspectionData?.length ? (
          inspectionData.map((el, idx) => {
            return (
              <div
                className="flex flex-col bg-tertiary w-full p-7 rounded-[8px] gap-3"
                key={idx}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-1xl text-gray-600"
                    />
                    <div className="text-gray-500">Completed on</div>
                  </div>
                  <div className="text-secondary text-[18px] font-medium">
                    {readableDate(el.date) || "NA"}
                  </div>
                </div>
                <hr className="border-slate-300" />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="text-1xl text-gray-600"
                    />
                    <div className="text-gray-500">Applicant name</div>
                  </div>
                  <div className="text-secondary text-[18px] font-medium">
                    {el.institute.name || "NA"}
                  </div>
                </div>
                <hr className="border-slate-300" />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-1xl text-gray-600"
                    />
                    <div className="text-gray-500">District</div>
                  </div>
                  <div className="text-secondary text-[18px] font-medium">
                    {el.institute.district || "NA"}
                  </div>
                </div>
                <hr className="border-slate-300" />
                {el?.form_submissions.length? <Button
                  text={"View Details"}
                  styles="border-primary text-white bg-primary"
                  onClick={() => handleClick(`${ROUTE_MAP.past_application_list}/${el.date}`)}
                />: "No Form Submitted"}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col">
            <div className="w-full bg-tertiary p-7 rounded-[8px]">
              <div className="text-secondary text-[24px] text-center font-medium">
                No Past Inspections found!
              </div>
            </div>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default PastInspections;
