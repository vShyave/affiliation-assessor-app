import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import {
  getCoursesForAccordions,
  getCoursesOfInstitutes,
  getStatusOfForms,
} from "../api";
import {
  getAllKeysFromForage,
  getCookie,
  getSpecificDataFromForage,
} from "../utils";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";

const AssessmentType = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([]);
  const [activeTabValue, setActiveTabValue] = useState("");
  const [activeButtonValue, setActiveButtonValue] = useState("");
  const [activeAccordionValue, setActiveAccordionValue] = useState();
  const [accordionData, setAccordionData] = useState(null);
  const [formNames, setFormNames] = useState([]);
  const [completedForms, setCompletedForms] = useState([]);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    setActiveAccordionValue(value);
  };

  const getFormStatus = async () => {
    const {
      user: { id },
    } = getCookie("userData");

    const postData = {
      date: new Date().toJSON().slice(0, 10),
      assessor_id: id,
    };

    try {
      const response = await getStatusOfForms(postData);
      let formStatus = response?.data?.form_submissions;
      formStatus = formStatus.map((obj) => {
        return obj.form_name;
      });
      setCompletedForms(formStatus);
      getDataFromLocalForage();
    } catch (error) {
      alert(error);
    }
  };

  const getDataFromLocalForage = async () => {
    const keys = await getAllKeysFromForage();
    if (keys.length) {
      const form_names =
        keys &&
        keys.map((elem) => {
          const str1 = elem.substr(elem.indexOf("_") + 1);
          return str1.substr(0, str1.indexOf("-") - 4);
        });

      setFormNames(form_names);
    }
    getCourses();
  };

  const getCourses = async () => {
    const storedData = await getSpecificDataFromForage("required_data");
    const instituteId = storedData?.institute_id;

    const postData = {
      institute_id: instituteId,
    };

    try {
      const response = await getCoursesOfInstitutes(postData);
      let courses = response?.data?.institute_course?.[0].institute_type;
      courses = JSON.parse(courses);
      let tabs = [];
      courses.forEach((obj) => {
        let indexValue = tabs.findIndex(
          (x) => x?.value === obj?.courseType?.toLowerCase()
        );
        if (indexValue === -1) {
          let _obj = {
            label: obj?.courseType?.toLowerCase(),
            value: obj?.courseType?.toLowerCase(),
            level: [obj?.courseLevel?.toLowerCase()],
          };
          tabs.push(_obj);
        }

        if (
          indexValue > -1 &&
          tabs[indexValue]?.level?.indexOf(obj?.courseLevel?.toLowerCase()) ===
            -1
        ) {
          tabs[indexValue]?.level?.push(obj?.courseLevel?.toLowerCase());
        }
      });
      setTabs(tabs);
      setActiveTabValue(tabs[0].value);
      setActiveButtonValue(tabs[0].level[0]);
    } catch (error) {
      alert(error);
    }
  };

  const getAccordionsData = async (tabValue) => {
    if (activeButtonValue && (tabValue || activeTabValue)) {
      const storedData = await getSpecificDataFromForage("required_data");
      const instituteId = storedData?.institute_id;

      let course_type = tabValue || activeTabValue;
      const postData = {
        courseType: course_type.charAt(0).toUpperCase() + course_type.substr(1),
        courseLevel:
          activeButtonValue.charAt(0).toUpperCase() +
          activeButtonValue.substr(1),
        institute_id: instituteId,
      };

      try {
        const response = await getCoursesForAccordions(postData);
        let courses_data = response?.data?.courses;
        if (courses_data.length) {
          courses_data = courses_data.map((obj) => {
            if (obj?.formObject) {
              obj.formObject = obj.formObject?.replace(/\\/g, "");
              obj.formObject = JSON.parse(obj.formObject);
              obj.formObject.forEach((eachObj) => {
                if (formNames.includes(eachObj.path.trim())) {
                  eachObj.status = "continue";
                } else if (completedForms.includes(eachObj.path.trim())) {
                  eachObj.status = "completed";
                } else {
                  eachObj.status = "";
                }
              });
            }
            return obj;
          });
        }

        setActiveAccordionValue(courses_data?.[0]?.course_id);
        setAccordionData(courses_data);
      } catch (error) {
        console.log("error - ", error);
      }
    }
  };

  const handleNavigateToBasicFrom = () => {
    navigate(ROUTE_MAP.hospital_forms);
  };

  const handleNavigateToForms = (formObj) => {
    navigate(`${ROUTE_MAP.otherforms_param_formName}${formObj.path?.trim()}`);
    // if (formObj?.status !== "completed" || !formObj?.status) {
    //   console.log(
    //     `${ROUTE_MAP.otherforms_param_formName}${formObj.path?.trim()}`
    //   );
    //   navigate(`${ROUTE_MAP.otherforms_param_formName}${formObj.path?.trim()}`);
    // } else {
    //   setError("The form has already completed!");
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
  };

  const handleChangeTabValue = (value) => {
    setActiveTabValue(value);
    getAccordionsData(value);
  };

  useEffect(() => {
    getFormStatus();
  }, []);

  useEffect(() => {
    getAccordionsData();
  }, [activeTabValue && formNames && completedForms && activeButtonValue]);

  return (
    <CommonLayout
      back={ROUTE_MAP.medical_assessments}
      pageTitle="3. Application Type"
      pageDesc="Select the appropriate application type that you'd want to proceed inspection with."
      logoutDisabled
    >
      <div className="w-full flex flex-col px-6">
        <div className="flex flex-col gap-4">
          <div className="font-medium">
            Begin by filling the basic information first:
          </div>
          <div
            className="flex flex-row bg-primary gap-4 p-4"
            onClick={handleNavigateToBasicFrom}
          >
            <div className="text-white grow">Basic information</div>
            <div className="grow-0 flex justify-center items-center">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-1xl text-white"
              />
            </div>
          </div>
        </div>

        <div className="my-6">
          <hr className="border-slate-300" />
        </div>

        {error && (
          <span className="text-white animate__animated animate__headShake bg-red-500 w-80 font-medium px-4 py-3 text-center mx-auto mb-6">
            {error}
          </span>
        )}

        {tabs?.length > 0 && (
          <>
            <Tabs value={tabs[0].value}>
              <TabsHeader
                className="bg-transparent p-0"
                indicatorProps={{ className: "bg-orange-500/10 shadow-none" }}
              >
                {tabs.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className={`p-3 font-bold border-b- border-b-2 ${
                      value === activeTabValue
                        ? "text-primary border-b-primary"
                        : "text-gray-500 border-[#DBDBDB]"
                    }`}
                    onClick={() => handleChangeTabValue(value)}
                  >
                    {" "}
                    {label.toUpperCase()}{" "}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="p-0">
                {tabs.map((obj, idx) => (
                  <TabPanel
                    key={idx}
                    value={obj.value}
                    className="flex flex-col gap-5 px-0 py-5"
                  >
                    {
                      <>
                        <div className="flex flex-row gap-4 justify-center">
                          {obj?.level?.map((level) => (
                            <Button
                              key={level}
                              styles={`border-[#535461] p-2 w-[120px] rounded-[28px] capitalize animate__animated animate__fadeInDown hover:bg-[#535461] hover:text-white ${
                                activeButtonValue === level
                                  ? "text-white bg-[#535461]"
                                  : "text-[#535461] bg-white"
                              }`}
                              css={{ fontSize: "16px" }}
                              text={level}
                              onClick={() => setActiveButtonValue(level)}
                            ></Button>
                          ))}
                        </div>

                        <div className="flex flex-col gap-4">
                          {accordionData?.map((course) => {
                            return (
                              <Accordion
                                open={
                                  course?.course_id === activeAccordionValue
                                }
                                key={course?.course_id}
                              >
                                <AccordionHeader
                                  onClick={() => handleOpen(course?.course_id)}
                                  className={`bg-primary p-4 font-semibold text-[14px]`}
                                  style={{ color: "#fff" }}
                                >
                                  {course.course_name}
                                </AccordionHeader>
                                <AccordionBody className="border-b-[1px] border-l-[1px] border-r-[1px] border-primary px-4 bg-orange-500/10 py-0">
                                  {course?.formObject?.length &&
                                    course.formObject.map((form, idx) => {
                                      return (
                                        <div
                                          key={idx}
                                          onClick={() =>
                                            handleNavigateToForms(form)
                                          }
                                        >
                                          <div className="flex flex-row gap-2 border-1 border-black py-4">
                                            <div className="flex grow items-center">
                                              <div className="text-[14px] font-medium">
                                                {form.name}
                                              </div>
                                            </div>
                                            <div className="flex flex-row grow-0 items-center gap-4">
                                              {form.status === "completed" && (
                                                <div className="w-[auto] bg-[#009A2B] text-white border-[#009A2B] py-1 px-3 text-[12px] rounded-[24px] capitalize font-semibold">
                                                  {form.status}
                                                </div>
                                              )}
                                              {form.status === "continue" && (
                                                <div className="w-[auto] bg-[#535461] text-white border-[#535461] py-1 px-3 text-[12px] rounded-[24px] capitalize font-semibold">
                                                  {form.status}
                                                </div>
                                              )}
                                              <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className="text-[16px]"
                                              />
                                            </div>
                                          </div>
                                          <hr className={`border-slate-600`} />
                                        </div>
                                      );
                                    })}
                                </AccordionBody>
                              </Accordion>
                            );
                          })}
                        </div>
                      </>
                    }
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
