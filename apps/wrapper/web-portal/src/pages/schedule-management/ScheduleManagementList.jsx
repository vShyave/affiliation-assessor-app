import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { MdFileUpload, MdEdit, MdDelete } from "react-icons/md";

import FilteringTable from "../../components/table/FilteringTable";
import Card from "../../components/Card";
import { Button } from "../../components";

import { getAssessmentSchedule } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

const ScheduleManagementList = () => {
  const navigation = useNavigate();
  var resUserData = [];
  const [assessmentScheduleList, setAssessmentScheduleList] = useState();
  const [scheduleTableList, setScheduleTableList] = useState([]);

  const COLUMNS = [
    {
      Header: "#",
      accessor: "scheduled_application_sno",
    },
    {
      Header: "District",
      accessor: "district",
    },
    {
      Header: "Parent center code",
      accessor: "parent_center_code",
    },
    {
      Header: "Child center code",
      accessor: "child_center_code",
    },
    {
      Header: "Institute name",
      accessor: "institute_name",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Assessment date",
      accessor: "assessment_date",
    },
    {
      Header: "Assessor IDs",
      accessor: "assessor_id",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "",
      accessor: "more_actions",
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

  const fetchAllAssessmentSchedule = async () => {
    // const formData = new FormData();
    // formData.append("offsetNo", Number(0));
    // formData.append("limit", Number(10));
    try {
      const res = await getAssessmentSchedule();
      setAssessmentScheduleList(res?.data?.assessment_schedule);
      const data = res?.data?.assessment_schedule;
      setScheduleTableList(
        data.map((e) => ({
          scheduled_application_sno: e?.id,
          district: e?.institute?.district,
          parent_center_code: "-",
          child_center_code: "-",
          institute_name: e?.institute?.name,
          type: '-',
          assessment_date: e?.date,
          assessor_id: e?.assessor_code,
          status: new Date(e?.date)> new Date()?"Scheduled":new Date(e?.date)<new Date() && e?.institute?.form_submissions.length?"Completed":"Closed",
          more_actions: (
            <div className="flex flex-row text-2xl font-semibold">
              <button
              //   onClick={() => navigateToUpdate(e)}
              >
                ...
              </button>
            </div>
          ),
        }))
      );
    } catch (error) {
      console.log("error - ", error);
    }
  };
  useEffect(() => {
    fetchAllAssessmentSchedule();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-2xl font-medium">Schedule management</h1>
            </div>
            <div className="flex justify-end">
              <span className="flex gap-4">
                <button className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[200px] h-[45px] text-md font-medium rounded-[4px]">
                  Download CSV template
                </button>
                <Button
                  onClick={() =>
                    navigation(
                      ADMIN_ROUTE_MAP.adminModule.scheduleManagement.uploadForm
                    )
                  }
                  moreClass="text-white"
                  text="Upload CSV for scheduling"
                ></Button>
              </span>
            </div>
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
      </div>
      <div className="flex flex-row items-center">
        <div className="text-2xl w-full mt-4 font-medium">
          <FilteringTable
            dataList={scheduleTableList}
            columns={COLUMNS}
            navigateFunc={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default ScheduleManagementList;
