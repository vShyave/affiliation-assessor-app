import React, { useEffect, useState } from "react";

import FilteringTable from "../../components/table/FilteringTable";

import { Switch } from "@material-tailwind/react";

import { Link } from "react-router-dom";

import { Button } from "../../components";
import {
  addUsers,
  createBulkUserHasura,
  createBulkUsersKeyCloak,
} from "../../api";
import { userService } from "../../api/userService";
import { removeCookie, setCookie } from "../../utils/common";

function BulkUploadUsersModal({ closeBulkUploadUsersModal }) {
  const [file, setFile] = useState();

  const [tableUserList, setTableUserList] = useState([]);

  const hiddenFileInput = React.useRef(null);

  const [tableDataReady, setTableDataReady] = useState(false);

  const [invalidTableUserList, setInvalidTableUserList] = useState([]);

  const [invalidUserDataFlag, setInvalidUserDataFlag] = useState(false);

  const [allUsersList, setAllUsersList] = useState([]);
  let selectedRows = [];

  const emailExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  const mobNumberExp = /^(0|91)?[6-9][0-9]{9}$/;
  const isEmailValid = (email) => {
    if (
      emailExp.test(email?.trim().toString()) &&
      email?.trim().toString().length != 0
    ) {
      return email;
    } else {
      return email?.toString().length === 0 ? (
        <span className="text-red-500 mt-2 text-sm">
          - <br></br> <small>Missing Email ID</small>
        </span>
      ) : (
        <span className="text-red-500 mt-2 text-sm">
          {email} <br></br>
          <small>Invalid Email ID</small>
        </span>
      );
    }
  };

  const ismobileNumberValid = (mobileNumber) => {
    if (
      mobNumberExp.test(parseInt(mobileNumber)) &&
      mobileNumber.toString().length != 0
    ) {
      return mobileNumber;
    } else {
      return mobileNumber?.toString().length === 0 ? (
        <span className="text-red-500 mt-2 text-sm">
          - <br></br> <small>Missing mobile number</small>
        </span>
      ) : (
        <span className="text-red-500 mt-2 text-sm">
          {mobileNumber} <br></br>
          <small>Invalid mobile number</small>
        </span>
      );
    }
  };

  const isDataValid = (data) => {
    return data?.toString().length != 0 ? (
      data
    ) : (
      <span className="text-red-500 mt-2 text-sm">
        - <br></br> <small>Missing Text</small>
      </span>
    );
  };

  const COLUMNS = [
    {
      Header: "Code",

      accessor: "code",

      // Cell: (props) => {
      //   return <p>{isDataValid(props.value)}</p>;
      // },
    },
    {
      Header: "Email",

      accessor: "email",

      Cell: (props) => {
        return <p>{isEmailValid(props.value)}</p>;
      },
    },
    {
      Header: "Full Name",

      accessor: "full_name",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "First Name",

      accessor: "fname",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "Last Name",

      accessor: "lname",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },
    {
      Header: "Mobile Number",

      accessor: "mobile_number",

      Cell: (props) => {
        return <p>{ismobileNumberValid(props.value)}</p>;
      },
    },
    {
      Header: "Role",

      accessor: "role",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },
  ];

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];

    setFile(fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf(".")));

    handleFile(fileUploaded);
  };

  const handleFile = (file) => {
    const formData = new FormData();

    const fileReader = new FileReader();

    formData.append("file", file);

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;

        csvFileToArray(text);
      };

      fileReader.readAsText(file);

      csvToJSON(file);
    }
  };

  const csvToJSON = (file) => {
    try {
      var reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        var invalidUserData = [];

        var headers = [];

        var rows = e.target.result.split("\r\n");

        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");

          var rowData = {};

          for (var j = 0; j < cells.length; j++) {
            if (i == 0) {
              var headerName = cells[j].trim();

              headers.push(headerName);
            } else {
              var key = headers[j];

              if (key) {
                rowData[key] = cells[j].trim();
              }
            }
          }

          const isValidUserEntry = Object.values(rowData).every(
            (value) => !!value
          );

          if (
            (i > 0 &&
              isValidUserEntry &&
              (rowData.mobile_number.toString().length < 10 ||
                !emailExp.test(rowData.email.toString()))) ||
            !isValidUserEntry
          ) {
            invalidUserData.push({ ...rowData, isRowInvalid: true });
          }

          setInvalidTableUserList(invalidUserData);
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    if (!csvHeader[csvHeader.length - 1]) {
      csvHeader.pop();
    }

    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const tableUserList = csvRows.map((i) => {
      const values = i.split(",");

      let obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});

      if (
        !emailExp.test(obj?.email?.toString()) ||
        !mobNumberExp.test(obj?.mobile_number?.toString()) ||
        obj?.full_name == "" ||
        obj?.email == "" ||
        obj?.mobile_number == "" ||
        obj?.role == ""
      ) {
        obj["isRowInvalid"] = true;
      }

      return obj;
    });

    setTableUserList(tableUserList);

    setAllUsersList(tableUserList); // setting the all user list again to use it in on toggle

    setTableDataReady(true);
  };

  const handleToggleChange = (e) => {
    setInvalidUserDataFlag(!invalidUserDataFlag);
  };

  const createUsers = async () => {
    console.log(selectedRows);

    const postDataKeyCloak = selectedRows.map((item) => ({
      firstName: item.values.fname,
      lastName: item.values.lname,
      email: item.values.email,
      username: item.values.email,
      password: "rkr",
      roleName: item.values.role,
    }));

    let postDataHasura = {
      assessors: [],
      regulators: [],
    };

    console.log("Keycloak - ", postDataKeyCloak);
    try {
      let accessTokenObj = {
        grant_type: "client_credentials",
        client_id: "admin-api",
        client_secret: "edd0e83d-56b9-4c01-8bf8-bad1870a084a",
      };
      //Access Token API call
      const accessTokenResponse = await userService.getAccessToken(
        accessTokenObj
      );
      setCookie(
        "access_token",
        "Bearer " + accessTokenResponse.data.access_token
      );
      console.log(accessTokenResponse);

      //keycloak API call
      const keycloakRes = await createBulkUsersKeyCloak(postDataKeyCloak);

      console.log(keycloakRes);

      //Hasura API call

      selectedRows.forEach((item) => {
        if (item.values.role.includes("Assessor")) {
          postDataHasura["assessors"].push({
            code: item.values.code,
            user_id: keycloakRes.data.succeedUser.filter(
              (user) => user.email === item.values.email
            )[0].userId,
            email: item.values.email,
            name: item.values.full_name,
            phonenumber: item.values.mobile_number,
            fname: item.values.fname,
            lname: item.values.lname,
          });
        }
        if (item.values.role.includes("Regulator")) {
          postDataHasura["regulators"].push({
            user_id: keycloakRes.data.succeedUser.filter(
              (user) => user.email === item.values.email
            )[0].userId,
            email: item.values.email,
            full_name: item.values.full_name,
            phonenumber: item.values.mobile_number,
            fname: item.values.fname,
            lname: item.values.lname,
          });
        }
      });
      console.log("Hasura - ", postDataHasura);
      const hasuraRes = await createBulkUserHasura(postDataHasura);
      console.log(hasuraRes);
      removeCookie("access_token");
    } catch (error) {
      console.log("error - ", error);
    }
  };

  const setSelectedRows = (rowList) => {
    selectedRows = [...rowList];
    console.log(selectedRows);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[860px] h-[560px] p-8">
          <div className="flex flex-col justify-between w-full ">
            <div className="flex text-xl font-semibold">
              <h1>Bulk upload users</h1>

              <div className="flex flex-row m-auto">
                {tableDataReady && (
                    <p className="text-sm">
                      <small>Show all users</small>
                    </p>
                  ) && (
                    <Switch
                      id="show-with-errors"
                      label={<span className="text-sm">Show with errors</span>}
                      onChange={handleToggleChange}
                    />
                  )}
              </div>

              <div className=" flex-row text-blue-500">
                <Link
                  to="/files/Template_bulk_user_create.csv"
                  target="_blank"
                  download
                >
                  <small>Download Template</small>
                </Link>
              </div>
            </div>

            <div className="justify-center flex flex-col items-center gap-4">
              {!tableDataReady && (
                <div className="flex flex-row m-auto">
                  <input
                    type={"file"}
                    accept={".csv"}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />

                  <Button
                    moreClass="text-white w-full px-6"
                    text="Browse file to upload"
                    onClick={handleClick}
                  />
                </div>
              )}

              {tableDataReady && (
                <div className="items-center">
                  <div className="text-2xl w-full mt-4 font-medium">
                    <FilteringTable
                      moreHeight="h-[300px]"
                      pagination={false}
                      dataList={
                        invalidUserDataFlag
                          ? invalidTableUserList
                          : tableUserList
                      }
                      columns={COLUMNS}
                      navigateFunc={() => {}}
                      showCheckbox={true}
                      showFilter={false}
                      // rows = {rows}
                      setSelectedRows={setSelectedRows}
                    />
                  </div>
                </div>
              )}
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

                {tableDataReady && (
                  <Button
                    onClick={() => {
                      createUsers();
                    }}
                    moreClass="border text-white w-[120px]"
                    text="Create users"
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkUploadUsersModal;
