import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";
import Accordion from "../components/Accordion";

const AssessmentType = () => {
  const navigate = useNavigate();
  const tabData = [
    { 
        label: "HTML",
        value: "html",
        desc: `It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter.`
    }, { 
        label: "React",
        value: "react",
        desc: `Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too.`
    }
];

  return (
    <CommonLayout back={ROUTE_MAP.medical_assessments}
      pageTitle="3. Application Type"
      pageDesc="Select the appropriate application type that you'd want to proceed inspection with."
      logoutDisabled
    >      
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

        <Tabs value="html">
          <TabsHeader className="bg-transparent text-primary" indicatorProps={{ className: "bg-orange-500/10 shadow-none text-black ", }}> 
            {
              tabData.map(({ label, value }) => ( <Tab key={value} value={value}> {label} </Tab> ))
            }
          </TabsHeader>
          <TabsBody> 
            {
              tabData.map(({ value, desc }) => (
                <TabPanel key={value} value={value}> {
        <div className="flex flex-row wrap">
          <Button styles="lg:w-[40%] bg-white text-black m-2 hover:bg-black hover:text-white border-black animate__animated animate__fadeInDown rounded-[28px] p-4 w-[120px] font-light" text="Degree"></Button>
          <Button styles="lg:w-[40%] bg-white text-black m-2 hover:bg-black hover:text-white border-black animate__animated animate__fadeInDown rounded-[28px] p-4 w-[120px] font-light" text="Diploma"></Button>
        </div>
      } </TabPanel> ))
            } 
          </TabsBody>
        </Tabs>

       
      
        <div id="accordionExample">
          <Accordion headText="BSC" number="1"></Accordion>
        </div>
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
