import React, { useEffect, useState } from "react";
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
import { searchUsers } from "../../api";

const GlobalFilter = ({
  filter,
  setFilter,
  filterApiCall,
  searchApiCall,
  setIsSearchOpen,
  setIsFilterOpen,
  paginationInfo,
  setPaginationInfo
}) => {
  const [value, setValue] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  let location = useLocation();
  // const onChange = useAsyncDebounce((value) => {
  //   setFilter(value || undefined);
  // }, 1000);

  const handleSearch = async (value) => {
    setValue(value);
    setIsSearchOpen(value ? true : false);
    const postData = { searchString: `%${value}%` };
    setPaginationInfo((prevState) => ({
      ...prevState,
      offsetNo: 0,
    }));
    switch (location.pathname) {
      //Manage Users
      case ADMIN_ROUTE_MAP.adminModule.manageUsers.home: {
        const res = await searchApiCall(postData);
        return;
      }
      //Manage Forms
      case ADMIN_ROUTE_MAP.adminModule.manageForms.home: {
        const res = await searchApiCall(postData);
        return;
      }
      //Desktop Analysis
      case ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home: {
        const res = await searchApiCall(postData);
        return;
      }
      //On-Ground Inspection Analysis
      case ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home: {
        const res = await searchApiCall(postData);
        return;
      }
      //Schedule Management
      case ADMIN_ROUTE_MAP.adminModule.scheduleManagement.home: {
        const res = await searchApiCall(postData);
        return;
      }
    }
  };

  useEffect(() => {
    if (value !== "") {
      handleSearch(value);
    }
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  return (
    <div className="mb-3">
      <div className="flex flex-row justify-between">
        <div className="mb-4 bg-white flex w-1/4 items-stretch">
          <input
            value={value || ""}
            onChange={(e) => {
              // setValue(e.target.value);
              handleSearch(e.target.value);
            }}
            type="search"
            className="m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
          />
        </div>
        <div
          className="flex flex-row gap-2 mx-auto mr-0 cursor-pointer"
          onClick={() => setIsFilter(!isFilter)}
        >
          <MdFilterList className=" mt-2 text-gray-500 " />
          <h6 className="text-base mt-2 text-gray-500 font-semibold">Filter</h6>
        </div>

        <div>
          {/* <!--Search icon--> */}
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg> */}
        </div>
      </div>
      {isFilter && (
        <div>
          {(() => {
            switch (location.pathname) {
              //Manage Users
              case ADMIN_ROUTE_MAP.adminModule.manageUsers.home:
                return (
                  <ManageUsersFilters
                    filterApiCall={filterApiCall}
                    paginationInfo={paginationInfo}
                    setIsFilterOpen={setIsFilterOpen}
                    setPaginationInfo={setPaginationInfo}
                  />
                );
              //Manage Forms
              case ADMIN_ROUTE_MAP.adminModule.manageForms.home:
                return (
                  <ManageFormsFilters
                    filterApiCall={filterApiCall}
                    paginationInfo={paginationInfo}
                    setIsFilterOpen={setIsFilterOpen}
                    setPaginationInfo={setPaginationInfo}
                  />
                );
              //Desktop Analysis
              case ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.home:
                return (
                  <DesktopAnalysisFilters
                    filterApiCall={filterApiCall}
                    paginationInfo={paginationInfo}
                    setIsFilterOpen={setIsFilterOpen}
                    setPaginationInfo={setPaginationInfo}
                  />
                );
              //On-Ground Inspection Analysis
              case ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home:
                return (
                  <OnGroundInspectionFilters
                    filterApiCall={filterApiCall}
                    paginationInfo={paginationInfo}
                    setIsFilterOpen={setIsFilterOpen}
                    setPaginationInfo={setPaginationInfo}
                  />
                );
              //Schedule Management
              case ADMIN_ROUTE_MAP.adminModule.scheduleManagement.home:
                return (
                  <ScheduleManagementFilters
                    filterApiCall={filterApiCall}
                    paginationInfo={paginationInfo}
                    setIsFilterOpen={setIsFilterOpen}
                    setPaginationInfo={setPaginationInfo}
                  />
                );
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default GlobalFilter;
