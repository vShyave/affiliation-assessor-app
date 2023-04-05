import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import {Accordion,AccordionHeader,AccordionBody} from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";

const AssessmentType = () => {
  
  const navigate = useNavigate();

  const tabData = [
    { 
        label: "Nursing",
        value: "nursing",
        desc: ``
    }, { 
        label: "Paramedical",
        value: "paramedical",
        desc: ``
    }
  ];

  const coursesList=[
    {openId:1, courseName:"A", formName:["abc","xyz"]},
    {openId:2, courseName:"B", formName:["def"]},
    {openId:3, courseName:"C", formName:["123","234","345","456"]}
  ];

  const [activeTabValue, setActiveTabValue] = useState(tabData[0].value);
  const [activeButtonValue, setActiveButtonValue] = useState('degree');
  const [activeAccordionValue, setActiveAccordionValue] = useState(coursesList[0].openId);

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    setActiveAccordionValue(value);
  };

  return (
    <CommonLayout back={ROUTE_MAP.medical_assessments}
      pageTitle="3. Application Type"
      pageDesc="Select the appropriate application type that you'd want to proceed inspection with."
      logoutDisabled
    >      
      <div className="w-full lg:w-[90%] flex flex-col px-6">
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

        <Tabs value="nursing">
          <TabsHeader className="bg-transparent p-0" indicatorProps={{ className: "bg-orange-500/10 shadow-none" }}> 
            {
              tabData.map(
                ({ label, value }) => ( 
                  <Tab key={value} value={value} className={`p-3 font-bold border-b- border-b-2 ${(value === activeTabValue) ? 'text-primary border-b-primary' : 'text-gray-500 border-[#DBDBDB]'}`} onClick={() => setActiveTabValue(value)}> {label} </Tab> 
                )
              )
            }
          </TabsHeader>
          <TabsBody className="p-0">
            {
              tabData.map(
                (
                  {value, desc }) => (
                    <TabPanel key={value} value={value} className="flex flex-col gap-5 px-0 py-5"> 
                      {
                        <>
                          <div className="flex flex-row gap-4 justify-center">
                            <Button styles={`border-black p-3 text-[16px] w-[120px] rounded-[28px] animate__animated animate__fadeInDown hover:bg-black hover:text-white ${ (activeButtonValue === 'degree') ? 'text-white bg-black' : 'text-black bg-white' }`} text="Degree" onClick={() => setActiveButtonValue('degree')}></Button>
                            <Button styles={`border-black p-3 text-[16px] w-[120px] rounded-[28px] animate__animated animate__fadeInDown hover:bg-black hover:text-white ${ (activeButtonValue === 'diploma') ? 'text-white bg-black' : 'text-black bg-white' }`} text="Diploma" onClick={() => setActiveButtonValue('diploma')}></Button>
                          </div>

                          <div className="flex flex-col gap-4">
                            {
                              coursesList.map(
                                (course) => {
                                  return (
                                    <Accordion open={ open === course.openId } key={ course?.openId }>
                                      <AccordionHeader onClick={() => handleOpen(course?.openId)} className={`bg-primary p-4 font-semibold text-[14px]`} style={{color: '#fff'}}>
                                        { course.courseName }
                                      </AccordionHeader>
                                      <AccordionBody className="border-b-[1px] border-l-[1px] border-r-[1px] border-primary px-4 bg-orange-500/10 py-0">
                                        {/* course.formName.map((form, idx) => {
                                          return ( */}
                                            <div className="flex flex-row gap-2 border-1 border-black py-4">
                                              <div className="flex grow items-center">
                                                <div className="text-[14px] font-medium">Vinod</div>
                                              </div>
                                              <div className="flex grow-0 items-center">
                                                <FontAwesomeIcon icon={faChevronRight} className="text-[16px]" />
                                              </div>
                                            </div>
                                            <hr className="border-slate-600" />
                                            <div className="flex flex-row gap-2 border-1 border-black py-4">
                                              <div className="flex grow items-center">
                                                <div className="text-[14px] font-medium">Praveen</div>
                                              </div>
                                              <div className="flex grow-0 items-center">
                                                <FontAwesomeIcon icon={faChevronRight} className="text-[16px]" />
                                              </div>
                                            </div>
                                        {/* //   )
                                        // }) */}
                                      </AccordionBody>
                                    </Accordion>
                                  );
                                }
                              )
                            }
                          </div>
                        </>
                      } 
                    </TabPanel>
                )
              )
            } 
          </TabsBody>
        </Tabs>

        
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
