import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import { formatDate } from "../../utils/common";

import {
  getUsersForScheduling,
  getScheduleAssessment,
  getDesktopAnalysisForms,
} from "../../api";

import { Button, Label } from "../../components";

import { Select, Option } from "@material-tailwind/react";
import Toast from "../../components/Toast";

function ScheduleInspectionModal({ closeSchedule,setToast }) {
  // const [formStatus, setFormStatus] = useState({});

  const [date, setDate] = useState(new Date());
  const [payload, setPayload] = useState({});
  const [assessorList, setAssessorList] = useState([]);
  const instituteId = window.location.pathname.split("/")[4];

 

  const onAssessorSelect = (e) => {
    setPayload((prevState) => ({ ...prevState, assessorCode: e.target.value }));
  };

  const onChangeDate = async (date) => {
    let tempDate = formatDate(date);

    setPayload((prevState) => ({ ...prevState, date: tempDate }));
    const postData = { todayDate: tempDate };
    const res = await getUsersForScheduling(postData);
    console.log("res", res);

    setAssessorList(() =>
      res.data.assessors.map((item) => ({
        user_id: item.user_id,
        name: item.name,
        code: item.code,
      }))
    );
  };

  const handleScheduleAssessment = async () => {
    const formData = new FormData();

    formData.append("instituteId", instituteId);

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    console.log(Object.fromEntries(formData));
    try {
      const res = await getScheduleAssessment(formData);

      console.log("res", res);

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
      closeSchedule(false)
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
     
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[560px] h-[600px] p-8">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex text-xl font-semibold">
              <h1>Schedule Assessment</h1>
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              <div className="flex flex-col items-center bg-white p-8">
                <Calendar onChange={onChangeDate} minDate={new Date()} />
              </div>

              <div className="flex flex-col rounded-xl gap-1 bg-white px-14">
                <Label
                  htmlFor={"assessor_name"}
                  required
                  text="Select Assessor"
                  moreClass="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                ></Label>

                <select
                  key={"assessor_name"}
                  name="assessor_name"
                  label="Assessor Name"
                  onChange={onAssessorSelect}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* <Option value='' >Select Assessor</Option> */}

                  <option value="">Select here</option>

                  {assessorList &&
                    assessorList.map((item) => (
                      <option key={item.user_id} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="footer flex flex-row justify-between mt-8">
              <Button
                onClick={() => {
                  closeSchedule(false);
                }}
                moreClass="border border-gray-500 bg-white text-gray-500 p-0 w-[140px]"
                text="Close"
              ></Button>

              <button
                onClick={handleScheduleAssessment}
                // moreClass="border text-white w-[140px]"
                // text=""
                // disabled={!selectedAssessorId ? true : false}
                className={`${Object.keys(payload).length==2?"bg-blue-500 text-white":"bg-gray-200 text-gray-500 cursor-not-allowed"} border w-[140px] p-2 h-[40px] font-medium rounded-[4px] `} disabled={!Object.keys(payload).length==2?true:false}
              >Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleInspectionModal;
