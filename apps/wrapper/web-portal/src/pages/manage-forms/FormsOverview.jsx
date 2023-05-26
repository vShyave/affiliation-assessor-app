import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { getForms, markReviewStatus, publishForms } from "../../api";
import { getOnGroundAssessorData } from "../../api";
import { readableDate } from "../../utils/common";
import Toast from "../../components/Toast";

const FormsOverview = () => {
  const navigation = useNavigate();
  var formsDataList = [];
  const [formsList, setFormsList] = useState();
  const [state, setState] = useState({
    menu_selected: "create_new",
  });
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

  const COLUMN_DRAFTS = [
    {
      Header: "Form title",
      accessor: "title",
    },
    {
      Header: "Application type",
      accessor: "application_type",
    },
    {
      Header: "Round no.",
      accessor: "round",
    },
    {
      Header: "Course type",
      accessor: "course_type",
    },
    {
      Header: "Created on",
      accessor: "created_at"
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];

  const COLUMN_PUBLISHED = [
    {
      Header: "Form title",
      accessor: "title",
    },
    {
      Header: "Application type",
      accessor: "application_type",
    },
    {
      Header: "Round no.",
      accessor: "round",
    },
    {
      Header: "Course Name",
      accessor: "course_type",
    },
    {
      Header: "Published on",
      accessor: "updated_at"
    }
  ];

  const navigateToView = (formObj) => {
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.onGroundInspection.viewForm}/${formObj?.original?.form_name}/${formObj?.original?.id}`;
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

  const handleSelectMenu = (menuItem) => {
    setState((prevState) => ({ ...prevState, menu_selected: menuItem }));
  };

  useEffect(() => {
    fetchFormsList();
  }, []);

  const fetchFormsList = async () => {
    try {
      const res = await getForms();
      setFormsList(res?.data?.forms);
    } catch (error) {
      console.log("error - ", error);
    }
  };
  

  const status_obj = {
    total: formsList?.length,
    submitted_today: 0,
    in_progress: 0,
    reviewed: 0,
    pending: 0,
  };

  
    formsList?.forEach((e) => {
      var formsData = {
        title: e.title,
        application_type: e.application_type,
        round: e.round,
        course_type: e.course_type,
        form_status: e.form_status,
        created_at: new Date(e.created_at)?.toLocaleDateString(),
        form_id: e.form_id,
        updated_at: new Date(e.updated_at)?.toLocaleDateString(),
        action: (
          <Button
            text="Publish"
            moreClass={`px-6 text-primary-600 bg-white border border-primary-600`}
            onClick={() => publishForm(e.form_id)}
          ></Button>
        ),
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
  

  const publishForm = async (form_id) => {
    const formData = new FormData();
    formData.append("form_id", form_id);
    try {
      const response = await publishForms(formData);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Form successfully Published!",
        toastType: "success",
      }));
      setTimeout(() => {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: false,
          toastMsg: "",
          toastType: "",
        }));
      }, 3000);
      fetchFormsList();
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while publishing form!",
        toastType: "error",
      }));
      setTimeout(
        () =>
          setToast((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastMsg: "",
            toastType: "",
          })),
        3000
      );
    }
  };

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-medium">Manage Forms</h1>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li
                className="mr-2"
                onClick={() => handleSelectMenu("create_new")}
              >
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "create_new"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Create New
                </a>
              </li>
              <li className="mr-2" onClick={() => handleSelectMenu("draft")}>
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "draft"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                  aria-current="page"
                >
                  Draft
                </a>
              </li>
              <li
                className="mr-2"
                onClick={() => handleSelectMenu("published")}
              >
                <a
                  href="#"
                  className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                    state.menu_selected === "published"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Published
                </a>
              </li>
            </ul>
          </div>
        </div>
        {state.menu_selected === "create_new" && (
          <div className="flex flex-col gap-4">
            <Card moreClass="flex h-[50vh]">
              <div className="flex flex-col gap-4 m-auto items-center">
                <div className="font-semibold text-xl">
                  Click on the button to a create a form
                </div>
                <Button
                  moreClass="text-white w-3/5"
                  text="Upload ODK"
                  onClick={() => navigation("/manage-forms/create-form")}
                />
                {/* Or
                            <Button moreClass="text-white w-3/5" text="Configure Manually" /> */}
              </div>
            </Card>
          </div>
        )}
        {state.menu_selected === "draft" && (
          <div className="text-2xl mt-4 font-medium">
            <FilteringTable
              dataList={formsDataList.filter((item)=>(item.form_status==="Draft"))}
              navigateFunc={() => {}}
              columns={COLUMN_DRAFTS}
            />
          </div>
        )}
        {state.menu_selected === "published" && (
          <div className="text-2xl mt-4 font-medium">
            <FilteringTable
              dataList={formsDataList.filter((item)=>(item.form_status==="Published"))}
              navigateFunc={() => {}}
              columns={COLUMN_PUBLISHED}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FormsOverview;
