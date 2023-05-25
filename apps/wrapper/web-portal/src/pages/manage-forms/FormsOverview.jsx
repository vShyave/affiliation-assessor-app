import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card,Button } from '../../components';
import FilteringTable from '../../components/table/FilteringTable';
import ADMIN_ROUTE_MAP from '../../routes/adminRouteMap';
import { markReviewStatus } from '../../api';
import { getOnGroundAssessorData } from '../../api';
import { readableDate } from '../../utils/common';

const FormsOverview = () => {
    const navigation = useNavigate();
    var formsDataList = [];
    const [formsList, setFormsList] = useState();
    const[state,setState] = useState({
        menu_selected: "create_new"
    })

    const COLUMN = [
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
        const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.onGroundInspection.viewForm}/${formObj?.original?.form_name}/${formObj?.original?.id}`;
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

    const handleSelectMenu = (menuItem) => {
        setState((prevState)=>({...prevState,menu_selected:menuItem}))
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
          assessor: e?.assessor?.name || 'NA',
          assisting_assessor:
            e?.assessor?.assisstant == null ? "None" : e?.assessor?.assisstant,
          published_on: readableDate(e?.submitted_on),
          id: e.form_id,
          status: e?.review_status || 'NA'
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
    



    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-medium">Manage Forms</h1>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2" onClick={()=>(handleSelectMenu("create_new"))}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${(state.menu_selected === 'create_new') ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                  Create New
                </a>
              </li>
              <li className="mr-2" onClick={()=>(handleSelectMenu("draft"))}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${(state.menu_selected === 'draft') ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                  aria-current="page">
                  Draft
                </a>
              </li>
              <li className="mr-2" onClick={()=>(handleSelectMenu("published"))}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${(state.menu_selected === 'published') ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}>
                  Published
                </a>
              </li>
            </ul>
                    </div>
                </div>   
                {state.menu_selected==="create_new" && <div className="flex flex-col gap-4">
                    <Card moreClass="flex h-[50vh]">
                        <div className="flex flex-col gap-4 m-auto items-center">
                            <div className='font-semibold text-xl'>Select the option to a create a form</div>
                            <Button moreClass="text-white w-3/5" text="Upload ODK" onClick={()=>(navigation("/manage-forms/create-form"))} />
                            Or
                            <Button moreClass="text-white w-3/5" text="Configure Manually" />
                        </div>
                    </Card>
                </div>}
                {state.menu_selected==="draft" && <div className="text-2xl mt-4 font-medium">
                    <FilteringTable
                        dataList={formsDataList}
                        navigateFunc={()=>{}}
                        columns={COLUMN}
                    />
                </div>}
                {state.menu_selected==="published" && <div className="text-2xl mt-4 font-medium">
                    <FilteringTable
                        dataList={formsDataList}
                        navigateFunc={()=>{}}
                        columns={COLUMN}
                    />
                </div>}
            </div>
            
        </>
    )
}

export default FormsOverview
