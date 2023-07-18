import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import {
  getForms,
  markReviewStatus,
  publishForms,
  unpublishForms,
  deleteForm,
  filterForms,
} from "../../api";
import { getFieldName, readableDate } from "../../utils/common";
import Toast from "../../components/Toast";
import { VscPreview } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";

import AlertModal from "../../components/AlertModal";

const FormsOverview = () => {
  const navigation = useNavigate();
  var formsDataList = [];
  const [formsList, setFormsList] = useState();
  const [state, setState] = useState({
    menu_selected: "create_new",
    alertContent: {
      alertTitle: "",
      alertMsg: "",
      actionButtonLabel: "",
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    offsetNo: 0,
    limit: 10,
    totalCount: 0,
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
      accessor: "created_at",
    },
    {
      Header: "Action",
      accessor: "publish",
    },
    {
      Header: "Preview",
      accessor: "preview",
    },
    {
      Header: "Delete",
      accessor: "delete",
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
      accessor: "updated_at",
    },
    {
      Header: "Action",
      accessor: "unpublish",
    },
    {
      Header: "Preview",
      accessor: "preview",
    },
    {
      Header: "Delete",
      accessor: "delete",
    },
  ];
  const COLUMN_UNPUBLISHED = [
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
      accessor: "updated_at",
    },
    {
      Header: "Action",
      accessor: "publish",
    },
    {
      Header: "Preview",
      accessor: "preview",
    },
    ,
    {
      Header: "Delete",
      accessor: "delete",
    },
  ];

  const navigateToView = (formObj) => {
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.manageForms.viewForm}/${formObj?.title}/${formObj?.form_id}`;
    navigation(navigationURL);
  };

  const viewForm = async (postData) => {
    try {
      const res = await markReviewStatus(postData);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const handleSelectMenu = (menuItem) => {
    setState((prevState) => ({ ...prevState, menu_selected: menuItem }));
  };

  const publish = (formId) => {
    setShowAlert(false);
    publishForm(formId);
  };

  const unpublish = (formId) => {
    setShowAlert(false);
    unpublishForm(formId);
  };

  const delete_Form = (formId) => {
    setShowAlert(false);
    deleteForms(formId);
  };

  useEffect(() => {
    fetchFormsList();
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  const fetchFormsList = async () => {
    const pagination = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
    };
    try {
      const res = await getForms(pagination);
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res?.data?.forms_aggregate?.aggregate.totalCount,
      }));
      setFormsList(res?.data?.forms);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const filterApiCall = async (filters) => {
    const postData = { offsetNo: 0, limit: 10, ...filters };
    try {
      const res = await filterForms(postData);
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res?.data?.forms_aggregate?.aggregate.totalCount,
      }));
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
      title: getFieldName(e?.title),
      application_type: getFieldName(e?.application_type),
      round: `Round ${e?.round}`,
      course_type: getFieldName(e?.course_type),
      form_status: e?.form_status,
      created_at: new Date(e?.created_at)?.toLocaleDateString(),
      form_id: e?.form_id,
      updated_at: new Date(e?.updated_at)?.toLocaleDateString(),
      publish: (
        <a
          className={`px-6 text-primary-600 pl-0 bg-white`}
          onClick={() => {
            setShowAlert(true);
            setState((prevState) => ({
              ...prevState,
              alertContent: {
                alertTitle: "Publish Form",
                alertMsg: "Are you sure to publish the form?",
                actionButtonLabel: "Publish",
                actionFunction: publish,
                actionProps: [e?.form_id],
              },
            }));
          }}
        >
          Publish
        </a>
      ),
      unpublish: (
        <a
          className={`px-6 text-primary-600 pl-0 bg-white`}
          onClick={() => {
            setShowAlert(true);
            setState((prevState) => ({
              ...prevState,
              alertContent: {
                alertTitle: "Unpublish Form",
                alertMsg: "Are you sure to unpublish the form?",
                actionButtonLabel: "Unpublish",
                actionFunction: unpublish,
                actionProps: [e?.form_id],
              },
            }));
          }}
        >
          Unpublish
        </a>
      ),
      preview: (
        <div className="flex flex-row text-2xl font-semibold">
          <span onClick={() => navigateToView(e)}>
            <VscPreview />
          </span>
        </div>
      ),
      delete: (
        <a
          className={`px-6 text-gray-600 pl-0 bg-white`}
          onClick={() => {
            setShowAlert(true);
            setState((prevState) => ({
              ...prevState,
              alertContent: {
                alertTitle: "Delete form",
                alertMsg:
                  e.form_status === "Published"
                    ? "You cannot delete the form before unpublishing it?"
                    : "Are you sure,you want to delete this form?",
                actionButtonLabel:
                  e.form_status === "Published" ? "Unpublish" : "Delete",
                actionFunction:
                  e.form_status === "Published" ? unpublish : delete_Form,
                actionProps: [e?.form_id],
              },
            }));
          }}
        >
          <RiDeleteBin6Line className="text-xl mt-4" />
        </a>
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
      // Notification.sendemail({"body":})
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

  const unpublishForm = async (form_id) => {
    const formData = new FormData();
    formData.append("form_id", form_id);
    try {
      const response = await unpublishForms(formData);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Form successfully Unpublished!",
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
        toastMsg: "Error occured while unpublishing form!",
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
  const deleteForms = async (form_id) => {
    const formData = new FormData();
    formData.append("form_id", form_id);
    try {
      await deleteForm(formData).then(
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Form successfully Deleted!",
          toastType: "success",
        }))
      );

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
        toastMsg: "Error occured while deleting form!",
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
      {showAlert && (
        <AlertModal showAlert={setShowAlert} {...state.alertContent} />
      )}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-medium">Manage Forms</h1>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ul className="flex flex-wrap gap-3 -mb-px">
            <li className="" onClick={() => handleSelectMenu("create_new")}>
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
            <li className="" onClick={() => handleSelectMenu("draft")}>
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
            <li className="" onClick={() => handleSelectMenu("published")}>
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
            <li className="" onClick={() => handleSelectMenu("unpublished")}>
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg dark:text-blue-500 dark:border-blue-600 ${
                  state.menu_selected === "unpublished"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`}
              >
                Unpublished
              </a>
            </li>
          </ul>
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
                </div>
              </Card>
            </div>
          )}
          {state.menu_selected === "draft" && (
            <div className="flex flex-col gap-4">
              <FilteringTable
                dataList={formsDataList.filter(
                  (item) => item.form_status === "Draft"
                )}
                navigateFunc={() => {}}
                columns={COLUMN_DRAFTS}
                filterApiCall={filterApiCall}
                onRowSelect={() => {}}
                pagination={true}
                showFilter={true}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
              />
            </div>
          )}
          {state.menu_selected === "published" && (
            <div className="flex flex-col gap-4">
              <FilteringTable
                dataList={formsDataList.filter(
                  (item) => item.form_status === "Published"
                )}
                navigateFunc={() => {}}
                columns={COLUMN_PUBLISHED}
                onRowSelect={() => {}}
                pagination={true}
                filterApiCall={filterApiCall}
                showFilter={true}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
              />
            </div>
          )}
          {state.menu_selected === "unpublished" && (
            <div className="flex flex-col gap-4">
              <FilteringTable
                dataList={formsDataList.filter(
                  (item) => item.form_status === "Unpublished"
                )}
                navigateFunc={() => {}}
                columns={COLUMN_UNPUBLISHED}
                onRowSelect={() => {}}
                pagination={true}
                filterApiCall={filterApiCall}
                showFilter={true}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormsOverview;
