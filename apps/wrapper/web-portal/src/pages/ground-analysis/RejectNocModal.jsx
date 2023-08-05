import React, { useContext, useState } from "react";
import { getRejectApplicant } from "../../api";
import { ContextAPI } from "../../utils/ContextAPI";

import { Button } from "../../components";

function RejectNocModal({ closeRejectModal, setRejectStatus }) {
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const [comment, setComment] = useState("");
  const { setSpinner,setToast } = useContext(ContextAPI);

  const handleRejectApplicant = async () => {
    if (comment.length === 0) {
      console.log("enter something");
    } else {
      const postData = {
        form_id: 22,
        remarks: comment,
        date: new Date().toISOString().substring(0, 10),
      };
      try {
        setSpinner(true);
        const res = await getRejectApplicant(postData);
        const formStatus =
          res?.data?.update_form_submissions?.returning[0]?.form_status;
        setRejectStatus(formStatus === "Rejected" ? true : false);
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "The form is rejected!",
          toastType: "success",
        }));
        closeRejectModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setSpinner(false);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]">
          <div className="flex flex-col gap-4">
            <div className="title flex font-bold">
              <h1>Reason for rejection</h1>
            </div>
            <div className="body">
              <textarea
                onChange={handleChange}
                placeholder="Write here"
                className="border w-[520px] h-[160px] p-2 rounded-xl resize-none"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="footer flex flex-row justify-between">
              <button
                onClick={() => {
                  closeRejectModal(false);
                }}
                className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Close
              </button>
              <button
                onClick={handleRejectApplicant}
                className={`${
                  comment
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                } border w-[140px] h-[40px] font-medium rounded-[4px] `}
                disabled={!comment ? true : false}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RejectNocModal;
