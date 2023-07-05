import React, { useEffect, useState } from "react";
import FilteringTable from "../../components/table/FilteringTable";
import { Switch } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Button } from "../../components";


function BulkUploadUsersModal({ closeBulkUploadUsersModal }) {

  const [file, setFile] = useState();
  const [tableUserList, setTableUserList] = useState([]);
  const fileReader = new FileReader();
  const hiddenFileInput = React.useRef(null);
  const [tableDataReady, setTableDataReady] = useState(false);

  const statusColorMap = {
    "": "red",
    "INVALID_EMAIL": "yellow",
    "INVALID_MOBILE_NUMBER": "blue"
  };

  const isEmailValid = (email) => {
    const reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    //console.log(reqExp.test(email))
    //return reqExp.test(email);
    if (reqExp.test(email) && email.toString().length != 0) {
      return email
    } else {
      return (<span className="text-red-500 mt-2 text-sm"> {email} <br></br><small>Invalid Email ID</small>  </span>)
    }
  };

  const ismobileNumberValid = (mobileNumber) => {
    const expr = /^(0|91)?[6-9][0-9]{9}$/;
    if (expr.test(parseInt(mobileNumber)) && mobileNumber.toString().length != 0) {
      return mobileNumber
    }  else {
     return (
      mobileNumber.toString().length == 0 ?
      <span className="text-red-500 mt-2 text-sm"> - <br></br>  <small>Missing phone number</small>  </span>
            : <span className="text-red-500 mt-2 text-sm"> {mobileNumber} <br></br><small>Invalid phone number</small></span>
        );
    }
  };


  const COLUMNS = [
    {
      Header: "Full Name",
      accessor: "full_name",
      Cell: (props) => {
        return (
          <p style={{ background: statusColorMap[props.value], height: "25px", width: "50px" }}>{props.value}</p>
        );
      }
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (props) => {
        return (
          <p>{isEmailValid(props.value)}</p>
        );
      }
    },
    {
      Header: "Mobile Number",
      accessor: "mobile_number",
      Cell: (props) => {
        return (
            <p>{ismobileNumberValid(props.value)}</p>
        );
      }
    },
    {
      Header: "Role",
      accessor: "role",
      Cell: (props) => {
        return (
          <p style={{ background: statusColorMap[props.value], height: "25px", width: "50px" }}>{props.value}</p>
        );
      }
    },

  ];

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    setFile(
      fileUploaded.name.substring(0, fileUploaded.name.lastIndexOf("."))
    );
    handleFile(fileUploaded);
  };

  const handleFile = (file) => {
    const formData = new FormData();
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
        var UserToBulkUploadData = [];
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

          const isValidUserEntry = Object.values(rowData).every(value => !!value);
          //skip the first row (header) data
          if (i != 0 && isValidUserEntry) {
            UserToBulkUploadData.push(rowData);
          }
        }

        console.log(UserToBulkUploadData);
      }
    } catch (e) {
      console.error(e);
    }
  }


  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const tableUserList = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setTableUserList(tableUserList);
    setTableDataReady(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[760px] h-[560px] p-8">
          <div className="flex flex-col justify-between w-full ">
            <div className="flex text-xl font-semibold">
              <h1>Bulk upload users</h1>
              <div className="flex flex-row m-auto">
                <Switch id="auto-update" label="Show with errors" />
              </div>
              <div className=" flex-row "><Link to='/download-template'>Download Template</Link></div>
            </div>

            <div className="justify-center flex flex-col items-center gap-4">

              {!tableDataReady && (<div className="flex flex-row m-auto">
                <input type={"file"}
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
              </div>)}

              {tableDataReady && (<div className="items-center">
                <div className="text-2xl w-full mt-4 font-medium">
                  <FilteringTable moreHeight="h-[300px]"
                    pagination={false}
                    dataList={tableUserList}
                    columns={COLUMNS}
                    navigateFunc={() => { }}
                    showCheckbox={true}
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
                    closeBulkUploadUsersModal(false);
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
