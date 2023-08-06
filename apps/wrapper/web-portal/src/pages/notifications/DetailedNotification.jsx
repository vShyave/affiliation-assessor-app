import React, { useEffect } from "react";

import { Card } from "./../../components";

const DetailedNotification = ({ notification }) => {
  if (!notification) {
    return <div></div>;
  } else
    return (
      <Card moreClass="shadow-md w-[1024px] h-[720px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <div className="w-fit bg-[#f6a192] text-white border-[#009A2B] py-1 px-3 text-[12px] rounded-[24px] capitalize font-semibold mt-4">
              {"" + notification.roles}
            </div>
            <div className="font-semibold text-gray-900 text-2xl">
              {notification.title}
            </div>
            <div>
              <div>{notification.body}</div>
            </div>
          </div>
          <div className="flex items-top text-md mt-4 text-gray-900">
            {notification.date}
          </div>
        </div>
      </Card>
    );
};

export default DetailedNotification;
