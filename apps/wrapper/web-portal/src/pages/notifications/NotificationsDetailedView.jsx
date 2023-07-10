import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import DetailedNotification from "../notifications/DetailedNotification";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";

export default function NotificationsDetailedView({notification}) {
  const [selectedUser, setSelectedUser] = useState([]);

  //   const [toast, setToast] = useState({
  //     toastOpen: false,
  //     toastMsg: "",
  //     toastType: "",
  //   });

  const DUMMY_DATA = [
    {
      roles: ["Admin"],
      title: "Title One",
      body: "Creation of user role",
      date: "16/02/2023",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sed voluptatum ut nihil voluptate, praesentium veritatis consequatur, exercitationem molestias voluptates aperiam aliquam nam! Voluptas eveniet suscipit nihil fugit debitis est!",
    },
    {
      roles: ["Admin", "User"],
      title: "Title Two",
      body: "Creation of user role two",
      date: "16/04/2023",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, commodi perferendis aliquam ipsum sit explicabo impedit ad possimus doloremque doloribus cumque magnam veritatis repudiandae facere architecto. Fuga perferendis quisquam ducimus!",
    },
    {
      roles: ["Application"],
      title: "Title Three",
      body: "Creation of user role",
      date: "16/06/2023",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus assumenda consequatur ea illo voluptate fuga facere pariatur est mollitia voluptatum iure quas vitae in, rerum, debitis exercitationem dolorem non dolores.",
    },
    {
      roles: ["Admin", "Assessor"],
      title: "Title Four",
      body: "Creation of user role fourth",
      date: "16/05/2023",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod quasi mollitia quisquam reiciendis autem! Voluptatem odit, quos at obcaecati tempore veritatis excepturi, autem perspiciatis omnis amet doloremque numquam ipsam?",
    },
    {
      roles: ["Admin", "Assessor"],
      title: "Title Five",
      body: "Creation of user role fifth",
      date: "16/05/2023",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod quasi mollitia quisquam reiciendis autem! Voluptatem odit, quos at obcaecati tempore veritatis excepturi, autem perspiciatis omnis amet doloremque numquam ipsam?",
    },
    {
      roles: ["Admin", "Assessor"],
      title: "Title Six",
      body: "Creation of user role fifth",
      date: "16/05/2023",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod quasi mollitia quisquam reiciendis autem! Voluptatem odit, quos at obcaecati tempore veritatis excepturi, autem perspiciatis omnis amet doloremque numquam ipsam?",
    },
    {
      roles: ["Admin", "Assessor"],
      title: "Title Seven",
      body: "Creation of user role fifth",
      date: "16/05/2023",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod quasi mollitia quisquam reiciendis autem! Voluptatem odit, quos at obcaecati tempore veritatis excepturi, autem perspiciatis omnis amet doloremque numquam ipsam?",
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
      <div className="flex flex-row gap-1">
        <div className="flex w-[30%] border w-[276px] overflow-y-auto h-[720px] shadow-xl flex-col justify-between bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex items-center py-2 pl-2">
              <div className="flex flex-row gap-28 items-center">
                <div variant="small" color="gray" className="font-normal ">
                  <span className="text-base font-semibold text-gray-900">
                    Notification
                  </span>
                </div>
            
                      <div className="text-black pr-2 text-xl">...</div>
              </div>
            </div>
            <hr />

            {DUMMY_DATA.map((item, index) => (
              <>
                <MenuItem
                  key={index}
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
          {selectedUser ? <DetailedNotification user={selectedUser} /> : <DetailedNotification user={notification}/>}
        </div>
      </div>
    </>
  );
}
