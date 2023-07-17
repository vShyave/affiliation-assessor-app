import React, { useState } from 'react';
import { getAcceptApplicant } from "../../api";
import ADMIN_ROUTE_MAP from "../../routes/adminRouteMap";
import { useNavigate } from "react-router-dom";




function NocModal({closeModal,setToast}) {
    const navigate = useNavigate();


    const handleChange = (e) =>{
            setComment(e.target.value)
    }
    
    const [comment, setComment] = useState('')

    const handleAcceptApplicant = async() => {
        
        const postData = {"form_id": 23, "remarks": comment,"date": new Date().toISOString().substring(0,10)}
        const res = await getAcceptApplicant(postData)
        
        setToast((prevState)=>({...prevState,toastOpen:true,toastMsg:"The form is successfully approved!",toastType:"success"}))
        setTimeout(()=>(setToast((prevState)=>({...prevState,toastOpen:false,toastMsg:"",toastType:""}))),3000)
        console.log('res',res)
        closeModal(false)
        // navigate to next page
        { navigate(ADMIN_ROUTE_MAP.adminModule.onGroundInspection.nocForm) }

    
    }
    
  return (
    
      <>
        <div className='flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm'>
            <div className='flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]'>
                <div className='flex flex-col gap-4'>
                    <div className='title flex font-bold'>
                        <h1>Issue NOC</h1>
                    </div>
                        <div className='body'>
                            <textarea onChange={handleChange} placeholder='Write here' className='border w-[520px] h-[160px] p-2 rounded-xl resize-none' name="" id="" cols="30" rows="10"></textarea>
                        </div>
                     <div className='footer flex flex-row justify-between'>
                        <button onClick={() => {closeModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Cancel</button>
                        <button onClick={handleAcceptApplicant} className="border border-blue-500 text-white bg-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Approve</button>
                    </div>
                </div>
            </div>
        </div>
     </>
    )
   }

export default NocModal
