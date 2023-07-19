import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";



export default function Breadcrumb({info}) {
  return (
    <>
    <div className="h-[48px] bg-white flex justify-start drop-shadow-sm">
<div className="container mx-auto px-3 py-3">
  <div className="flex flex-row font-bold gap-2 items-center">
    <Link to={info.link1}>
      <span className="text-primary-400 cursor-pointer">
        {info.text1}
      </span>
    </Link>
    <FaAngleRight className="text-[16px]" />
    <Link to={info.link2}>
    <span className="text-gray-500">{info.text2}</span>
    </Link>
    <FaAngleRight className="text-[16px]" />
    <span className="text-gray-500 uppercase">ABC</span>
  </div>
</div>
</div> 
</>
  )
}



