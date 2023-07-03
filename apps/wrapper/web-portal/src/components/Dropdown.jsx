import React, { useState } from "react";

import { MdEdit,MdDelete } from "react-icons/md"

const list = [
    {
        "icon": <MdEdit/>,
        "functionality": "Edit"  
    },
    {
        "icon": <MdEdit/>,
        "functionality": "Deactive"
    },
    {
        "icon": <MdDelete/>,
        "functionality": "Delete"
    }
]



function Dropdown() {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center w-[240px] h-[120px]">
      <button className="bg-gray-200 p-2 flex items-center justify-center w-full" onClick={() => setIsOpen((prev) => !prev)}>Dropdown</button>

      {isOpen && (
        <div className="bg-white absolute flex flex-col items-start top-10 p-2 w-full">
            {list.map((item,i)=>(
                <div className="flex flex-row gap-4 mt-4" key={i}>
                    <span>{item.icon}</span>
                    <span className="text-semibold m-">{item.functionality}</span>
                    
                </div>
            ))}
        </div>)}
    </div>
  );
}

export default Dropdown;
