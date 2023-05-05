import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA .json'
import { COLUMNS } from './Columns'
import { AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";

// import './table.css'

const SortingTable = () => {
    const columns = useMemo(() => COLUMNS,[])
    const data = useMemo(() => MOCK_DATA,[])

   const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = useTable({columns,data},useSortBy)


  return (
    <div className="relative overflow-x-auto">
    <table { ...getTableProps() } className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> 
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        
            {headerGroups.map((headerGroup) =>(
        
            <tr {...headerGroup.getHeaderGroupProps()}>
                {
                    headerGroup.headers.map(column =>(
                        <th{...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className="px-6 py-3">
                        {column.render('Header')}
                        <span>
                        {column.isSorted ? (column.isSortedDesc ?  <AiOutlineArrowUp/> : <AiOutlineArrowDown/>):""}
                        </span>
                        </th>
                    ))
                }
            </tr>
            ))}
      </thead>
      <tbody { ...getTableBodyProps() }>
                {
                    rows.map(row => {
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
  )
}






export default SortingTable
