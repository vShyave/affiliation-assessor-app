import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { getCookie, readableDate } from "../../utils";
import { getNotifications } from "../../api";
import DetailedNotification from "./DetailedNotification";
import APPLICANT_ROUTE_MAP from "../../routes/ApplicantRoute";
import { applicantService } from "../../services";

export default function NotificationsDetailedView(props) {
  const navigation = useNavigate();
  const [selectedNotification, setselectedNotification] = useState([]);
  const [notificationList, setNotifcationList] = useState([]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleClick = (notification) => {
    const navigationURL = `${APPLICANT_ROUTE_MAP.dashboardModule.notifications}/${notification.id}`;
    navigation(navigationURL);
    setselectedNotification(notification);
  };

  const getAllNotifications = async () => {
    const postData = {
      user_id: `${getCookie("institutes")?.[0]?.id}`,
    };
    try {
      const res = await applicantService.getNotifications(postData);
      console.log(res);
      const notifList = res.data.notifications.map((item) => ({
        roles: [item?.user_type],
        title: item?.title,
        body: item?.body,
        date: readableDate(item?.date),
        text: item?.body,
        subText:
          item?.body?.length > 40
            ? item?.body.substr(0, 40) + " ..."
            : item?.body,
        read_status: item?.read_status,
        id: item?.id,
      }));
      setNotifcationList(notifList);
      if (!Object.keys(selectedNotification).length) {
        setselectedNotification(notifList[0]);
        const navigationURL = `${APPLICANT_ROUTE_MAP.dashboardModule.notifications}/${notifList[0].id}`;
        navigation(navigationURL);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <>
      {/* {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )} */}
      {/* Breadcrum */}
      {/* <Breadcrumb data={breadCrumbData} /> */}

      <div className="flex bg-white justify-start h-[48px]">
        <div className="container mx-auto flex px-3">
          <div className="flex flex-row font-bold gap-2 items-center">
            <BiArrowBack
              onClick={goBack}
              className="text-blue-400 text-[16px]"
            />
            <Link>
              <span onClick={goBack} className="text-blue-400 cursor-pointer">
                Back
              </span>
            </Link>
            <FaAngleRight className="text-gray-500 text-[16px]" />
            <span className="text-gray-500">All notifications</span>
          </div>
        </div>
      </div>

      <div className={`container m-auto min-h-[calc(100vh-148px)] px-3 py-12`}>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-[24%] border bg-white rounded-md">
            <div className="flex flex-col">
              <div className="flex flex-row p-4 border-b-[2px]">
                <div className="flex flex-grow text-base font-medium text-gray-900">
                  Notification
                </div>
                <div className="text-black text-xl leading-3 relative">...</div>
              </div>

              <div className="flex flex-col overflow-y-auto">
                {notificationList.length &&
                  notificationList.map((item, index) => (
                    <div
                      key={item.id + "_" + index}
                      className="p-2 border-b-[1px]"
                    >
                      <MenuItem
                        key={index}
                        className="flex flex-col justify-between gap-2 py-2 pl-2 hover:bg-[#FFE5B4]"
                        onClick={() => handleClick(item)}
                      >
                        <div className="flex flex-row gap-3 w-full">
                          <div className="bg-[#f6a192] text-white border-[#009A2B] py-1 px-2 text-[12px] rounded-[4px] capitalize font-bold">
                            {"" + item.roles}
                          </div>
                          <div
                            className={`flex flex-grow items-center justify-end text-sm ${
                              item.read_status === "Read"
                                ? "font-medium"
                                : "font-bold"
                            }`}
                          >
                            {item.date}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            <div
                              className={`${
                                item.read_status === "Read"
                                  ? "font-medium"
                                  : "font-bold"
                              } text-gray-900`}
                            >
                              {item.title}
                            </div>
                            <div
                              className={`${
                                item.read_status === "Read"
                                  ? "font-medium"
                                  : "font-bold"
                              }`}
                            >
                              {item.subText}
                            </div>
                          </Typography>
                        </div>
                      </MenuItem>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[74%]">
            {selectedNotification && (
              <DetailedNotification notification={selectedNotification} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
