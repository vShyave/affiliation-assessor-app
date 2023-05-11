import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Select, Option } from "@material-tailwind/react";


// import Table from "../../components/table/Table";
import FilteringTable from "../../components/table/FilteringTable";
// import PaginationTable from "../../components/table/PaginationTable";
import Card from "../../components/Card";

import { readableDate } from "../../utils/common";
import { getOnGroundAssessorData } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

export default function OnGroundInspectionAnalysis() {
  const navigation = useNavigate();
  var resData = {};
  var formsDataList = [];
  resData.formsDataList = formsDataList;
  const [formsList, setFormsList] = useState();

  const cardArray = [
    {
      value: 12,
      key: 'total_pending',
      text: 'Total pending'
    },
    {
      value: 8,
      key: 'received_today',
      text: 'Received today'
    },
    {
      value: 2,
      key: 'in_progress',
      text: 'In progress'
    },
    {
      value: 3,
      key: 'review',
      text: 'Review'
    },
    {
      value: 312,
      key: 'reviewed_in_total',
      text: 'Reviewed in total'
    }
  ]

  const navigateToView = (formObj) => {
    const navigationURL = `${ADMIN_ROUTE_MAP.onGroundInspection.viewForm}/${formObj?.original?.form_name}/${formObj?.original?.id}`;
    navigation(navigationURL);
  }

  useEffect(() => {
    fetchOnGroundAssessorData();
  }, []);

  const fetchOnGroundAssessorData = async () => {
    try {
      const res = await getOnGroundAssessorData();
      setFormsList(res?.data?.form_submissions);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  formsList?.forEach((e) => {
    var formsData = {
      applicant:
        e.institute.name.charAt(0).toUpperCase() +
        e.institute.name.substring(1).toLowerCase() +
        ", " +
        e.institute.district.charAt(0).toUpperCase() +
        e.institute.district.substring(1).toLowerCase(),
      form_name: e.form_name,
      assessor: e.assessor.name,
      assisting_assessor:
        e.assessor.assisstant == null ? "None" : e.assessor.assisstant,
      published_on: readableDate(e.submitted_on),
      id: e.form_id,
    };
    resData.formsDataList.push(formsData);
  });

  return (
  <>
    <div className="flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-medium">Your activity</h1>
          </div>
          <div className="flex flex-wrap">
            {
              cardArray.map(
                (obj) => (
                  <Card moreClass="shadow-md w-[200px] h-[100px] m-3 first:ml-0">
                    <div className="flex flex-col place-items-start justify-center gap-2">
                      <h3 className="text-xl font-semibold">{obj.value}</h3>
                      <p className="text-sm font-medium text-gray-700">{obj.text}</p>
                    </div>
                  </Card>
                )
              )
            }
          </div>
        </div>

       <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-medium">All applications</h1>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">              
                <div className="w-72 bg-white">
                  <Select label="Select round">
                    <Option>Round one</Option>
                    <Option>Round two</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

        <div className="flex flex-col">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <a
                    href="#"
                    className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-600">
                    New
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg active hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    aria-current="page">
                    Approved
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                    Rejected
                  </a>
                </li>
              </ul>
              {/* <div>create a search bar and filter component here</div> */}
              {/* table creation starts here */}

              <div className="text-2xl mt-4 font-medium">
                <FilteringTable
                  formsList={resData}
                  navigateFunc={navigateToView}
                />
              </div>
          </div>
       </div>
    </div>
  </>
  );
}
