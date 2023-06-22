import React from "react";
import CommonLayout from "../components/CommonLayout";
import ROUTE_MAP from "../routing/routeMap";

const ComingSoon = () => {
  return (
    <CommonLayout back={ROUTE_MAP.assessment_type}>
      <div className="flex flex-col px-5 py-8 items-center">
        <p className="text-secondary text-[28px] font-bold mt-4 lg:text-[45px] animate__animated animate__fadeIn">
          Coming Soon...
        </p>
      </div>
    </CommonLayout>
  );
};

export default ComingSoon;
