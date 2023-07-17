import React, { useEffect, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import { Checkbox } from "@material-tailwind/react";
import GlobalFilter from "./GlobalFilter";

import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiFillExclamationCircle,
} from "react-icons/ai";

const FilteringTable = (props) => {
  let array = [];
  const columns = props?.columns;
  const data = props?.dataList;
  // const onFormHandler = () => {};
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data /* initialState : {
      pageSize: 200
    } */,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      if (props.showCheckbox) {
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => {
                /*       if (row.original.values.isRowInvalid != undefined && row.original.values.isRowInvalid === true) {
                    return(
                     <AiFillExclamationCircle className="text-red-400 text-2xl" />
                  )
                  }
                  else {
                    return (
                      <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                  }  */
                return <Checkbox {...row.getToggleRowSelectedProps()} />;
              },
            },
            ...columns,
          ];
        });
      }
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;
  useEffect(() => {
    if (!props.pagination) {
      setPageSize(1000);
    }
  }, []);

  {
    array = JSON.stringify(
      {
        selectedFlatRows: selectedFlatRows.map((row) => row.original),
      },
      null,
      2
    );
    {
      props.onRowSelect(array);
    }
  }

  return (
    <>
      {props.showFilter && (
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          filterApiCall={props.filterApiCall}
        />
      )}
      <div className={`overflow-x-auto ${props.moreHeight}`}>
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups?.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers?.map((column, idx) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4"
                    key={`${index}_${idx}`}
                  >
                    <span className="inline-block">
                      {column.render("Header")}
                    </span>
                    <span className="inline-block ml-[8px]">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <AiOutlineArrowUp />
                        ) : (
                          <AiOutlineArrowDown />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page?.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  onClick={() => props.navigateFunc(row)}
                  key={index}
                >
                  {row.cells?.map((cell, idx) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="p-4"
                        key={`${index}_${idx}`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {props.pagination && (
        <div className="flex flex-row font-normal text-[16px] py-8 gap-8">
          <div className="flex flex-grow items-center">
            <span className="font-bold">
              Page {/* <strong> */}
              {pageIndex + 1} of {pageOptions.length}
              {/* </strong> */}{" "}
            </span>
          </div>
          <div className="flex flex-row gap-6">
            <button
              className="px-3 text-gray-300 border bg-blue-700 font-medium rounded-[4px] text-white"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px] text-white"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            {/* Uncomment this for Go To PageNumber */}
            {/* 
                <span className="font-medium">
                  Go to page:{" "}
                  <input
                    className="rounded-md border-0 p-2 w-[70px] h-[40px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                  />
                </span>
              */}

            <select
              className="border text-gray-300 p-2 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px] text-white"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>

            <button
              className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px] text-white"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className="px-3 text-gray-300 border bg-blue-700 font-medium rounded-[4px] text-white"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilteringTable;
