import React, { useMemo } from 'react'
import { useTable,usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA .json'
import { COLUMNS } from './Columns'
// import './table.css'

const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS,[])
    const data = useMemo(() => MOCK_DATA,[])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow } = useTable({columns,data},usePagination)

        const { pageIndex, pageSize } = state

  return (
    <>
    <div className="relative overflow-x-auto">
    <table { ...getTableProps() } className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> 
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        
            {headerGroups.map((headerGroup) =>(
        
            <tr {...headerGroup.getHeaderGroupProps()}>
                {
                    headerGroup.headers.map(column =>(
                        <th{...column.getHeaderProps()} scope="col" className="px-6 py-3">{column.render('Header')}</th>

                    ))
                }
            </tr>
            ))}
      </thead>
      <tbody { ...getTableBodyProps() }>
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {
                                row.cells.map((cell)=> {
                                   return <td{...cell.getCellProps()} className="px-6 py-4">{cell.render('Cell')}</td>
                                }
                                )
                            }
                             
                            </tr>
                        )
                    })
                }
            
      </tbody>
    </table>
   </div>
   <div className="flex justify-center font-normal text-[16px] gap-8 p-8">
     <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
   <button className="border border-blue-900 text-white bg-blue-800 w-[80px] h-[40px] " onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
   <span className="font-bold">
   Page{' '}
   <strong>
    {pageIndex + 1} of {pageOptions.length}
   </strong>{' '}
   </span>
   <span className="font-bold">
     Go to page: {' '}
    <input  
    className=" rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      type="number" 
      defaultValue={pageIndex + 1}
      onChange={(e) =>{
        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
        gotoPage(pageNumber)
      }}
            />
   </span>
   <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
    {
        [3,5,10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
                Show {pageSize}
            </option>
        ))
    }
    </select>
   <button className="border border-blue-900 text-white bg-blue-800 w-[80px] h-[40px] " onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
   <button onClick={()=> gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
   </div>
    </>
  )
}






export default PaginationTable
