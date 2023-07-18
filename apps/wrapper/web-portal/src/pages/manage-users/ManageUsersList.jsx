import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { MdFileUpload, MdEdit, MdDelete, MdSwapHoriz } from "react-icons/md";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate } from "../../utils/common";
import { filterUsers, getAllUsers } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

import DeleteUsersModal from "./DeleteUsers";
import BulkUploadUsersModal from "./BulkUploadUsersModal";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

export default function ManageUsersList({
  closeDeleteUsersModal,
  closeBulkUploadUsersModal,
}) {
  const navigation = useNavigate();
  var resUserData = [];
  const [deleteUsersModel, setDeleteUsersModel] = useState(false);
  const [bulkUploadUsersModel, setBulkUploadUsersModel] = useState(false);
  const [usersList, setUsersList] = useState();
  const [userTableList, setUserTableList] = useState([]);
  const [invalidUserRowFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    offsetNo: 0,
    limit: 10,
    totalCount: 0,
  });

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
    {
      Header: "",
      accessor: "isRowInvalid",
      Cell: () => {
        return invalidUserRowFlag;
      },
    },
  ];

  const setTableData = (e) => {
    var usersData = {
      full_name: e.fname || e.lname ? e.fname + e.lname : e.name,
      email: e.email?.toLowerCase(),
      mobile_number: e.phonenumber,
      role: e.role || "Assessor",
      status: e.workingstatus || "Active",
      id: e.user_id,
      schedule: (
        <a className={`px-6 text-primary-600 pl-0 bg-white`}>View Schedule</a>
      ),
      more_actions: (
        <div className="flex flex-row text-2xl font-semibold">
          <Menu>
            <MenuHandler>
              <button>...</button>
            </MenuHandler>
            <MenuList>
              <MenuItem
                onClick={() =>
                  navigation(
                    `${ADMIN_ROUTE_MAP.adminModule.manageUsers.createUser}/${e.user_id}`
                  )
                }
              >
                <div className="flex flex-row gap-4 mt-4">
                  <div>
                    <MdEdit />
                  </div>
                  <div className="text-semibold m-">
                    <span>Edit</span>
                  </div>
                </div>{" "}
              </MenuItem>
              <MenuItem onClick={(e) => console.log("icon clicked")}>
                <div className="flex flex-row gap-4 mt-4">
                  <div>
                    <MdSwapHoriz />
                  </div>
                  <div className="text-semibold m-">
                    <span>Deactivate</span>
                  </div>
                </div>{" "}
              </MenuItem>
              <MenuItem onClick={() => setDeleteUsersModel(true)}>
                <div className="flex flex-row gap-4 mt-4">
                  <div>
                    <MdDelete />
                  </div>
                  <div className="text-semibold m-">
                    <span>Delete</span>
                  </div>
                </div>{" "}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ),
    };
    resUserData.push(usersData);
  };

  const fetchAllUsers = async () => {
    const pagination = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
    };
    try {
      const res = await getAllUsers(pagination);
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.assessors_aggregate.aggregate.totalCount,
      }));
      setUsersList(res?.data?.assessors);
      const data = res?.data?.assessors;
      data.forEach(setTableData);
      setUserTableList(resUserData);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const filterApiCall = async (filters) => {
    const postData = { offsetNo: 0, limit: 10, ...filters };
    try {
      const res = await filterUsers(postData);
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.assessors_aggregate.aggregate.totalCount,
      }));
      setUsersList(res?.data?.assessors);
      const data = res?.data?.assessors;
      data.forEach(setTableData);
      setUserTableList(resUserData);
    } catch (error) {
      console.log("error - ", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  return (
    <>
      <div className="flex flex-col justify-center align-center gap-4">
        <div className="flex flex-row">
          <div className="flex grow items-center">
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
        <div className="flex flex-col gap-4">
          {/* <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"> */}
          {/* <div className="text-2xl w-full font-medium"> */}
          <FilteringTable
            dataList={userTableList}
            columns={COLUMNS}
            navigateFunc={() => {}}
            showCheckbox={true}
            paginationInfo={paginationInfo}
            setPaginationInfo={setPaginationInfo}
            onRowSelect={() => {}}
            showFilter={true}
            pagination={true}
            filterApiCall={filterApiCall}
          />
          {/* </div> */}
          {/* </div> */}
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
