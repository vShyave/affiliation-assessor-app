import React, { useEffect, useState } from "react";

import FilteringTable from "../../components/table/FilteringTable";

import { Switch } from "@material-tailwind/react";

import { Link } from "react-router-dom";

import { Button } from "../../components";

import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiFillExclamationCircle,
} from "react-icons/ai";

function BulkUploadUsersModal({ closeBulkUploadUsersModal }) {
  const [file, setFile] = useState();

  const [tableUserList, setTableUserList] = useState([]);

  const hiddenFileInput = React.useRef(null);

  const [tableDataReady, setTableDataReady] = useState(false);

  const [invalidTableUserList, setInvalidTableUserList] = useState([]);

  const [invalidUserDataFlag, setInvalidUserDataFlag] = useState(true);

  const [allUsersList, setAllUsersList] = useState([]);

  const [invalidUserRowFlag, setInvalidUserRowFlag] = useState("false");

  const [selectedUserList, setSelectedUserList] = useState(false);

  const isEmailValid = (email) => {
    const reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (reqExp.test(email.toString()) && email.toString().length != 0) {
      return email;
    } else {
      return email.toString().length === 0 ? (
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
    const expr = /^(0|91)?[6-9][0-9]{9}$/;

    if (
      expr.test(parseInt(mobileNumber)) &&
      mobileNumber.toString().length != 0
    ) {
      return mobileNumber;
    } else {
      return mobileNumber.toString().length === 0 ? (
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
      Header: "Full Name",

      accessor: "full_name",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "Email",

      accessor: "email",

      Cell: (props) => {
        return <p>{isEmailValid(props.value)}</p>;
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

    {
      Header: "",

      accessor: "isRowInvalid",

      Cell: (props) => {
      const expr =  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      const expr2 =  /^(0|91)?[6-9][0-9]{9}$/;
      
       if(!expr.test(props.row.original.email.toString())||
       !expr2.test(props.row.original.mobile_number.toString())||
       props.row.original.full_name == "" ||
       props.row.original.email== "" ||
       props.row.original.mobile_number == "")
       {
        return <p>{"true"}</p>;
       } else {
        return <p>{"false"}</p>;
       }
        
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
        var validUserData = [];

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

          const reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

          const isValidUserEntry = Object.values(rowData).every(
            (value) => !!value
          );

          setInvalidTableUserList(invalidTableUserList);

          if (
            i > 0 &&
            isValidUserEntry &&
            (rowData.mobile_number.toString().length < 10 ||
              !reqExp.test(rowData.email.toString()))
          ) {
            invalidTableUserList.push(rowData);
          } else if (!isValidUserEntry) {
            invalidTableUserList.push(rowData);
          } else {
            validUserData.push(rowData);
          }

          setInvalidTableUserList(invalidTableUserList);
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");

    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const tableUserList = csvRows.map((i) => {
      const values = i.split(",");

      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];

        return object;
      }, {});

      return obj;
    });

    setTableUserList(tableUserList);

    setAllUsersList(tableUserList); // setting the all user list again to use it in on toggle

    setTableDataReady(true);
  };

  const handleToggleChange = (e) => {
    if (JSON.stringify(invalidTableUserList[0]) === "{}") {
      invalidTableUserList.shift();
    }

    {
      invalidUserDataFlag
        ? setTableUserList(invalidTableUserList)
        : setTableUserList(allUsersList);
    }

    setInvalidUserDataFlag(!invalidUserDataFlag);
  };

  const selectedRows = (userList) => {
    //console.log(userList)

    setSelectedUserList(userList);
  };

  const createUsers = (userList) => {
    //console.log(userList)

    try {
      //const res = await getAllUsers();
    } catch (error) {
      console.log("error - ", error);
    }
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
                <Link to="/download-template">
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
                      dataList={tableUserList}
                      columns={COLUMNS}
                      navigateFunc={() => {}}
                      showCheckbox={true}
                      showFilter={false}
                      onRowSelect={selectedRows}
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

                <Button
                  onClick={() => {
                    createUsers();
                  }}
                  moreClass="border text-white w-[120px]"
                  text="Create users"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkUploadUsersModal;
