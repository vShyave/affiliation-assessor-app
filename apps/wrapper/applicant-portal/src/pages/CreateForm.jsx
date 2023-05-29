import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";

const CreateForm = () => {
  return (
    <div>
      <div className="h-[48px] bg-white drop-shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}>
              <span className="text-primary-400 cursor-pointer">
                My Application
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Create form</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-3 min-h-[40vh]">
        <div className="bg-white min-h-[40vh]"></div>
      </div>
    </div>
  );
};

export default CreateForm;
