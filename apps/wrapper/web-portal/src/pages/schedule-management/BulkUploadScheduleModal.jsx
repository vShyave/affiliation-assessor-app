import React, { useState } from "react";

import FilteringTable from "../../components/table/FilteringTable";

import { Switch } from "@material-tailwind/react";

import { Link } from "react-router-dom";

import { Button } from "../../components";
import { addAssessmentSchedule } from "../../api";
import Toast from "../../components/Toast";

function BulkUploadScheduleModal({ setBulkUploadSchduleModal }) {
  const [file, setFile] = useState();

  const [tableAssessmentList, setTableAssessmentList] = useState([]);

  const hiddenFileInput = React.useRef(null);

  const [tableDataReady, setTableDataReady] = useState(false);

  const [invalidTableAssessmentList, setInvalidTableAssessmentList] = useState([]);

  const [invalidAssessmentDataFlag, setInvalidAssessmentDataFlag] = useState(false);

  const [allAssessmentsList, setAllAssessmentsList] = useState([]);

  const [selectedAssessmentList, setSelectedAssessmentList] = useState(false);
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });

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
      Header: "Assessor Code",
      accessor: "assessor_code",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "Date",
      accessor: "date",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "Institute Id",
      accessor: "institute_id",

      Cell: (props) => {
        return <p>{isDataValid(props.value)}</p>;
      },
    },

    {
      Header: "Assisstant Code",
      accessor: "assisstant_code",

      // Cell: (props) => {
      //   return <p>{isDataValid(props.value)}</p>;
      // },
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
        var invalidAssessmentData = [];

        var headers = [];

        var rows = e.target.result.split("\n");

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

          const isValidAssessmentEntry = Object.values(rowData).every(
            (value) => !!value
          );
          console.log(rowData);

          for (let key in rowData) {
            if (
              i > 0 &&
              (rowData[key] == null || rowData[key] == "") &&
              isValidAssessmentEntry &&
              !Object.keys(rowData).length &&
              key !== "assisstant_code"
            ) {
              rowData["isRowInvalid"] = true;
            }
          }
          invalidAssessmentData.push(rowData);

          setInvalidTableAssessmentList(invalidAssessmentData);
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

    const tableAssessmentList = csvRows.map((i) => {
      const values = i.split(",");

      let obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});

      for (let key in obj) {
        if ((obj[key] == null || obj[key] == "") && key !== "assisstant_code") {
          obj["isRowInvalid"] = true;
        }
      }

      return obj;
    });

    setTableAssessmentList(tableAssessmentList);

    setAllAssessmentsList(tableAssessmentList); // setting the all user list again to use it in on toggle

    setTableDataReady(true);
  };

  const handleToggleChange = (e) => {
    setInvalidAssessmentDataFlag(!invalidAssessmentDataFlag);
  };

  const bulkSchedule = async () => {
    try {
      const postData = {
        assessment_schedule: selectedRows.map((item) => {
          let tempObj = {
            ...item.original,
            institute_id: +item.original.institute_id,
          };
          if (tempObj["assisstant_code"] === "") {
            delete tempObj.assisstant_code;
          }
          return tempObj;
        }),
      };
      console.log(postData);
      const res = await addAssessmentSchedule(postData);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "Assessments Scheduled Successfully!!",
        toastType: "success",
      }));
      setTimeout(() => {
        setToast((prevState) => ({
          ...prevState,
          toastOpen: false,
          toastMsg: "",
          toastType: "",
        }));
        setBulkUploadSchduleModal(false);
      }, 3000);
    } catch (error) {
      console.log("error - ", error);
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: error.response.data.error,
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

  const setSelectedRows = (rowList) => {
    selectedRows = [...rowList];
    console.log(selectedRows);
  };

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[860px] h-[560px] p-8">
          <div className="flex flex-col justify-between w-full ">
            <div className="flex text-xl font-semibold">
              <h1>Bulk upload assessments</h1>

              <div className="flex flex-row m-auto">
                {tableDataReady && (
                    <Switch
                      id="show-with-errors"
                      label={<span className="text-sm">Show with errors</span>}
                      onChange={handleToggleChange}
                    />
                  )}
              </div>

              <div className=" flex-row text-blue-500">
                <Link
                  to="/files/Template_bulk_assessment_schedule.csv"
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
                        invalidAssessmentDataFlag
                          ? invalidTableAssessmentList
                          : tableAssessmentList
                      }
                      columns={COLUMNS}
                      navigateFunc={() => {}}
                      showCheckbox={true}
                      showFilter={false}
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
                    setBulkUploadSchduleModal(false);
                  }}
                  moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                  text="Cancel"
                ></Button>

                {tableDataReady && (
                  <Button
                    onClick={() => {
                      bulkSchedule();
                    }}
                    moreClass="border text-white w-[120px]"
                    text="Schedule Assessments"
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

export default BulkUploadScheduleModal;
