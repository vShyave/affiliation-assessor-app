import React, { useEffect, useState } from "react";

const Toast = (props) => {
  const { toastMsg, toastType } = props;
  const types = {
    success: {
      id: "toast-success",
      icon_class:
        "text-green-500 bg-green-100  dark:bg-green-800 dark:text-green-200",
      icon: "Check icon",
      bgcolor: "bg-secondary",
    },
    error: {
      id: "toast-danger",
      icon_class: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
      icon: "Error Icon",
      bgcolor: "bg-red-600",
    },
    warning: {
      id: "toast-warning",
      icon_class:
        "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
      icon: "Warning icon",
      bgcolor: "bg-orange-600",
    },
  };

  return (
    <>
      <div className="z-[200] right-[12px] top-[12px] fixed">
        <div
          id={types[toastType]?.id}
          className={`flex items-center w-full min-w-[400px] max-w-[800px] p-4 text-white ${types[toastType]?.bgcolor} rounded-lg shadow dark:text-white dark:bg-gray-800 `}
          role="alert"
        >
          <div className="ml-3 text-lg font-bold font-normal">{toastMsg}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
