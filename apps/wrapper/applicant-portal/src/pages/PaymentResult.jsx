import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "../components";

import { AiFillCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";

export default function PaymentResult() {
  let [ params , setParams ] = useSearchParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToLogin = () => {
    navigate(APPLICANT_ROUTE_MAP.loginModule.login);
  };

  return (
    <>
      <div className="h-[48px] bg-white drop-shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.all_applications}>
              <span className="text-primary-400 cursor-pointer">
                All applications
              </span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Payment result</span>
          </div>
        </div>
      </div>
      <div className="px-3 min-h-[40vh] py-8 container mx-auto">
        <div className="flex flex-col py-4">
          <h1 className="text-xl font-semibold">Payment</h1>
        </div>
                
        <div className="flex flex-col gap-1 text-center bg-white p-40">
          {params.get('resp') === "success" ? (
            <AiFillCheckCircle className="text-green-700 w-full text-6xl" />
          ) : (
            <RxCrossCircled className="text-red-700 w-full text-6xl" />
          )}

          <h2
            className={`${
                params.get('resp') === "success"
                ? "text-2xl font-semibold text-green-700 mb-4"
                : "text-2xl font-semibold text-red-700 mb-4"
            }`}
          >
            {params.get('resp') === "success" ? "Payment success" : "Payment failure"}
          </h2>
          <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black">
            Transaction amount : 10000
          </h2>
          <h2
            className={`${
                params.get('resp') == "success"
                ? "text-xl font-semibold text-black"
                : "invisible"
            }`}
          >
            Tranction Id : 1234
          </h2>
          </div>
        </div>
      </div>
    </>
  );
}
