import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";

import FilteringTable from "../../components/table/FilteringTable";
import Card from "../../components/Card";

import {
  filterDesktopAnalysis,
  getDesktopAnalysisForms,
  markReviewStatus,
} from "../../api";
import { getFieldName, readableDate } from "../../utils/common";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

const DesktopAnalysisList = () => {
  const navigation = useNavigate();
  var formsDataList = [];
  const [formsList, setFormsList] = useState();
  const [state, setState] = useState({
    menu_selected: "new",
  });

  const COLUMNS = [
    {
      Header: "Form title",
      accessor: "form_title",
    },
    {
      Header: "Application type",
      accessor: "application_type",
    },
    {
      Header: "Course name",
      accessor: "course_name",
    },
    {
      Header: "Published on",
      accessor: "published_on",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "",
      accessor: "schedule",
    },
  ];

  const cardArray = [
    {
      value: 0,
      key: "total_pending",
      text: "Total pending",
    },
    {
      value: 0,
      key: "submitted_today",
      text: "Received today",
    },
    {
      value: 0,
      key: "in_progress",
      text: "In progress",
    },
    {
      value: 0,
      key: "reviewed_today",
      text: "Reviewed today",
    },
    {
      value: 0,
      key: "reviewed_in_total",
      text: "Reviewed in total",
    },
  ];

  const handleSelectMenu = (menuItem) => {
    setState((prevState) => ({ ...prevState, menu_selected: menuItem }));
  };

  const navigateToView = (formObj) => {
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.desktopAnalysis.viewForm}/${formObj?.original?.form_title}/${formObj?.original?.id}`;
    navigation(navigationURL);
    const postData = { form_id: formObj?.original?.id };
    markStatus(postData);
  };

  const markStatus = async (postData) => {
    try {
      const res = await markReviewStatus(postData);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  useEffect(() => {
    fetchDesktopAnalysisForms();
  }, []);

  const fetchDesktopAnalysisForms = async () => {
    const pagination = { offsetNo: 0, limit: 10 };
    try {
      const res = await getDesktopAnalysisForms(pagination);
      setFormsList(res?.data?.form_submissions);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const filterApiCall = async (filters) => {
    const postData = { offsetNo: 0, limit: 10, ...filters };
    try {
      const res = await filterDesktopAnalysis(postData);
      setFormsList(res?.data?.form_submissions);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const status_obj = {
    total_pending: formsList?.length,
    submitted_today: 0,
    in_progress: 0,
    reviewed_today: 0,
    reviewed_in_total: 0,
  };

  formsList?.forEach((e) => {
    var formsData = {
      form_title: getFieldName(e?.form_name),
      application_type:
        e?.assessment_type?.charAt(0).toUpperCase() +
        e?.assessment_type?.substring(1).toLowerCase(),
      course_name:
        e?.institute?.course_applied?.charAt(0).toUpperCase() +
          e?.institute?.course_applied?.substring(1).toLowerCase() || "NA",
      published_on: readableDate(e?.submitted_on),
      id: e.form_id,
      status: e?.review_status || "NA",
    };
    formsDataList.push(formsData);
    if (e.submitted_on === new Date().toJSON().slice(0, 10)) {
      status_obj.submitted_today++;
    }
    if (e.review_status === null) {
      status_obj.pending++;
    } else if (e.review_status?.toLowerCase() === "in progress") {
      status_obj.in_progress++;
    } else if (e.review_status?.toLowerCase() === "reviewed") {
      status_obj.reviewed++;
    }
  });

  cardArray.forEach((obj) => {
    obj.value = status_obj[obj.key];
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-medium">Your activity</h1>
          </div>
          <div className="flex flex-wrap">
            {cardArray.map((obj, index) => (
              <Card
                moreClass="shadow-md w-[200px] h-[100px] m-3 first:ml-0"
                key={index}
              >
                <div className="flex flex-col place-items-start justify-center gap-2">
                  <h3 className="text-xl font-semibold">{obj.value}</h3>
                  <p className="text-sm font-medium text-gray-700">
                    {obj.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-medium">All applications</h1>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="w-72 bg-white rounded-[8px]">
                {/* <Select value="1" label="Select round" onChange={(value)=>{console.log(value)}}>
                  <Option value="1">Round one</Option>
                  <Option value="2">Round two</Option>
                </Select> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2" onClick={() => handleSelectMenu("new")}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "new"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  New
                </a>
              </li>
              <li className="mr-2" onClick={() => handleSelectMenu("rejected")}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "rejected"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                  aria-current="page"
                >
                  Rejected
                </a>
              </li>
              <li
                className="mr-2"
                onClick={() => handleSelectMenu("resubmitted")}
              >
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "resubmitted"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Resubmitted
                </a>
              </li>
              <li
                className="mr-2"
                onClick={() => handleSelectMenu("sent_for_inspection")}
              >
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "sent_for_inspection"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Sent for inspection
                </a>
              </li>
            </ul>
            {/* <div>create a search bar and filter component here</div> */}
            {/* table creation starts here */}

            <div className="text-2xl mt-4 font-medium">
              <FilteringTable
                dataList={formsDataList}
                navigateFunc={navigateToView}
                columns={COLUMNS}
                pagination={true}
                onRowSelect={() => {}}
                filterApiCall={filterApiCall}
                showFilter={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DesktopAnalysisList;
