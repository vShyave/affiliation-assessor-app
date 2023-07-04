import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";
import Select from "react-select";

import "react-calendar/dist/Calendar.css";

import { formatDate, getInitials } from "../../utils/common";

import {
  getUsersForScheduling,
  getScheduleAssessment,
  getDesktopAnalysisForms,
} from "../../api";

import { Label, Button } from "../../components";

import { Option, Stepper, Step } from "@material-tailwind/react";
import { GrDocumentPdf } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";

import Toast from "../../components/Toast";
import MultiSelect from "./SelectMultiple";

function ScheduleInspectionModal({ closeSchedule, setToast, instituteId }) {
  // const [formStatus, setFormStatus] = useState({});
  const [initialDivision, setInitialDivision] = useState(false);
  const [initialAssessorFirstDivision, setInitialAssessorFirstDivision] = useState(false);
  const [initialAssessorSecondDivision, setInitialAssessorSecondDivision] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [date, setDate] = useState(new Date());
  const [payload, setPayload] = useState({});
  const [assessorName, setAssessorName] = useState("");
  const [assistingAssessorFirstName, setAssistingAssessorFirstName] = useState("");
  const [assistingAssessorSecondName, setAssistingAssessorSecondName] = useState("");

  const [assessorList, setAssessorList] = useState([]);
  let [assistingAssessorList1, setAssistingAssessorList1] = useState([{}]);


  const handleOnAssessorSelect = (e) => {
    setAssessorName((prevState) => ({ ...prevState, assessorCode: e.label }));
    setPayload((prevState) => ({ ...prevState, assessorCode: e.value }));

     setAssistingAssessorList1(assessorList.filter((el) => {
      return el.phonenumber != e.phonenumber;
    }));
  };

  const handleOnAssistingAssessorSelect = (e) => {

    setAssistingAssessorFirstName((prevState) => ({ ...prevState, assessorCode: e[0]?.label }));
    setAssistingAssessorSecondName((prevState) => ({ ...prevState, assessorCode: e[1]?.label }));

     setPayload((prevState) => ({ ...prevState, assessorCode: e.value }));

  };

  const onChangeDate = async (date) => {
    let tempDate = formatDate(date);

    setPayload((prevState) => ({ ...prevState, date: tempDate }));
    const postData = { todayDate: tempDate };
    const res = await getUsersForScheduling(postData);
    setAssessorList(
      res?.data?.assessors.map((item) => ({
        value: item.code,
        label: item.name,
        phonenumber: item.phonenumber,
      }))
    );
  };

  const handleOnGroundAssessor = () => {
    setInitialDivision(true);
  };

  const handleOnGroundAssistingAssessor = () => {
    setInitialAssessorFirstDivision(true);
    setInitialAssessorSecondDivision(true);

  };

  const handleScheduleAssessment = async () => {
    const formData = new FormData();

    formData.append("instituteId", instituteId);

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    try {
      const res = await getScheduleAssessment(formData);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Inspection scheduled successfully!",
        toastType: "success",
      }));
      setTimeout(
        () =>
          setToast((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastMsg: "",
            toastType: "",
          })),
        3000
      );
      closeSchedule(false);
    } catch (error) {
      console.log("error - ", formData.get("date"));
      let date = new Date(formData.get("date"));
      if (error.response.data.code === "constraint-violation") {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg:
            "Inspection already schduled for " + date.toDateString() + ".",
          toastType: "error",
        }));
        setTimeout(
          () =>
            setToast((prevState) => ({
              ...prevState,
              toastOpen: false,
              toastMsg: "",
              toastType: "",
            })),
          3000
        );
      } else {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Error occured while scheduling inspection!",
          toastType: "error",
        }));
        setTimeout(
          () =>
            setToast((prevState) => ({
              ...prevState,
              toastOpen: false,
              toastMsg: "",
              toastType: "",
            })),
          3000
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center  items-center fixed inset-0 bg-opacity-25 z-10 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[1024px] h-fit p-8">
          <div className="flex flex-col justify-between gap-4 w-full">
            <div className="w-1/3 mx-auto ">
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
              </Stepper>
              <div className="text-lg font-bold py-2 gap-20 flex flex-row justify-between">
                <h1 className="mr-4">Schedule inspection</h1>
                <h1 className="ml-16">Select the applications</h1>
              </div>
            </div>
            <hr className="border-2 m-" />
            {activeStep === 0 && (
              <>
                <div className="flex text-2xl font-semibold">
                  <h1>Schedule the inspection</h1>
                </div>

                <div className="flex flex-row gap-4 justify-between">
                  <div className="flex flex-col gap-4 w-1/2">
                    <div className="flex flex-col rounded-xl border border-gray-300 h-1/2 p-4">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Add on ground assessor"
                        moreClass="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>
                      <span className="flex flex-row gap-2">
                        <Select
                          key={"assessor_name"}
                          name="assessor_name"
                          label="Assessor Name"
                          onChange={handleOnAssessorSelect}
                          options={assessorList}
                          // isOptionDisabled={(option) => option.isdisabled}
                          className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        ></Select>

                        <Button
                          onClick={() => {
                            {
                              handleOnGroundAssessor();
                            }
                          }}
                          moreClass={`${
                            !initialDivision
                              ? "border border-blue-400 bg-white text-blue-400 w-1/4 h-[45px] m-auto"
                              : "cursor-not-allowed border border-gray-500 bg-white text-gray-500 w-1/4 h-[45px] m-auto"
                          }`}
                          text="Add"
                        ></Button>
                      </span>
                      {initialDivision && assessorName && (
                        <>
                          <div className="bg-gray-100 items-center flex border border-gray-100 justify-between rounded-xl p-1 mt-4">
                            <div className="gap-2 flex items-center">
                              <span className="border-green-500 w-[36px] h-fit items-center bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                                {getInitials(assessorName.assessorCode)}
                              </span>
                              <span className="font-semibold">
                                {assessorName.assessorCode}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setInitialDivision(false);
                              }}
                              className="justify-end flex"
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col rounded-xl border border-gray-300 h-1/2 p-4">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Add assisting assessor"
                        moreClass="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <span className="flex flex-row gap-2">
                        <Select
                          isMulti
                          key={"assessor_name"}
                          name="assessor_name"
                          label="Assessor Name"
                          onChange={handleOnAssistingAssessorSelect}
                          options={assistingAssessorList1}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <Button
                          onClick={() => {
                            {
                              handleOnGroundAssistingAssessor();
                            }
                          }}
                          moreClass={`${
                            !initialAssessorFirstDivision
                              ? "border border-blue-400 bg-white text-blue-400 w-1/4 h-[45px] m-auto"
                              : "cursor-not-allowed border border-gray-500 bg-white text-gray-500 w-1/4 h-[45px] m-auto"
                          }`}
                          text="Add"
                        ></Button>
                      </span>
                      {initialAssessorFirstDivision && assistingAssessorFirstName && (
                        <>
                          <div className="bg-gray-100 items-center flex border border-gray-100 justify-between rounded-xl p-1 mt-2">
                            <div className="gap-2 flex items-center">
                              <span className="border-green-500 w-[36px] h-3/4 items-center bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                                {getInitials(
                                  assistingAssessorFirstName.assessorCode
                                )}
                              </span>
                              <span className="font-semibold">
                                {assistingAssessorFirstName.assessorCode}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setInitialAssessorFirstDivision(false);
                              }}
                              className="justify-end flex"
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                        </>
                      )}

                      {initialAssessorSecondDivision && assistingAssessorSecondName && (
                        <>
                          <div className="bg-gray-100 items-center flex border border-gray-100 h-[100px] justify-between rounded-xl p-1 mt-2">
                            <div className="gap-2 flex items-center">
                              <span className="border-green-500 w-[36px] h-fit items-center bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                                {getInitials(
                                  assistingAssessorSecondName.assessorCode
                                )}
                              </span>
                              <span className="font-semibold">
                                {assistingAssessorSecondName.assessorCode}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setInitialAssessorSecondDivision(false);
                              }}
                              className="justify-end flex"
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between rounded-xl border border-gray-300 bg-white w-1/2 p-2">
                    <div className="font-semibold text-lg mb-8 mt-2">
                      Select date
                    </div>
                    <Calendar
                      className="mx-auto bg-blue-400"
                      onChange={onChangeDate}
                      minDate={new Date()}
                    />
                    <div className="font-semibold text-lg mt-8 mb-2">
                      Date Selected : {payload.date}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* <div className="mt-16 flex justify-between"> */}
            {activeStep === 1 && (
              <>
                <div className="flex text-2xl font-semibold">
                  <h1>Select the applications</h1>
                </div>

                <div className="flex flex-row gap- justify-between">
                  <div className="flex flex-col gap-12 w-full">
                    <div className="flex flex-col rounded-xl border border-gray-300 h-1/3 p-4">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Form filled by the institute"
                        moreClass="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <div className="bg-gray-100  items-center flex gap-4 border border-gray-100 rounded-xl mt-4">
                        <span className="font-semibold p-2">
                          Application name
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-300 h-3/4 p-2">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Select other available forms"
                        moreClass="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <span className="flex flex-row ">
                        <MultiSelect className="w-full" />
                        {/* <select
                         isMulti
                          key={"assessor_name"}
                          name="assessor_name"
                          label="Assessor Name"
                          onChange={handleOnAssessorSelect}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        > */}
                        {/* <Option value='' >Select Assessor</Option> */}

                        {/* <option value="">Select here</option>

                          {assessorList &&
                            assessorList.map((item) => (
                              <option key={item.user_id} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                        </select> */}
                      </span>
                      <div className="flex gap-2 items-center bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
                        <span className=" w-[36px] h-3/4 items-center inline-fle justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          <GrDocumentPdf />
                        </span>
                        <span className="font-semibold p-2">Form name 1</span>
                      </div>
                      <div className="flex gap-2 items-center mb-4 bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
                        <span className=" w-[36px] h-3/4 items-center  inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          <GrDocumentPdf />
                        </span>
                        <span className="font-semibold p-2">Form name 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="footer flex flex-row justify-between mt-8">
              <Button
                onClick={handlePrev}
                disabled={isFirstStep}
                moreClass={`${
                  activeStep === 1
                    ? "border border-blue-500 bg-blue-400 text-white w-1/6"
                    : "invisible"
                }`}
                text="Previous"
              ></Button>
              <button
                onClick={handleScheduleAssessment}
                className={`${
                  Object.keys(payload).length === 2 && activeStep === 1
                    ? "bg-blue-400  text-white"
                    : "invisible "
                } border border-blue-400 w-[200px] h-[50px] p-2 font-medium rounded-[2px] `}
                disabled={!Object.keys(payload).length == 2 ? true : false}
              >
                Submit
              </button>
            </div>
            <div className="footer flex flex-row justify-between mt-4">
              <Button
                onClick={() => {
                  closeSchedule(false);
                }}
                moreClass={`${
                  activeStep === 0
                    ? "border border-gray-500 bg-white text-gray-500 p-0 w-1/6 "
                    : "invisible"
                }`}
                text="Close"
              ></Button>
              <Button
                onClick={handleNext}
                // disabled={isLastStep}
                disabled={!Object.keys(payload).length == 2 ? true : false}

                moreClass={`${
                  activeStep === 0 && Object.keys(payload).length === 2 && initialAssessorSecondDivision === true
                    ? "border border-blue-400 bg-blue-400 text-white w-1/6 "
                    : "invisible"
                    // : "cursor-not-allowed border border-gray-500 bg-white text-gray-500 w-1/6"
                }`}
                text="Next"
              ></Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ScheduleInspectionModal;
