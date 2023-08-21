import React from "react";
import { Card, Button } from "./index";
import { readableDate } from "../utils";

const ApplicationCard = (props) => {
  let formName = props?.application?.course?.course_name?.trim() || "NA";

  return (
    <Card moreClass="flex flex-col border-gray-100 m-3 gap-5 w-[300px] border-[1px] drop-shadow justify-between">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">{formName}</div>
        <div className="text-sm">
          Submitted on: {readableDate(props.application.submitted_on)}
        </div>
        <div className="text-sm">
          {" "}
          <span
            className={`text-xs p-1 rounded-md ${
              props.application.form_status?.toLowerCase() === "in progress"
                ? "text-yellow-800"
                : props.application.form_status?.toLowerCase() === "resubmitted"
                ? "text-indigo-700"
                : props.application.form_status?.toLowerCase() ===
                  "inspection scheduled"
                ? "text-blue-400"
                : props.application.form_status?.toLowerCase() ===
                  "application submitted"
                ? "text-green-400"
                : props.application.form_status?.toLowerCase() === "returned"
                ? "text-red-400"
                : props.application.form_status?.toLowerCase() ===
                  "oga completed"
                ? "text-purple-400"
                : props.application.form_status?.toLowerCase() === "approved"
                ? "text-teal-400"
                : props.application.form_status?.toLowerCase() === "rejected"
                ? "text-pink-400"
                : "text-black-500"
            }`}
            style={{ backgroundColor: "#eee" }}
          >
            Status: {props.application.form_status}
          </span>
        </div>
      </div>

      <div className="flex">
        <Button
          moreClass="text-primary-500 font-bold uppercase border-gray-500 text-primary-400"
          style={{ backgroundColor: "#fff" }}
          text="View Application "
          onClick={props.onView ? () => props.onView(props.application) : null}
        ></Button>
      </div>
    </Card>
  );
};

export default ApplicationCard;
