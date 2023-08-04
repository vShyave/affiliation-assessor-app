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
  const {setSpinner} = useContext(ContextAPI)
 
  const handleClick = async (notification) => {
    // setSelectedNotification(notification);
    console.log(notification);
    setSelectedNotification(notification);
    console.log(selectedNotification);
    setNotificationReadStatus({notification_id:notification.id});
    const navigationURL = `${ADMIN_ROUTE_MAP.adminModule.notifications.home}/${notification.id}`;
    navigation(navigationURL);
  };

  const setNotificationReadStatus = async (notifId) => {
    try {
      setSpinner(true)
      const res = readNotification(notifId);
      console.log(res);
    } catch (error) {
      console.log(error);
    }finally{
      setSpinner(false)
    }
  };

  const getAllNotifications = async () => {
    const postData = {
      user_id: getCookie("regulator")[0]["user_id"],
    };
    try {
      setSpinner(true)
      const res = await getNotifications(postData);
      console.log(res);
      const notifList = res.data.notifications.map((item) => ({
        roles: [item?.user_type],
        title: item?.title,
        body: item?.body,
        date: readableDate(item?.date),
        text: item?.body,
        subText: item?.body.substr(0, 20) + "...",
        read_status: item?.read_status,
        id: item?.id,
      }));
      setNotifcationList(notifList);
    } catch (error) {
      console.log(error);
    }finally{
      setSpinner(false)
    }
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
        <MenuList className="flex flex-col gap-2 overflow-y-auto h-[520px]">
          <div className="flex items-center py-2 pl-2">
            <div className="flex flex-row gap-40 ">
              <Typography variant="small" color="gray" className="font-normal">
                <span className="text-base font-semibold text-gray-900">
                  Notification
                </span>
              </Typography>
              <Typography
                variant="small"
                className="flex items-center text-s text-gray-600"
              >
                <NavLink
                  to={ADMIN_ROUTE_MAP.adminModule.notifications.home}
                  className="text-blue-600 pr-2"
                >
                  View all
                </NavLink>
              </Typography>
            </div>
          </div>
          <hr />

          {notificationList.length &&
            notificationList.map((item, index) => (
              <div key={item.id + "_" + index}>
                <MenuItem
                  className="flex flex-row justify-between gap-2 py-2 pl-2 hover:bg-[#FFE5B4]"
                  onClick={() => handleClick(item)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-fit bg-[#f6a192] text-white border-[#009A2B] py-1 px-3 text-[12px] rounded-[24px] capitalize font-semibold">
                      {"" + item.roles}
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
                  </div>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs text-gray-900"
                  >
                    <div
                      className={`${
                        item.read_status === "Read"
                          ? "font-medium"
                          : "font-bold"
                      }`}
                    >
                      {item.date}
                    </div>
                  </Typography>
                </MenuItem>
                <hr />
              </div>
            ))}
        </MenuList>
      </Menu>
    </>
  );
}
