import React from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
// import { Checkbox } from "./Checkbox";
import { Checkbox } from "@material-tailwind/react";
import GlobalFilter from "./GlobalFilter";

import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

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
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect)
  

{/**
    
These lines of code are required , please don't delete
 */}

  //   (hooks) => {
  //     hooks.visibleColumns.push((columns) => {
  //       return [
  //         {
  //           id: "selection",
  //           Header: ({ getToggleAllRowsSelectedProps }) => (
  //             <Checkbox {...getToggleAllRowsSelectedProps()} />
  //           ),
  //           Cell: ({ row }) => (
  //             <Checkbox {...row.getToggleRowSelectedProps()} />
  //           ),
  //         },
  //         ...columns,
  //       ];
  //     });
  //   }
  // );

  const { globalFilter, pageIndex, pageSize } = state;
 
  // {
  //   array = JSON.stringify(
  //     {
  //       selectedFlatRows: selectedFlatRows.map((row) => row.original),
  //     },
  //     null,
  //     2
  //   );
  //   {
  //     console.log(array);
  //   }
  // }
  

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="overflow-x-auto">
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
                    className="px-6 py-3"
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
                        className="px-6 py-4"
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

      <div className="flex flex-col font-normal text-[16px] py-8 gap-8">
        <span className="font-medium flex justify-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div className="flex justify-between ">
          <button
            className=""
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <span className="font-medium">
            Go to page:{" "}
            <input
              className="rounded-md border-0 p-2 w-[70px] h-[40px]  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <select
            className="border text-gray-300 p-2 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          {/* Do not remove the following comment code, need it for later */}
          {/* <div className="w-60 bg-blue-700">
            <Select label="Select page size">
              {
                [10,25,50].map((pageSize) => (
                    <Option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </Option>
                ))
              }
            </Select>
          </div> */}
          <button
            className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilteringTable;
