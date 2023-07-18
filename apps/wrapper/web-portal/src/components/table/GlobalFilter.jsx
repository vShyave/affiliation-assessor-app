import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { MdFilterList } from "react-icons/md";
import { useLocation } from "react-router-dom";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import {
  DesktopAnalysisFilters,
  ManageFormsFilters,
  ManageUsersFilters,
  OnGroundInspectionFilters,
  ScheduleManagementFilters,
} from "./Filters";

const GlobalFilter = ({ filter, setFilter, filterApiCall }) => {
  const [value, setValue] = useState(filter);
  const [isFilter, setIsFilter] = useState(false);
  let location = useLocation();
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="bg-white flex w-1/4 items-stretch">
          <input
            value={value || ""}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            type="search"
            className="block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding p-2  text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-end">
          <div
            className="flex flex-row gap-2 cursor-pointer items-center"
            onClick={() => setIsFilter(!isFilter)}
          >
            <MdFilterList className="text-gray-500" />
            <h6 className="text-base text-gray-500 font-semibold">Filter</h6>
          </div>
        </div>
      </div>
      {isFilter && (
        <div>
          {(() => {
            switch (location.pathname) {
              //Manage Users
              case ADMIN_ROUTE_MAP.adminModule.manageUsers.home:
                return <ManageUsersFilters filterApiCall={filterApiCall} />;
              //Manage Forms
              case ADMIN_ROUTE_MAP.adminModule.manageForms.home:
                return <ManageFormsFilters filterApiCall={filterApiCall} />;
              //Desktop Analysis
              case ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home:
                return <DesktopAnalysisFilters filterApiCall={filterApiCall} />;
              //On-Ground Inspection Analysis
              case ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home:
                return (
                  <OnGroundInspectionFilters filterApiCall={filterApiCall} />
                );
              //Schedule Management
              case ADMIN_ROUTE_MAP.adminModule.scheduleManagement.home:
                return (
                  <ScheduleManagementFilters filterApiCall={filterApiCall} />
                );
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default GlobalFilter;
