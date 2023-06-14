import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api";
import FilteringTable from "../../components/table/FilteringTable";

import { Button } from "../../components";

function BulkUploadUsersModal({ closeBulkUploadUsersModal }) {
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
  ];

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
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[760px] h-[560px] p-8">
          <div className="flex flex-col justify-between w-full ">
            <div className="flex text-xl font-semibold">
              <h1>Bulk upload users</h1>
            </div>

            <div className="justify-center flex flex-col items-center gap-4">
              {/* <Button moreClass=" text-white" text="Browse for files" />
              <p className="text-gray-500 text-base">
                Upload csv or excel here
              </p> */}
              <FilteringTable
                            dataList={userTableList}
                            columns={COLUMNS}
                            navigateFunc={() => {}}
                          />
            </div>
            <div className="flex flex-col gap-4">
              <hr />
              <div className="footer flex flex-row gap-4 justify-end">
                <Button
                  onClick={() => {
                    closeBulkUploadUsersModal(false);
                  }}
                  moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                  text="Cancel"
                ></Button>
                <Button
                  onClick={() => {
                    closeBulkUploadUsersModal(false);
                  }}
                  moreClass="border text-white w-[120px]"
                  text="Create users"
                ></Button>
                {/* <button onClick={() => {closeStatusModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkUploadUsersModal;
