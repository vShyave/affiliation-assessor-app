import React,{useState} from 'react'
import { useAsyncDebounce } from 'react-table';
import { MdFilterList } from "react-icons/md";




const GlobalFilter = ({filter,setFilter}) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value =>{
        setFilter(value || undefined)
    },1000)

  return (
    <div className="mb-3">
       <div className='flex flex-wrap gap-8'> 
  <div className="relative mb-4 bg-white flex w-1/4  items-stretch">
    <input
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value) 
        onChange(e.target.value)}}
      type="search"
      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder=  "Search"
      
     />
     </div>
     <div>
   <MdFilterList className='ml-2 mt-1'/>
   
   
    {/* <!--Search icon--> */}
    {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5">
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clip-rule="evenodd" />
      </svg> */}
  </div>
  </div>
</div>
  )
}

export default GlobalFilter
