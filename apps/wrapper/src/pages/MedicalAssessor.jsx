import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis, faUser, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";

const MedicalAssessor = () => {

  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <CommonLayout back="/login" backDisabled logoutDisabled>
      <div className="flex flex-col px-5 h-[calc(100vh-176px)] overflow-y-auto justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <img src="/assets/account_circle.svg" className="h-[52px] lg:h-[72px]" alt="illustration" />
            <p className=" lg:text-4xl text-secondary text-[24px] font-bold animate__animated animate__fadeInDown tracking-wide"> Welcome Assessor </p>
            <p className="text-center text-gray-500"> Please check your assigned inspection </p>
          </div>

          <div className="gap-3">
            <hr className="border-slate-300" />
            <div className="gap-3 py-3 px-2">
              <div className="text-[12px]">Your Employee Identity Code</div>
              <div className="text-secondary font-semibold text-[18px]">ID-909883</div>
            </div>
            <hr className="border-slate-300" />
          </div>

          <div className="gap-6 flex flex-col">
            <Button text="Today's Inspections" styles="w-full lg:w-[60%] text-white border-primary animate__animated animate__fadeInDown" onClick={() => handleClick(ROUTE_MAP.medical_assessments)} />
            <Button text="Upcoming Inspections" styles="w-full lg:w-[60%] bg-white text-primary border-primary border-[1px] animate__animated animate__fadeInDown" onClick={() => handleClick(ROUTE_MAP.upcoming_medical_assessments)} />
            <Button text="Past Inspections" styles="w-full lg:w-[60%] bg-white font-normal border-[1px] border-[#DBDBDB] text-[#535461] animate__animated animate__fadeInDown" onClick={() => handleClick(ROUTE_MAP.upcoming_medical_assessments)} />
          </div>
        </div>

        <div className="">
          <div className="flex flex-row gap-4">
            <div className="w-[50%] p-6 text-gray-600 text-center">
              <FontAwesomeIcon icon={faCircleQuestion} />
              &nbsp;Need help?
            </div>

            <div className="w-[50%] p-6 text-gray-600 text-center">
              <FontAwesomeIcon icon={faEllipsis} />
              &nbsp; More
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MedicalAssessor;
