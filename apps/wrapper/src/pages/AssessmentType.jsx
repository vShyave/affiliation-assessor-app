import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import {Accordion,AccordionHeader,AccordionBody} from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";

import { getCoursesForAccordions, getCoursesOfInstitutes, getStatusOfForms } from '../api';
import { StateContext } from "../App";

const AssessmentType = () => {
  
  const navigate = useNavigate();
  const storedData = localStorage.getItem('required_data');
  const instituteId = JSON.parse(storedData)?.institute_id;
  const [tabs, setTabs]=useState([]);
  const [activeTabValue, setActiveTabValue] = useState('');
  const [activeButtonValue, setActiveButtonValue] = useState('Degree');
  const [activeAccordionValue, setActiveAccordionValue] = useState();
  const [accordionData, setAccordionData] = useState(null);
  const { state, setState } = useContext(StateContext);

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    setActiveAccordionValue(value);
  };

  const getStatus = async () => {
    const postData = {
      form_name: "bsc_nursing",
      assessor_id: "d7da6c6d-96d7-42a8-bfda-d3501f9116d1"
    };

    try {
      const response = await getStatusOfForms(postData);
      const formStatus = response?.data?.form_submissions[0];
      console.log(formStatus);
    } catch (error) {
      alert(error);
    }
  };

  const getCourses = async () => {
    const postData = {
      institute_id: instituteId
    };

    try {
      const response = await getCoursesOfInstitutes(postData);
      const courses = response?.data?.institute_course?.[0].courses;
      const tabs = courses.map((course) => { 
        return { label: course, value: course };
      });
      setTabs(tabs);
      setActiveTabValue(tabs[0].value);
    } catch (error) {
      alert(error);
    }
  };

  const getAccordionsData = async () => {
    const postData = {
      courseType: activeTabValue,
      courseLevel: activeButtonValue
    };

    try {
      const response = await getCoursesForAccordions(postData);
      let courses_data = response?.data?.courses;
      if (courses_data.length) {
        courses_data = courses_data.map((obj) => {
          if (obj.formObject) {
            obj.formObject = obj.formObject?.replace(/\\/g, "");
            obj.formObject = JSON.parse(obj.formObject);
          }
          return obj;
        });
      }
      
      setActiveAccordionValue(courses_data?.[0]?.course_id);
      setAccordionData(courses_data);
      checkFormStatus(courses_data);
    } catch (error) {
      console.log('error - ', error);
    }
  }

  const checkFormStatus = (courses_data) => {
    const newCourseArr = courses_data.map((obj) => {
      if (state) {
        const value = state.userData?.filledForms[obj.formObject?.path];
        if (value) {
          obj['formStatus'] = value;
        }
      }
      return obj;
    });
    console.log('newCourseArr - ', newCourseArr);
  }

  const handleNavigateToBasicFrom = () => {
    navigate(ROUTE_MAP.hospital_forms);
  }

  const handleNavigateToForms = (courseObj) => {
    // const newFormName = formName?.toLowerCase()?.split(' ').join('_');
    navigate(`${ROUTE_MAP.otherforms_param_formName}${courseObj.formObject?.path.trim()}`);
  }

  useEffect(() => {
    getAccordionsData();
  }, [activeTabValue, activeButtonValue]);

  useEffect(() => {
    getCourses();
    console.log('state - ', state);
    // state?.userData?.filledForms?.["hospital_clinical_facilities"]
  }, []);

  return (
    <CommonLayout back={ROUTE_MAP.medical_assessments}
      pageTitle="3. Application Type"
      pageDesc="Select the appropriate application type that you'd want to proceed inspection with."
      logoutDisabled
    >      
      <div className="w-full flex flex-col px-6">
        <div className="flex flex-col gap-4">
          <div className="font-medium">Begin by filling the basic information first:</div>
          <div className="flex flex-row bg-primary gap-4 p-4" onClick={handleNavigateToBasicFrom}>
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

        {
          tabs?.length > 0 && (
            <>
              <Tabs value={tabs[0].value}>
                <TabsHeader className="bg-transparent p-0" indicatorProps={{ className: "bg-orange-500/10 shadow-none" }}> 
                  {
                    tabs.map(
                      ({ label, value }) => ( 
                        <Tab key={value} value={value} className={`p-3 font-bold border-b- border-b-2 ${(value === activeTabValue) ? 'text-primary border-b-primary' : 'text-gray-500 border-[#DBDBDB]'}`} onClick={() => setActiveTabValue(value)}> {label} </Tab> 
                      )
                    )
                  }
                </TabsHeader>
                <TabsBody className="p-0">
                  {
                    tabs.map(
                      ({value}, idx) => (
                          <TabPanel key={idx} value={value} className="flex flex-col gap-5 px-0 py-5"> 
                            {
                              <>
                                <div className="flex flex-row gap-4 justify-center">
                                  <Button styles={`border-black p-3 w-[120px] rounded-[28px] animate__animated animate__fadeInDown hover:bg-black hover:text-white ${ (activeButtonValue === 'Degree') ? 'text-white bg-black' : 'text-black bg-white' }`} css={{fontSize: '14px'}} text="Degree" onClick={() => setActiveButtonValue('Degree')}></Button>
                                  <Button styles={`border-black p-3 w-[120px] rounded-[28px] animate__animated animate__fadeInDown hover:bg-black hover:text-white ${ (activeButtonValue === 'Diploma') ? 'text-white bg-black' : 'text-black bg-white' }`} css={{fontSize: '14px'}} text="Diploma" onClick={() => setActiveButtonValue('Diploma')}></Button>
                                </div>

                                <div className="flex flex-col gap-4">
                                  {
                                    accordionData?.map(
                                      (course) => {
                                        return (
                                          <Accordion open={ course?.course_id === activeAccordionValue } key={ course?.course_id }>
                                            <AccordionHeader onClick={() => handleOpen(course?.course_id)} className={`bg-primary p-4 font-semibold text-[14px]`} style={{color: '#fff'}}>
                                              { course.course_name }
                                            </AccordionHeader>
                                            <AccordionBody className="border-b-[1px] border-l-[1px] border-r-[1px] border-primary px-4 bg-orange-500/10 py-0">
                                              {
                                                course?.formName && course?.formName?.length && course.formName.map(
                                                  (form, idx) => {
                                                    return (
                                                      <div key={idx} onClick={() => handleNavigateToForms(course)}>
                                                        <div className="flex flex-row gap-2 border-1 border-black py-4">
                                                          <div className="flex grow items-center">
                                                            <div className="text-[14px] font-medium">{ form }</div>
                                                          </div>
                                                          <div className="flex flex-row grow-0 items-center gap-4">
                                                            {/* {
                                                              formCompleted && 
                                                              <div className="h-[40px] w-[auto] bg-primary text-white border-primary">Completed</div>
                                                            } */}
                                                            <FontAwesomeIcon icon={faChevronRight} className="text-[16px]" />
                                                          </div>
                                                        </div>
                                                        <hr className={`border-slate-600`} />
                                                      </div>
                                                    )
                                                  }
                                                )
                                              }
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
            </>
          )
        }

        
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
