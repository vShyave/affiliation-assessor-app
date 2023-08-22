import React, { useContext, useEffect, useState } from "react";

import { Button, Label } from "../../components";
import { getScheduleDetails } from "../../api";
import { readableDate } from "../../utils/common";

const PaymentModal = ({ closeViewSchedulesModal, scheduleUserData }) => {
  const [scheduleData, setScheduleData] = useState([]);

  const getScheduledData = async () => {
    const postData = {
      user_id: scheduleUserData?.user_id,
      date: new Date().toJSON().slice(0, 10),
    };
    const res = await getScheduleDetails(postData);
    setScheduleData(res.data.assessment_schedule);
  };

  useEffect(() => {
    getScheduledData();
  }, [scheduleUserData]);
  return (
    <div>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm z-[999]">
        <div className="flex flex-col bg-white rounded-xl shadow-xl border border-gray-400 w-[600px] h-[600px] p-8 gap-8">
          <section>
            <div className="flex flex-col justify-between w-full">
              <div className="font-bold text-2xl text-center mb-8">
                {scheduleUserData?.name?.trim() ||
                  scheduleUserData?.fname?.trim() +
                    scheduleUserData?.lname.trim()}
                's Schedule
              </div>

              <div
                className={`flex flex-col gap-3 min-h-[388px] max-h-[388px] overflow-y-auto ${
                  !scheduleData.length ? "justify-center" : ""
                }`}
              >
                {!scheduleData.length && (
                  <div className="text-xl font-bold text-center">
                    No Schedule found!
                  </div>
                )}
                {scheduleData?.map((data, index) => {
                  return (
                    <div
                      className="flex flex-col bg-gray-100 p-3 rounded-[4px] gap-3"
                      key={index}
                    >
                      <div className="flex flex-row gap-4">
                        <div className="flex-1 flex-col">
                          <Label text="Institute name"></Label>
                          <div className="text-lg">
                            {data?.institute?.name || "NA"}
                          </div>
                        </div>
                        <div className="flex-1 flex-col">
                          <Label text="District"></Label>
                          <div className="text-lg">
                            {data?.institute?.district || "NA"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <div className="flex-1 flex-col flex-grow">
                          <Label text="Inspection course"></Label>
                          <div className="text-lg">
                            {data?.institute?.course_applied || "NA"}
                          </div>
                        </div>
                        <div className="flex-1 flex-col flex-grow">
                          <Label text="Date"></Label>
                          <div className="text-lg">
                            {readableDate(data?.date) || "NA"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <footer>
            <div className="footer flex flex-row gap-4 justify-end">
              <Button
                onClick={() => {
                  closeViewSchedulesModal(false);
                }}
                moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                text="Close"
              ></Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
