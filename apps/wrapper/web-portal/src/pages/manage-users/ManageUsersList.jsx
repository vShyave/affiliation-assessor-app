import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate } from "../../utils/common";
import { getOnGroundAssessorData, markReviewStatus } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";


const ManageUsersList = () => {
    const navigation = useNavigate();
    var resData = {};
    var formsDataList = [];
    resData.formsDataList = formsDataList;
    const [formsList, setFormsList] = useState();
    const COLUMNS = [
        {
          Header: "Applicant",
          accessor: "applicant",
        },
        {
          Header: "Form name",
          accessor: "display_form_name",
        },
        {
          Header: "Assessor",
          accessor: "assessor",
        },
        {
          Header: "Assisting Assessor",
          accessor: "assisting_assessor",
        },
        {
          Header: "Published on",
          accessor: "published_on",
        },
        {
          Header: 'Status',
          accessor: 'status'
        }
      ];
  
    const navigateToView = (formObj) => {
      const navigationURL = `${ADMIN_ROUTE_MAP.manageUsers.viewForm}/${formObj?.original?.form_name}/${formObj?.original?.id}`;
      navigation(navigationURL);
      const postData = { form_id: formObj?.original?.id };
      markStatus(postData);
    }
  
    const markStatus = async (postData) => {
      try {
        const res = await markReviewStatus(postData);
      } catch (error) {
        console.log("error - ", error);
      }
    };
  
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
  
    const getFormName = (formName) => {
      let splitValues = formName.split('_');
      const capitalizedStr = splitValues[0].charAt(0).toUpperCase() + splitValues[0].substr(1, splitValues.substr);
      splitValues[0] = capitalizedStr;
      return splitValues.join(' ');
    }
  
    const status_obj = {
      total: formsList?.length,
      submitted_today: 0,
      in_progress: 0,
      reviewed: 0,
      pending: 0 
    }
  
    formsList?.forEach((e) => {
      var formsData = {
        applicant:
          e?.institute?.name?.charAt(0).toUpperCase() +
          e?.institute?.name?.substring(1).toLowerCase() +
          ", " +
          e?.institute?.district?.charAt(0).toUpperCase() +
          e?.institute?.district?.substring(1).toLowerCase(),
        display_form_name: getFormName(e?.form_name),
        form_name: e?.form_name,
        assessor: e?.assessor?.name,
        assisting_assessor:
          e?.assessor?.assisstant == null ? "None" : e?.assessor?.assisstant,
        published_on: readableDate(e?.submitted_on),
        id: e.form_id,
        status: e?.review_status || 'NA'
      };
      resData.formsDataList.push(formsData);
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
  
   
  
 


    return (
        <>
            <div className='flex flex-col justify-center align-center'>
                <div className="flex flex-row ">
                        <h1 className="text-xl font-semibold">
                            Manage Users
                        </h1>
                    </div>
                <div className="flex flex-row items-center"> 
                
                    <div className="text-2xl w-full mt-4 font-medium">
                        <FilteringTable
                            formsList={resData}
                            navigateFunc={navigateToView}
                            columns={COLUMNS}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageUsersList
