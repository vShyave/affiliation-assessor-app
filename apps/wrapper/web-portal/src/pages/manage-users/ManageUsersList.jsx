import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { MdFileUpload, MdEdit, MdDelete, MdSwapHoriz } from "react-icons/md";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate, removeCookie, setCookie } from "../../utils/common";
import {
  filterUsers,
  getAllUsers,
  searchUsers,
  handleActiveUser,
  handleInctiveUser,
  handleDeleteUser,
} from "../../api";

import { userService } from "../../api/userService";

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
import { ContextAPI } from "../../utils/ContextAPI";

export default function ManageUsersList({
  closeDeleteUsersModal,
  closeBulkUploadUsersModal,
  setDeleteFlags,
}) {
  const navigation = useNavigate();
  var resUserData = [];
  const [deleteUsersModel, setDeleteUsersModel] = useState(false);
  const [deleteBulkUsersModel, setDeleteBulkUsersModel] = useState(false);

  // const[onRowSelected,setOnRowSelected] = useState([])
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [bulkDeleteFlag, setBulkDeleteFlag] = useState(false);

  const [bulkUploadUsersModel, setBulkUploadUsersModel] = useState(false);
  const [usersList, setUsersList] = useState();
  const [userTableList, setUserTableList] = useState([]);

  const [invalidUserRowFlag] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState([{ email: "" }]);
  const [isOpen, setIsOpen] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    offsetNo: 0,
    limit: 10,
    totalCount: 0,
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {setSpinner,setToast} = useContext(ContextAPI)
  let selectedRows = [];

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
    const formData = new FormData();
    formData.append("assessorId", userId);

    try {
      setSpinner(true)
      const response = await handleInctiveUser(formData);
      fetchAllUsers();
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
    }finally{
      setSpinner(false)
    }
  };
  const handleUserSetValid = async (e) => {
    const userId = e?.user_id;
    const formData = new FormData();
    formData.append("assessorId", userId);
    try {
      setSpinner(true)
      const validResponse = await handleActiveUser(formData);

      // setUsersList((usersList) => ({ ...usersList, [validResponse]: validResponse.data.update_assessors.returning[0] }));

      fetchAllUsers();
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
    }finally{
      setSpinner(false)
    }
  };

  const handleUserDelete = (e) => {
    setSelectedEmail(e.email);
    setDeleteUsersModel(true);
  };

  const setTableData = (e) => {
    var usersData = {
      full_name: e.fname || e.lname ? e.fname +" "+ e.lname : e.name,
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
              <button className="leading-3 position-relative">...</button>
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
              <MenuItem onClick={() => handleUserDelete(e)}>
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
      setSpinner(true)
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
    }finally{
      setSpinner(false)
    }
  };

  const searchApiCall = async (searchData) => {
    const pagination = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...searchData,
    };
    try {
      setSpinner(true)
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
    finally{
      setSpinner(false)
    }
  };

  const filterApiCall = async (filters) => {
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      ...filters,
    };
    try {
      setSpinner(true)
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
    finally{
      setSpinner(false)
    }
  };

  useEffect(() => {
    if (deleteFlag) {
      handleDelete(selectedEmail);
    }
  }, [deleteFlag]);

  useEffect(() => {
    if (bulkDeleteFlag) {
      // handleDelete(selectedEmail);
      handleBulkDelete(selectedRows);
    }
  }, [bulkDeleteFlag]);

  const handleDelete = async (email) => {
    const postData = [
      {
        email: email,
      },
    ];
    const hasuraPostData = { email: email };
    try {
      setSpinner(true)
      let accessTokenObj = {
        grant_type: "client_credentials",
        client_id: "admin-api",
        client_secret: "edd0e83d-56b9-4c01-8bf8-bad1870a084a",
      };
      const accessTokenResponse = await userService.getAccessToken(
        accessTokenObj
      );
      setCookie(
        "access_token",
        "Bearer " + accessTokenResponse.data.access_token
      );
      let hasuraResponse = {};
      const response = await userService.deleteUsers(postData);
      if (response.status === 200) {
        hasuraResponse = await handleDeleteUser(hasuraPostData);
      }
      await fetchAllUsers();
      setDeleteFlag(false);
      setSelectedEmail([]);

      if (hasuraResponse.status === 200) {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "User Deleted!",
          toastType: "success",
        }));
      }

      removeCookie("access_token");
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
    }finally{
      setSpinner(false)
    }
  };

  // const handleDelete = () => {

  // };

  useEffect(() => {
    if (!isSearchOpen && !isFilterOpen) {
      fetchAllUsers();
    }
  }, [paginationInfo.offsetNo, paginationInfo.limit]);

  const setSelectedRows = (rowList) => {
    let checkboxArr = [];
    rowList.forEach((item) => {
      let checkboxObj = {};
      checkboxObj.email = item.values.email;
      checkboxArr.push(checkboxObj);
    });
    selectedRows = checkboxArr;
  };

  const handleBulkDelete = async (bulkEmail) => {
    const postData = bulkEmail;
    try {
      setSpinner(true)
      let errorFlag = false;
      let accessTokenObj = {
        grant_type: "client_credentials",
        client_id: "admin-api",
        client_secret: "edd0e83d-56b9-4c01-8bf8-bad1870a084a",
      };
      const accessTokenResponse = await userService.getAccessToken(
        accessTokenObj
      );
      if (accessTokenResponse.status !== 200) {
        errorFlag = true;
      }
      setCookie(
        "access_token",
        "Bearer " + accessTokenResponse.data.access_token
      );

      const res = await userService.deleteUsers(postData);
      if (res.status !== 200) {
        errorFlag = true;
      }

      let hasuraResponse = {};
      bulkEmail.map(async (item) => {
        let bulkHasuraPostData = { email: item.email };
        hasuraResponse = await handleDeleteUser(bulkHasuraPostData);
        if (hasuraResponse.status !== 200) {
          errorFlag = true;
        }
      });

      //  const res = await userService.deleteUsers(postData);
      fetchAllUsers();
      setBulkDeleteFlag(false);
      setDeleteBulkUsersModel(false);
      selectedRows = [];
      if (!errorFlag) {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: true,
          toastMsg: "Users Deleted!",
          toastType: "success",
        }));
      }

      removeCookie("access_token");
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Error occured while uploading!",
        toastType: "error",
      }));
    }finally{
      setSpinner(false)
    }
  };

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
                  {console.log(selectedRows)}
                  <Button
                    // moreClass="text-white"
                    otherProps={{
                      disabled: !selectedRows.length ?  true : false,
                    }}
                    moreClass={`${
                      !selectedRows.length
                        ? "cursor-not-allowed border border-gray-500 bg-white text-gray-500 px-8 h-[44px]"
                        : "px-8 text-white bg-blue-900"
                    }`}
                    onClick={() => selectedRows.length ? setDeleteBulkUsersModel(true): setDeleteBulkUsersModel(false)}
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
                  <Button
                    moreClass="text-white"
                    text="Add User"
                    onClick={() =>
                      navigation(
                        `${ADMIN_ROUTE_MAP.adminModule.manageUsers.createUser}`
                      )
                    }
                  ></Button>
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
                setSelectedRows={setSelectedRows}
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
      {deleteBulkUsersModel && (
        <DeleteUsersModal
          setDeleteFlags={setBulkDeleteFlag}
          closeDeleteUsersModal={setDeleteBulkUsersModel}
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
