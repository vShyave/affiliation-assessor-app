import React, { useEffect } from "react";

export default function OGASidebar(props) {
  const postFormSelected = (formObj) => {
    props.setFormSelected(formObj);
  };

  useEffect(() => {}, [props.OGAFormsList]);

  return (
    <div className="flex flex-col h-screen w-full">
      <ul className="flex flex-col text-sm font-medium">
        <li className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200">
          <span>Applicant Form</span>
        </li>
        {props.OGAFormsList.map((forms) => {
          return (
            <li
              className="p-3 border-4 border-[#F3F4F6] cursor-pointer hover:bg-gray-200 hover:border-l-blue-700 hover:border-y-gray-200 hover:border-r-gray-200"
              onClick={() => postFormSelected(forms)}
            >
              <span>{forms?.course?.course_name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
