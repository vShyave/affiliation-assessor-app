import React, { useEffect } from "react";

import { Card } from "./../../components";

const DetailedNotification = ({ notification }) => {
  if (!notification) {
    return (
      <div className="flex flex-row items-center justify-center">
        <h1>No Notifications found!</h1>
      </div>
    );
  } else
    return (
      <Card moreClass="shadow-md h-[720px] p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <div className="bg-[#f6a192] text-white border-[#009A2B] py-1 px-2 text-[12px] rounded-[4px] capitalize font-bold">
              {"" + notification.roles}
            </div>
            <div className="flex flex-grow justify-end items-center text-md text-gray-900">
              {notification.date}
            </div>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto">
            <div className="font-semibold text-gray-900 text-2xl">
              {notification.title}
            </div>
            <div>
              <div>{notification.body}</div>
            </div>
            <div>
              <div>{notification.text}</div>
            </div>
          </div>
        </div>
      </Card>
    );
};

export default DetailedNotification;
