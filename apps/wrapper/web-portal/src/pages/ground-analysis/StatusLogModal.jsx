import React, { useEffect, useState } from "react";
import { getStatus } from "../../api";
import { readableDate } from "../../utils/common";
import { Button } from "../../components";

function StatusLogModal({ closeStatusModal, formId }) {
  const [formStatus, setFormStatus] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const postData = { id: formId };
      console.log("POstdtaa", postData);
      const res = await getStatus(postData);
      console.log("res here - ", res);
      setFormStatus(res.events);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[560px] h-[460px] p-8">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex text-xl font-medium">
              <h1>Status log</h1>
            </div>

            <div className={`flex flex-col overflow-auto min-h-[288px]`}>
              {formStatus.length > 0 ? (
                formStatus.map((obj) => (
                  <div
                    className="flex flex-col rounded-xl gap-1 border bg-gray-100 p-4 mb-4"
                    key={obj?.event_id}
                  >
                    <p className="font-medium">{obj?.event_name}</p>
                    <p className="text-sm">{obj?.remarks}</p>
                    <p className="text-sm text-gray-600">
                      {readableDate(obj?.created_date)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-medium">No events available</p>
              )}
            </div>
            <div className="footer flex flex-row justify-end">
              <Button
                onClick={() => {
                  closeStatusModal(false);
                }}
                moreClass="border boevent_namerder-blue-500 bg-white text-blue-500 w-[140px]"
                text="Close"
              ></Button>
              {/* <button onClick={() => {closeStatusModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatusLogModal;
