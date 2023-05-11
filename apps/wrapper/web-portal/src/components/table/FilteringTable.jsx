import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
// import MOCK_DATA from "./MOCK_DATA .json";
import { COLUMNS } from "./Columns";
import GlobalFilter from "./GlobalFilter";

import { AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";


const FilteringTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  //const data = useMemo(() => props?.formsList?.formsDataList, []);
  const data = props?.formsList?.formsDataList;
  const onFormHandler = () => {};
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
  } = useTable({ columns, data }, useGlobalFilter,useSortBy, usePagination);

  const { globalFilter, pageIndex,pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="relative overflow-x-auto">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th{...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3">
                    <span className="inline-block">{column.render('Header')}</span>
                    <span className="inline-block ml-[8px]">
                      {column.isSorted ? (column.isSortedDesc ?  <AiOutlineArrowUp/> : <AiOutlineArrowDown/>):""}
                    </span>
               </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  onClick={() => props.navigateFunc(row)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="px-6 py-4">
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
             Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
         </span>
         <div className="flex justify-between ">
            <button className="" onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
              <button className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <span className="font-medium">
                   Go to page: {' '}
                  <input  
                    className="rounded-md border-0 p-2 w-[70px] h-[40px]  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text" 
                    defaultValue={pageIndex + 1}
                    onChange={(e) =>{
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}
                  />
                </span>
                  <select className="border text-gray-300 p-2 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                      {
                          [10,25,50].map((pageSize) => (
                              <option key={pageSize} value={pageSize}>
                                  Show {pageSize}
                              </option>
                          ))
                      }
                   </select>
                <button className="border text-gray-300 bg-blue-700 w-[140px] h-[40px] font-medium rounded-[4px]" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={()=> gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
          </div>
      </div>
    </>
  );
};

export default FilteringTable;
