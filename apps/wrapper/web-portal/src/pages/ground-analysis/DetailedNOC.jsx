import React from "react";

import { Card } from "./../../components";

const DetailedNoc = ({ user }) => {
  if (!user) {
    return (
        <div>
            
        </div>
    )
  }

  return (
    <Card moreClass="shadow-md w-[1024px] h-[720px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold mt-4 ">
            {user.roles}
          </div>
          <div className="font-semibold text-gray-900 text-2xl">
            {user.title}
          </div>
          <div >
            <p>{user.body}</p>
          </div>
            <embed src={user.pdfURL}  className="w-[980px]  mx-auto h-[540px] "  type="application/pdf"/>
        </div>
        <div
          className="flex items-top text-md mt-4 text-gray-900"
        >
          {user.date}
        </div>
      </div>
    </Card>
  );
};

export default DetailedNoc;
