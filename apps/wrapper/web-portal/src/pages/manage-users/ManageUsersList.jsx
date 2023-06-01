import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../../components";
import FilteringTable from "../../components/table/FilteringTable";

import { readableDate } from "../../utils/common";
import { getAllUsers } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

const ManageUsersList = () => {
  const navigation = useNavigate();
  var resUserData = [];
  const [usersList, setUsersList] = useState();
  const [userTableList, setUserTableList] = useState([]);
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
          {/* <div className="flex grow justify-end">
              <Link to={ ADMIN_ROUTE_MAP.adminModule.manageUsers.createUser}>
                <Button moreClass="text-white" text="Add User"></Button>
              </Link>
            </div> */}
        </div>
        <div className="flex flex-row items-center">
          <div className="text-2xl w-full mt-4 font-medium">
            <FilteringTable
              dataList={userTableList}
              columns={COLUMNS}
              navigateFunc={navigateToUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsersList;
