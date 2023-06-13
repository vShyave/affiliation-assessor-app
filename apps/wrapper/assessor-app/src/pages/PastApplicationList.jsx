import React, { useState } from "react";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CommonLayout from "../components/CommonLayout";

import { getPastInspections } from "../api";
import { getFieldName, readableDate } from "./../utils/common";
import { getSpecificDataFromForage } from "./../utils";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

const PastApplicationList = () => {
  const [applicationData, setApplicationData] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { date, institute } = useParams();

  const handleNavigateToForms = (formObj) => {
    if (formObj?.status !== "completed" || !formObj?.status) {
      navigate(
        `${
          ROUTE_MAP.past_application_list_view +
          "/" +
          formObj?.form_name.trim() +
          "/" +
          window.location.pathname.split("/")[2]
        }`
      );
    } else {
      setError("The form has already completed!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const getPastInspectionData = async () => {
    const assessor_id = await getSpecificDataFromForage("required_data");
    const postData = {
      date: new Date("2023-06-13").toJSON().slice(0, 10),
      assessor_id: assessor_id?.assessor_user_id,
    };

    try {
      const res = await getPastInspections(postData);
      console.log(res?.data?.assessment_schedule);
      if (res?.data?.assessment_schedule?.length) {
        setApplicationData(
          res.data.assessment_schedule.filter(
            (item) => item.date === window.location.pathname.split("/")[2]
          )
        );
      } else {
        setApplicationData([]);
      }
    } catch (error) {
      console.log("error - ", error);
      alert(error);
    }
  };

  useState(() => {
    getPastInspectionData();
  }, []);

  return (
    <CommonLayout
      back={ROUTE_MAP.past_inspections}
      logoutDisabled
      pageTitle="Past Inspection List"
      pageDesc={`Following are the forms submitted on ${readableDate(
        date
      )} to the ${institute}`}
    >
      <div className="w-full flex flex-col px-6">
        {error && (
          <span className="text-white animate__animated animate__headShake bg-red-500 w-80 font-medium px-4 py-3 text-center mx-auto mb-6">
            {error}
          </span>
        )}
        <div
          className={`flex flex-col px-6h-[calc(100vh-214px)] overflow-y-auto gap-4 pb-5 ${
            !applicationData.length ? "justify-center" : ""
          }`}
        >
          {applicationData.length &&
            applicationData[0]["form_submissions"]?.map((form, idx) => {
              return (
                <div
                  key={idx}
                  className="border-b-[1px] border-t-[1px] border-l-[1px] border-r-[1px] border-primary px-4 bg-orange-500/10 py-0"
                >
                  <div key={idx} onClick={() => handleNavigateToForms(form)}>
                    <div className="flex flex-row gap-2 border-1 border-black py-4">
                      <div className="flex grow items-center">
                        <div className="text-[14px] font-medium">
                          {getFieldName(form.form_name)}
                        </div>
                      </div>
                      <div className="flex flex-row grow-0 items-center gap-4">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[16px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </CommonLayout>
  );
};

export default PastApplicationList;
