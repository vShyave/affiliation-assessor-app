import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../../utils/common";

import { getUsersForScheduling,getScheduleAssessment } from "../../api";

import { Button , Label} from "../../components";
import { Select, Option } from "@material-tailwind/react";

function ScheduleInspectionModal({ closeSchedule }) {
  // const [formStatus, setFormStatus] = useState({});
  const [date, setDate] = useState(new Date());

  const [assessorList, setAssessorList] = useState([])
  const [selectedAssessorId, setSelectedAssessor] = useState(null)

  const onAssessorSelect = (value) => {
    setSelectedAssessor(value);
  }
 
 
  const onChangeDate = async(date) => {
    let tempDate = formatDate(date)
    const postData = {"todayDate": tempDate}
    
    const res = await getUsersForScheduling(postData);
    console.log('res',res)
    setAssessorList(()=>
      (res.data.assessors.map((item) => ({user_id:item.user_id,name:item.name})))
    )

  };

  const handleScheduleAssessment = async() => {
        
    const postData = { 
      "date": "2023-05-24", 
      "instituteId": 1, 
      "assessorCode": "Demo12"
      }
    const res = await getScheduleAssessment(postData)
    console.log('res',res)
    closeSchedule(false)
  }

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
                <Label required text="Select Assessor"></Label>
                <Select
                  key={"assessor_name"}
                  label="Assessor Name"
                  onChange={(value) => onAssessorSelect(value)}
                >
                  {/* <Option value='' >Select Assessor</Option> */}
                  {assessorList &&
                    assessorList.map((item) => (
                      <Option key={item.user_id} value={item.user_id}>
                        {item.name}
                      </Option>
                    ))
                  }
                  
                </Select>
                
              </div>
            </div>
            <div className="footer flex flex-row justify-between mt-8">
              <Button
                onClick={() => {
                  closeSchedule(false);
                }}
                moreClass="border border-gray-500 bg-white text-gray-500 w-[140px]"
                text="Close"
              ></Button>
              <Button
                  onClick={handleScheduleAssessment}
                  moreClass="border text-white w-[140px]"
                  text="Schedule"
                  disabled={!selectedAssessorId?true:false}
                  >
               </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleInspectionModal;
