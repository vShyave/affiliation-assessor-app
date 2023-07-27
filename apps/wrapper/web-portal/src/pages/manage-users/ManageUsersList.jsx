import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { MdFileUpload, MdEdit, MdDelete, MdSwapHoriz } from "react-icons/md";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate } from "../../utils/common";
import {
  filterUsers,
  getAllUsers,
  searchUsers,
  handleActiveUser,
  handleInctiveUser,
} from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

import DeleteUsersModal from "./DeleteUsers";
import Nav from "../../components/Nav";
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
  setDeleteFlags
}) {
  const navigation = useNavigate();
  var resUserData = [];
  const [deleteUsersModel, setDeleteUsersModel] = useState(false);
  // const[onRowSelected,setOnRowSelected] = useState([])
  const [deleteFlag, setDeleteFlag] = useState(false);
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
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

  const handleUsersetInvalid = async (e) => {
    const userId = e?.user_id;
    console.log("e", e);
    const formData = new FormData();
    formData.append("assessorId", userId);
    try {
      const response = await handleInctiveUser(formData);
      fetchAllUsers();
      const formDetail = response.data.forms[0];
      console.log("formDetails", formDetail);
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
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
  const handleUserSetValid = async (e) => {
    const userId = e?.user_id;
    console.log("e", e);
    const formData = new FormData();
    formData.append("assessorId", userId);
    try {
      const response = await handleActiveUser(formData);
      fetchAllUsers();
      const formDetail = response.data.forms[0];
      // console.log("formDetails",formDetail)
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
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

  const setTableData = (e) => {
    // console.log("setTableData",e)
    var usersData = {
      full_name: e.fname || e.lname ? e.fname + e.lname : e.name,
      email: e.email?.toLowerCase(),
      mobile_number: e.phonenumber,
      role: e.role || "Assessor",
      status:
        e.workingstatus === "Valid"
          ? "Active"
          : e.workingstatus === "Invalid"
          ? "Inactive"
          : "-",
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
              <MenuItem
                onClick={() =>
                  e?.workingstatus === "Invalid"
                    ? handleUserSetValid(e)
                    : handleUsersetInvalid(e)
                }
              >
                <div className="flex flex-row gap-4 mt-4">
                  <div>
                    <MdSwapHoriz />
                  </div>
                  <div className="text-semibold m-">
                    <span>
                      {e?.workingstatus === "Invalid"
                        ? "Activate"
                        : "Deactivate"}
                    </span>
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

  const searchApiCall = async (searchData) => {
    const pagination = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...searchData,
    };
    try {
      const res = await searchUsers(pagination);
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
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...filters,
    };
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
    // if (deleteFlag == "true") {
    //   handleDelete();
    //   setDeleteFlag(false)
    // }else{
    //   handleDelete()
    // }
    deleteFlag ? handleDelete() : console.log("nothing")

  },[deleteFlag]);

  const handleDelete = () => {
    setDeleteFlag(false)
    userTableList.map((item)=> console.log(item.email))
    console.log("hello",userTableList);
  };

  useEffect(() => {
    if (!isSearchOpen && !isFilterOpen) {
      fetchAllUsers();
    }
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  return (
    <>
      <Nav />
      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col justify-center align-center">
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

            <div className="flex flex-col gap-4 mt-4">
              <FilteringTable
                dataList={userTableList}
                columns={COLUMNS}
                navigateFunc={() => {}}
                showCheckbox={true}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
                setOnRowSelect={() => {}}
                showFilter={true}
                pagination={true}
                filterApiCall={filterApiCall}
                searchApiCall={searchApiCall}
                setIsSearchOpen={setIsSearchOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {deleteUsersModel && (
        <DeleteUsersModal
          setDeleteFlags={setDeleteFlag}
          closeDeleteUsersModal={setDeleteUsersModel}
        />
      )}
      {bulkUploadUsersModel && (
        <BulkUploadUsersModal
          closeBulkUploadUsersModal={setBulkUploadUsersModel}
        />
      )}
    </>
  );
}
