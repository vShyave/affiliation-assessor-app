import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { MdNotifications } from "react-icons/md";
import { getCookie, readableDate } from "../../utils";
import { getNotifications, readNotification } from "../../api";
import { ContextAPI } from "../../utils/ContextAPI";

export default function Overlay() {
  const navigation = useNavigate();
  const [notificationList, setNotifcationList] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState({});
  const { setSpinner } = useContext(ContextAPI);

  const handleClick = async (notification) => {
    setSelectedNotification(notification);
    setNotificationReadStatus({ notification_id: notification.id });
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.notifications.home}/${notification.id}`;
    navigation(navigationURL);
  };

  const setNotificationReadStatus = async (notifId) => {
    try {
      setSpinner(true);
      const res = readNotification(notifId);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const getAllNotifications = async () => {
    const postData = {
      user_id: getCookie("regulator")?.[0]?.user_id,
    };
    try {
      setSpinner(true);
      const res = await getNotifications(postData);
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
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleNavigateToNotification = () => {
    navigation(ADMIN_ROUTE_MAP.adminModule.notifications.home);
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <>
      <Menu>
        <MenuHandler>
          <IconButton variant="text">
            <MdNotifications className="text-2xl text-gray-500" />
          </IconButton>
        </MenuHandler>
        <MenuList className="flex flex-col overflow-y-auto max-h-[520px] p-0">
          <div className="flex flex-row p-4 border-b-[2px]">
            <div className="flex flex-grow text-base font-semibold text-gray-900 ">
              Notification
            </div>
            {notificationList.length && (
              <div
                onClick={handleNavigateToNotification}
                className="flex text-blue-600 pr-2 cursor-pointer items-center"
              >
                View all
              </div>
            )}
          </div>

          {notificationList.length &&
            notificationList.map((item, index) => (
              <div key={item.id + "_" + index} className="p-2">
                <MenuItem
                  className="flex flex-col justify-between gap-3 hover:bg-[#FFE5B4] p-2"
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
                  <div color="gray" className="font-normal flex flex-col gap-1">
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
                  </div>
                </MenuItem>
              </div>
            ))}
        </MenuList>
      </Menu>
    </>
  );
}
