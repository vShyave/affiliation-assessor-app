import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";

export default function Congratulations() {
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
            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.self_registration}>
              <span className="text-primary-400 cursor-pointer">Home</span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500">Self Registration</span>
          </div>
        </div>
      </div>
      <div className="px-3 min-h-[40vh] py-8 container mx-auto">
        <div className="flex flex-col py-4">
          <h1 className="text-xl font-semibold">Self Registration</h1>
        </div>
        <div className="flex flex-col gap-4 text-center bg-white p-40">
          <AiFillCheckCircle className="text-green-700 w-full text-6xl" />
          <h2 className="text-xl font-semibold">Congratulations!</h2>
          <p className="text-m">Self Registration process is completed.</p>
          <div className="flex place-items-end mx-auto gap-4">
            <Button
              moreClass="px-6 text-primary-600"
              style={{ backgroundColor: "#fff" }}
              text="Back to home"
              onClick={goBack}
            ></Button>
            <Button
              moreClass="px-6 text-white"
              text="Login"
              onClick={goToLogin}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
