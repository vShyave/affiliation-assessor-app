import React from "react";
import { Card, Button } from "./index";
import { readableDate } from "../utils";

const ApplicationCard = (props) => {
  let formName = props.application.form_name.slice(
    props.application.form_name.lastIndexOf("-") + 1
  );
  formName = formName.toUpperCase();

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
            className="text-xs text-green-500 p-1 rounded-md"
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
