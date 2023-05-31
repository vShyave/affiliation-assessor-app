import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormCard } from "../components";
import { FaAngleRight } from "react-icons/fa";
import { formService } from "../services";
import { getCookie } from "../utils";
import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";

const AllApplications = () => {
  const [loadingForms, setLoadingForms] = useState(false);
  const [availableForms, setAvailableForms] = useState([]);
  const instituteDetails = getCookie("institutes");
  const navigate = useNavigate();

  useEffect(() => {
    getAvailableForms();
  }, []);

  const getAvailableForms = async () => {
    if (!instituteDetails || !instituteDetails?.length) {
      return;
    }

    setLoadingForms(true);
    const requestPayload = {
      course_applied: instituteDetails[0].course_applied,
    };

    const formsResponse = await formService.getData(requestPayload);
    if (formsResponse?.data?.courses) {
      setAvailableForms(formsResponse?.data?.courses);
    }
    setLoadingForms(false);
  };

  const applyFormHandler = (formObj) => {
    console.log("formObj - ", formObj);
    const path = formObj.course_name.toLowerCase().split(" ").join("_");
    navigate(`${APPLICANT_ROUTE_MAP.dashboardModule.createForm}${path}`);
  };

  return (
    <>
      <div className="h-[48px] bg-white drop-shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}>
              <span className="text-primary-400 cursor-pointer">
                My Application
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Available Forms</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-3 min-h-[40vh]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="text-xl font-semibold">Application forms</div>
            {!loadingForms && availableForms.length === 0 && (
              <div className="text-sm">There is no form available</div>
            )}
            {!loadingForms && availableForms.length > 0 && (
              <div className="text-sm">
                These are the available forms for you to apply. Click on any of
                them to start filling
              </div>
            )}
          </div>

          {!loadingForms && availableForms.length > 0 && (
            <div className="flex flex-wrap">
              {availableForms.map((form, index) => (
                <FormCard form={form} key={index} onApply={applyFormHandler} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllApplications;
