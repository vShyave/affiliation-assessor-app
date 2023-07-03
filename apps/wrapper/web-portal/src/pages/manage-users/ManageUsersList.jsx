import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { MdFileUpload, MdEdit, MdDelete } from "react-icons/md";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate } from "../../utils/common";
import { getAllUsers } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

import DeleteUsersModal from "./DeleteUsers";
import Dropdown from "../../components/Dropdown";
import BulkUploadUsersModal from "./BulkUploadUsersModal";

import { scheduled } from "rxjs";

export default function ManageUsersList({
  closeDeleteUsersModal,
  closeBulkUploadUsersModal,
}) {
  const navigation = useNavigate();
  var resUserData = [];
  const [deleteUsersModel, setDeleteUsersModel] = useState(false);
  const [bulkUploadUsersModel, setBulkUploadUsersModel] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [usersList, setUsersList] = useState();
  const [userTableList, setUserTableList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const COLUMNS = [
    {
      Header: "Full name",
      accessor: "full_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile number",
      accessor: "mobile_number",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Account Status",
      accessor: "status",
    },
    {
      Header: "",
      accessor: "schedule",
    },
    {
      Header: "",
      accessor: "more_actions",
    },
  ];

  const list = [
    {
      icon: <MdEdit />,
      functionality: "Edit",
    },
    {
      icon: <MdEdit />,
      functionality: "Deactive",
    },
    {
      icon: <MdDelete />,
      functionality: "Delete",
    },
  ];

  const navigateToUpdate = (userObj) => {
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.manageUsers.createUser}/${userObj?.original?.id}`;
    navigation(navigationURL);
  };

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsersList(res?.data?.assessors);
      const data = res?.data?.assessors;
      data.forEach((e) => {
        var usersData = {
          full_name: e.fname || e.lname ? e.fname + e.lname : e.name,
          email: e.email?.toLowerCase(),
          mobile_number: e.phonenumber,
          role: e.role || "Assessor",
          status: e.workingstatus || "Active",
          id: e.user_id,
          schedule: (
            <a
              className={`px-6 text-primary-600 pl-0 bg-white`}
              // onClick={() => {
              //   setShowAlert(true);
              //   setState((prevState) => ({
              //     ...prevState,
              //     alertContent: {
              //       alertTitle: "Publish Form",
              //       alertMsg: "Are you sure to publish the form?",
              //       actionButtonLabel: "Publish",
              //       actionFunction: publish,
              //       actionProps: [e?.form_id] // onClick={() => {
              //   setShowAlert(true);
              //   setState((prevState) => ({
              //     ...prevState,
              //     alertContent: {
              //       alertTitle: "Publish Form",
              //       alertMsg: "Are you sure to publish the form?",
              //       actionButtonLabel: "Publish",
              //       actionFunction: publish,
              //       actionProps: [e?.form_id]
              //     },
              //   }));
              // }}
              //     },
              //   }));
              // }}
            >
              View Schedule
            </a>
          ),
          more_actions: (
            <div className="flex flex-row font-semibold justify-center text-2xl"></div>
          ),
        };
        resUserData.push(usersData);
      });
      setUserTableList(resUserData);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center align-center">
        <div className="flex flex-row">
          <div className="flex grow">
            <h1 className="text-xl font-semibold">Manage Users</h1>
          </div>
          <div className="flex justify-end">
            <span className="flex gap-4">
              <Button moreClass="text-white" text="Make inactive"></Button>
              <Button
                moreClass="text-white"
                onClick={() => setDeleteUsersModel(true)}
                text="Delete user"
              ></Button>
              <button
                onClick={() => setBulkUploadUsersModel(true)}
                className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[200px] h-[45px] text-md font-medium rounded-[4px]"
              >
                Bulk upload users
                <span className="text-xl">
                  <MdFileUpload />
                </span>
              </button>
              <Button moreClass="text-white" text="Add User"></Button>
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-2xl w-full mt-4 font-medium">
            <FilteringTable
              dataList={userTableList}
              columns={COLUMNS}
              navigateFunc={() => {}}
              showCheckbox={true}
            />
          </div>
        </div>
      </div>
      {deleteUsersModel && (
        <DeleteUsersModal closeDeleteUsersModal={setDeleteUsersModel} />
      )}
      {bulkUploadUsersModel && (
        <BulkUploadUsersModal
          closeBulkUploadUsersModal={setBulkUploadUsersModel}
        />
      )}
    </>
  );
}
