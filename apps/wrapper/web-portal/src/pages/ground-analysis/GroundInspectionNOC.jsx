import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";

import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

import DetailedNoc from "../ground-analysis/DetailedNOC";
import Breadcrumb from "../../components/Breadcrumb";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import GlobalFilter from "../../components/table/GlobalFilter";

export default function GroundInspectionNoc({ notification }) {
  const navigate = useNavigate();

  const goBack = () => {
      navigate(-1);
  };

  const [selectedUser, setSelectedUser] = useState([]);

  const navigation = useNavigate();

  //   const [toast, setToast] = useState({
  //     toastOpen: false,
  //     toastMsg: "",
  //     toastType: "",
  //   });

  const DUMMY_DATA = [
    {
      roles: ["NOC 1"],
      pdfURL: "/pfdFiles/paramedical_testing.pdf",
    },
    {
      roles: ["NOC 2"],
      pdfURL: "/pfdFiles/Affiliation_Version_1.pdf",
    },
    {
      roles: ["NOC 3"],
      pdfURL: "/pfdFiles/paramedical_testing.pdf",
    },
  ];

  const handleClick = (userDetails) => {
    setSelectedUser(userDetails);
  };

  

  return (
    <>
      {/* {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )} */}

      {/* Breadcrumb */}

      <div className="h-[48px] bg-white flex justify-start drop-shadow-sm">
        <div className="container mx-auto flex px-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <Link to={ADMIN_ROUTE_MAP.adminModule.onGroundInspection.home}>
            <span className="text-primary-400">On Ground Inspection - All applications</span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <Link >
            <span onClick={goBack} className="text-primary-400">Back to application</span>
            </Link>
            <FaAngleRight className="text-[16px]" />
            <span className="text-gray-500 uppercase">Issue NOC</span>
          </div>
        </div>
      </div> 

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row">
            <div className="flex grow justify-start items-center">
              <h1 className="text-2xl font-semibold">Issue NOC</h1>
              <h1 className="text-2xl font-semibold ml-40">Preview</h1>
            </div>
            <div className="flex grow gap-4 justify-end items-center">
              <button
                onClick={goBack}
                className="flex flex-wrap items-center justify-center gap-2 border border-blue-700 bg-white text-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={() => navigation("/groundInspection/noc-issued")}
                className="flex flex-wrap items-center justify-center gap-2 border border-blue-700 text-white bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
              >
                Issue NOC
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-2 ">
            <div className="flex w-[30%]  overflow-y-auto  flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center py-2 pl-2">
                  <div className="flex flex-row gap-28 items-center">
                    <div variant="small" color="gray" className="font-normal ">
                      <span className="text-base font-semibold text-gray-900">
                        {/* <GlobalFilter/> */}
                      </span>
                    </div>
                  </div>
                </div>

                {DUMMY_DATA.map((item, index) => (
                  <>
                    <MenuItem
                      key={index}
                      className="flex flex-row justify-between gap-2 py-2 pl-2  hover:bg-white focus:bg-gray-400"
                      onClick={() => handleClick(item)}
                    >
                      <div className="w-full p-1">
                        <div className="flex flex-col gap-2">
                          <div className="text-base font-semibold text-gray-900">
                            {"" + item.roles}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            <div className="font-medium text-gray-900">
                              {item.title}
                            </div>
                            <p>{item.body}</p>
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="small"
                        className="flex items-center gap-1 text-xs text-gray-900"
                      >
                        {item.date}
                      </Typography>
                    </MenuItem>
                    <hr />
                  </>
                ))}
              </div>
            </div>
            <div>
              {/* <DetailedNotification user={selectedUser} /> */}
              {selectedUser ? (
                <DetailedNoc user={selectedUser} />
              ) : (
                <DetailedNoc user={notification} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
