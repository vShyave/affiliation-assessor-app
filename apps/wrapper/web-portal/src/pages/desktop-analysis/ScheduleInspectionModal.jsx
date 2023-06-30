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

import Toast from "../../components/Toast";
import MultiSelect from "./SelectMultiple";

function ScheduleInspectionModal({ closeSchedule, setToast, instituteId }) {
  // const [formStatus, setFormStatus] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [date, setDate] = useState(new Date());
  const [payload, setPayload] = useState({});
  const [assessorList, setAssessorList] = useState([]);

  const onAssessorSelect = (e) => {
    setPayload((prevState) => ({ ...prevState, assessorCode: e.value }));
    console.log(payload)
  };

  const onChangeDate = async (date) => {
    let tempDate = formatDate(date);

    setPayload((prevState) => ({ ...prevState, date: tempDate }));
    const postData = { todayDate: tempDate };
    const res = await getUsersForScheduling(postData);
  
   setAssessorList(res?.data?.assessors.map((item) => ({
    value: item.code,
    label: item.name
      })));

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
      console.log("error - ", error);
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
  };
 

  return (
    <>
      <div className="flex flex-col justify-center  items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[960px] h-fit p-8">
          <div className="flex flex-col justify-between gap-4 w-full">
            <div className="w-full py-4 px-8">
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
              </Stepper>
            </div>
            {activeStep === 0 && (
              <>
                <div className="flex text-xl font-semibold">
                  <h1>Schedule the inspection</h1>
                </div>

                <div className="flex flex-row gap-1 justify-between">
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
                          onChange={onAssessorSelect}
                          options={assessorList}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {/* <Option value='' >Select Assessor</Option> */}


                        </Select>

                        <Button
                          onClick={() => {
                            closeSchedule(false);
                          }}
                          moreClass="border border-blue-700 bg-white text-blue-700 w-1/4"
                          text="Add"
                        ></Button>
                      </span>

                      <div className="bg-gray-100 items-center flex gap-4 border border-gray-100 rounded-xl p-1 mt-4">
                        <span className="border-green-500 w-[36px] h-3/4 items-center  bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          {getInitials("Akansh Dhyani")} 
                        </span>
                        <span className="font-semibold">{}</span>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl border border-gray-300 h-1/2 p-4">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Add assisting assessor"
                        moreClass="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <span className="flex flex-row gap-2">
                        <MultiSelect/>

                        {/* <select
                          key={"assessor_name"}
                          name="assessor_name"
                          label="Assessor Name"
                          onChange={onAssessorSelect}
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
                        <Button
                          onClick={() => {
                            closeSchedule(false);
                          }}
                          moreClass="border border-blue-700 bg-white text-blue-700 w-1/4"
                          text="Add"
                        ></Button>
                      </span>
                      <div className="flex gap-4 items-center bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
                        <span className="border-green-500 w-[36px] h-3/4 items-center  bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          {/* {getInitials(item.name)}  */}SK
                        </span>
                        <span className="font-semibold">Sheela Kumari</span>
                      </div>
                      <div className="flex gap-4 items-center mb-4 bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
                        <span className="border-green-500 w-[36px] h-3/4 items-center bg-green-500 inline-flex justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          {/* {getInitials(regulator[0].full_name)} */}PV
                        </span>
                        <span className="font-semibold">Preksha Vijay</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between rounded-xl border border-gray-300 bg-white w-1/2 p-8">
                    <div className="font-semibold text-base">Select date</div>
                    <Calendar onChange={onChangeDate} minDate={new Date()} />
                    <div className="font-semibold text-base">
                      Date Selected:
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* <div className="mt-16 flex justify-between"> */}
            {activeStep === 1 && (
              <>
                <div className="flex text-xl font-semibold">
                  <h1>Select the applications</h1>
                </div>

                <div className="flex flex-row gap-1 justify-between">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col rounded-xl border border-gray-300 h-1/3 p-4">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Form filled by the institute"
                        moreClass="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <div className="bg-gray-100  items-center flex gap-4 border border-gray-100 rounded-xl mt-4">
                        <span className="font-semibold p-2">
                          Application name
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col rounded-xl border border-gray-300 h-3/4 p-2">
                      <Label
                        htmlFor={"assessor_name"}
                        required
                        text="Select other available forms"
                        moreClass="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-400"
                      ></Label>

                      <span className="flex flex-row">
                        <MultiSelect className="w-full" />
                        {/* <select
                         isMulti
                          key={"assessor_name"}
                          name="assessor_name"
                          label="Assessor Name"
                          onChange={onAssessorSelect}
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
                      <div className="flex gap-4 items-center bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
                        <span className=" w-[36px] h-3/4 items-center inline-fle justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400">
                          <GrDocumentPdf />
                        </span>
                        <span className="font-semibold p-2">Form name 1</span>
                      </div>
                      <div className="flex gap-4 items-center mb-4 bg-gray-100 border border-gray-100 rounded-xl p-1 mt-2">
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

            <div className="footer flex flex-row justify-between mt-4">
              <Button
                onClick={handlePrev}
                disabled={isFirstStep}
                moreClass={`${
                  activeStep === 1
                    ? "border border-blue-500 bg-blue-500 text-white w-1/6"
                    : "invisible"
                }`}
                text="Previous"
              ></Button>
              <button
                onClick={handleScheduleAssessment}
                className={`${
                  Object.keys(payload).length === 2 && activeStep === 1
                    ? "bg-blue-900  text-white"
                    : "bg-gray-200 text-gray-500 invisible cursor-not-allowed"
                } border border-blue-900 w-[140px]  h-[50px] p-2 font-medium rounded-[2px] `}
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
                disabled={isLastStep}
                moreClass={`${
                  activeStep === 0
                    ? "border border-blue-500 bg-blue-500 text-white w-1/6 "
                    : "invisible"
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
