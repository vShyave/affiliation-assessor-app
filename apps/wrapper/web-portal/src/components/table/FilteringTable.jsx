import React, { useEffect, useState } from "react";
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
                // console.log(row?.original?.values?.isRowInvalid);
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

  const { globalFilter } = state;
  const { setPaginationInfo } = props;
  const { limit: pageSize, offsetNo, totalCount } = props.paginationInfo;
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const nextPage = () => {
    setPageIndex((prevState) => prevState + 1);
    setPaginationInfo((prevState) => ({
      ...prevState,
      offsetNo: offsetNo + pageSize,
    }));
  };
  const previousPage = () => {
    setPageIndex((prevState) => prevState - 1);
    setPaginationInfo((prevState) => ({
      ...prevState,
      offsetNo: offsetNo - pageSize,
    }));
  };
  useEffect(() => {
    if (!props.pagination) {
      setPageSize(1000);
    }
  }, []);

  useEffect(() => {
    if (pageIndex > 0) {
      setCanPreviousPage(true);
    } else {
      setCanPreviousPage(false);
    }
  }, [pageIndex, totalCount]);

  useEffect(() => {
    setTotalPageCount(Math.ceil(totalCount / pageSize));
    if (
      Math.ceil(totalCount / pageSize) > 1 &&
      pageIndex < Math.ceil(totalCount / pageSize) - 1
    ) {
      setCanNextPage(true);
    } else {
      setCanNextPage(false);
    }
  }, [totalCount, pageSize, pageIndex]);

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
      // console.log(array);
    }
  }

  return (
    <>
      {props.showFilter && (
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          filterApiCall={props.filterApiCall}
          searchApiCall={props.searchApiCall}
          setIsSearchOpen={props.setIsSearchOpen}
          setIsFilterOpen={props.setIsFilterOpen}
          paginationInfo={props.paginationInfo}
          setPaginationInfo={props.setPaginationInfo}
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
        <div className="flex flex-col font-normal text-[16px] py-8 gap-8">
          <span className="font-medium flex justify-center">
            Page{" "}
            <strong>
              {pageIndex + 1} of {totalPageCount}
            </strong>{" "}
          </span>
          <div className="flex justify-between ">
            <button
              className=""
              onClick={() => {
                setPaginationInfo((prevState) => ({
                  ...prevState,
                  offsetNo: 0,
                }));
                setPageIndex(0);
              }}
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
            {/* Uncomment this for Go To PageNumber */}
            {/* <span className="font-medium">
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
          </span> */}

            <select
              className="border text-gray-300 p-2 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
              value={pageSize}
              onChange={(e) => {
                setPaginationInfo((prevState) => ({
                  ...prevState,
                  limit: Number(e.target.value),
                  offsetNo: 0,
                }));
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>

            <button
              className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              onClick={() => {
                setPaginationInfo((prevState) => ({
                  ...prevState,
                  offsetNo: pageSize * (totalPageCount - 1),
                }));
                setPageIndex(totalPageCount - 1);
              }}
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
