import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";
import Accordion from "../components/Accordion";

const AssessmentType = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout back={ROUTE_MAP.medical_assessments} logoutDisabled pageTitle="3. Application Type" pageDesc="Select the appropriate application type that you'd want to proceed inspection with.">      
      <div className="w-full lg:w-[90%] flex flex-col px-7">
        <div className="flex flex-col gap-4">
          <div className="font-medium">Begin by filling the basic information first:</div>
          <div className="flex flex-row bg-primary gap-4 p-4">
            <div className="text-white grow">
              Basic information
            </div>
            <div className="grow-0 flex justify-center items-center">
              <FontAwesomeIcon icon={faChevronRight} className="text-1xl lg:text-4xl text-white" />
            </div>  
          </div>
        </div>

        <div className="my-6">
          <hr className="border-slate-300" />
        </div>

        <div className="flex flex-row wrap">
          <Button styles="lg:w-[40%] bg-white text-black m-2 hover:bg-black hover:text-white border-black animate__animated animate__fadeInDown rounded-[28px] p-4 w-[120px] font-light" text="Degree"></Button>
          <Button styles="lg:w-[40%] bg-white text-black m-2 hover:bg-black hover:text-white border-black animate__animated animate__fadeInDown rounded-[28px] p-4 w-[120px] font-light" text="Diploma"></Button>
        </div>
      
        <div id="accordionExample">
          <Accordion headText="BSC" number="1"></Accordion>
        </div>
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
