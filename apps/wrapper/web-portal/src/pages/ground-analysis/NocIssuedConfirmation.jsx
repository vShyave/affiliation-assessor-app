import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";

import { FaThumbsUp} from "react-icons/fa";

export default function NocIssued({ notification }) {
  const navigation = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-2 mt-8 text-center">
        <div className="rounded-full w-[60px] h-[60px] items-center flex mx-auto bg-gray-300">
        <FaThumbsUp className="text-green-700 w-full text-2xl" />
        </div>
        <h2 className="text-xl font-semibold m-2">NOC has been issued</h2>
        <p className="text-m">
          We will review your application and proceed with next steps.
        </p>
        <p>
          You can keep the track status of this application under 'My
          applications' section.
        </p>
        <div className="flex place-items-end mx-auto gap-4">
          <Button
            onClick={() => navigation("/groundInspection")}
            moreClass="px-6 m-2 text-white"
            text="Back to applications"
          />
        </div>
      </div>
    </>
  );
}
