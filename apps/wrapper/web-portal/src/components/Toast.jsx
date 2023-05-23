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
      bgcolor: "bg-red-600"
    },
    warning: {
      id: "toast-warning",
      icon_class:
        "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
      icon: "Warning icon",
      bgcolor: "bg-orange-600"
    },
  };

  return (
    <>
      <div className="absolute z-20 right-[12px] top-[12px]">
        <div
          id={types[toastType].id}
          className={`flex items-center w-full min-w-[400px] max-w-[800px] p-4 text-white ${types[toastType].bgcolor} rounded-lg shadow dark:text-white dark:bg-gray-800 `}
          role="alert"
        >
          {/* <div
            class={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${types[toastType].icon_class}`}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">{types[toastType].icon}</span>
          </div> */}
          <div class="ml-3 text-lg font-bold font-normal">{toastMsg}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
