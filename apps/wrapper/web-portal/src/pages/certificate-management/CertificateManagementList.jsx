import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { Option, Select } from "@material-tailwind/react";
import { ContextAPI } from "../../utils/ContextAPI";
import FilteringTable from "../../components/table/FilteringTable";
import { getNOCCertificate } from "../../api";
import { readableDate } from "../../utils";

const CertificateManagementList = () => {
  var certificateDataList = [];
  const [selectedRound, setSelectedRound] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [certificateList, setCertificateList] = useState();
  const { setSpinner } = useContext(ContextAPI);
  const [paginationInfo, setPaginationInfo] = useState({
    offsetNo: 0,
    limit: 10,
    totalCount: 0,
  });

  const COLUMNS_R1 = [
    {
      Header: "Form title",
      accessor: "form_title",
    },
    {
      Header: "Institute",
      accessor: "institute",
    },
    {
      Header: "Course Type",
      accessor: "course_name",
    },
    {
      Header: "Date Issued",
      accessor: "issued_on",
    },
    {
      Header: "NOC",
      accessor: "noc_path",
    },
  ];

  const COLUMNS_R2 = [
    {
      Header: "Form title",
      accessor: "form_title",
    },
    {
      Header: "Institute",
      accessor: "institute",
    },
    {
      Header: "Course Type",
      accessor: "course_name",
    },
    {
      Header: "Date Issued",
      accessor: "issued_on",
    },
    {
      Header: "Certificate",
      accessor: "certificate_path",
    },
  ];

  //TODO: integrate search API
  const searchApiCall = async (searchData) => {
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      round: selectedRound,
      ...searchData,
    };
    try {
      setSpinner(true);
      // const res = await searchDesktop(postData);
      // setPaginationInfo((prevState) => ({
      //   ...prevState,
      //   totalCount: res.data.form_submissions_aggregate.aggregate.totalCount,
      // }));
      // setFormsList(res?.data?.form_submissions);
    } catch (error) {
      console.log("error - ", error);
    } finally {
      setSpinner(false);
    }
  };

  const getAllCertificates = async () => {
    const postData = {
      offsetNo: paginationInfo.offsetNo,
      limit: paginationInfo.limit,
      round: selectedRound,
    };
    try {
      setSpinner(true);
      const res = await getNOCCertificate(postData);
      setPaginationInfo((prevState) => ({
        ...prevState,
        totalCount: res.data.form_submissions_aggregate.aggregate.totalCount,
      }));
      setCertificateList(res?.data?.form_submissions);
    } catch (error) {
      console.log("erorr - ", error);
    } finally {
      setSpinner(false);
    }
  };

  certificateList?.forEach((e) => {
    var certificateData = {
      form_title:
        e?.course?.course_name?.charAt(0).toUpperCase() +
          e?.course?.course_name?.substring(1).toLowerCase() || "-",
      institute:
        e?.institute?.name?.charAt(0).toUpperCase() +
        e?.institute?.name?.substring(1).toLowerCase() +
        ", " +
        e?.institute?.district?.charAt(0).toUpperCase() +
        e?.institute?.district?.substring(1).toLowerCase(),
      course_name:
        `${e?.course?.course_type} - ${e?.course?.course_level}` || "NA",
      issued_on: readableDate(e?.reviewed_on),
      status: e?.form_status || "NA",
      certificate_fileName: e?.certificate_fileName || "-",
      certificate_path: e?.certificate_fileName ? (
        <div className={`px-6 text-primary-600 pl-0`}>
          <a href={e?.certificate_Path} target="_blank">
            View
          </a>
        </div>
      ) : (
        "-"
      ),
      noc_path: e?.noc_Path ? (
        <div className={`px-6 text-primary-600 pl-0`}>
          <a href={e?.noc_Path} target="_blank">
            View
          </a>
        </div>
      ) : (
        "-"
      ),
      noc_fileName: e?.noc_fileName || "-",
    };
    certificateDataList.push(certificateData);
  });

  useEffect(() => {
    if (!isSearchOpen) {
      getAllCertificates();
    }
  }, [paginationInfo.offsetNo, paginationInfo.limit, selectedRound]);

  return (
    <>
      <Nav />
      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-semibold">Certificate Management</h1>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="w-72 bg-white rounded-[8px]">
                  <Select
                    value={selectedRound}
                    label="Select Certificate"
                    onChange={(value) => {
                      setSelectedRound(value);
                      setPaginationInfo((prevState) => ({
                        ...prevState,
                        offsetNo: 0,
                      }));
                      setIsSearchOpen(false);
                    }}
                  >
                    <Option value={1}>NOC</Option>
                    <Option value={2}>Affiliation Certificate</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {selectedRound === 1 && (
                <FilteringTable
                  dataList={certificateDataList}
                  navigateFunc={() => {}}
                  columns={COLUMNS_R1}
                  // filterApiCall={filterApiCall}
                  onRowSelect={() => {}}
                  pagination={true}
                  showFilter={false}
                  showSearch={true}
                  paginationInfo={paginationInfo}
                  setPaginationInfo={setPaginationInfo}
                  searchApiCall={searchApiCall}
                  setIsSearchOpen={setIsSearchOpen}
                  setIsFilterOpen={() => {}}
                />
              )}
              {selectedRound === 2 && (
                <FilteringTable
                  dataList={certificateDataList}
                  navigateFunc={() => {}}
                  columns={COLUMNS_R2}
                  // filterApiCall={filterApiCall}
                  onRowSelect={() => {}}
                  pagination={true}
                  showFilter={false}
                  showSearch={true}
                  paginationInfo={paginationInfo}
                  setPaginationInfo={setPaginationInfo}
                  searchApiCall={searchApiCall}
                  setIsSearchOpen={setIsSearchOpen}
                  setIsFilterOpen={() => {}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateManagementList;
