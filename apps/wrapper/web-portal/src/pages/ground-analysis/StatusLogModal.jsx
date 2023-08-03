import React, { useEffect, useState } from 'react'
import { getOnGroundViewStatus } from "../../api";

import { Button } from '../../components';

function StatusLogModal({closeStatusModal}) {
  const [formStatus, setFormStatus] = useState({})

  useEffect(()=>{
    async function fetchData(){
      const postData = {"form_id": 23}
      const res = await getOnGroundViewStatus(postData)
      console.log('res here - ', res);
      setFormStatus(res.form_submissions[0])
    }
    fetchData();
  },[])

  return (
    <>
      <div className='flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm'>
        <div className='flex bg-white rounded-xl shadow-xl border border-gray-400 w-[560px] h-[460px] p-8'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex text-xl font-medium'>
              <h1>Status log</h1>
            </div>
            <div className='flex flex-col gap-2 overflow-auto'>
              <div className='flex flex-col rounded-xl gap-1 border bg-gray-100 p-4'>
                <div className='font-medium'>Returned</div>
                <div className='text-sm text-gray-600'>{formStatus?.remarks}</div>
                <div className='text-sm text-gray-600'>30 Mar 2023</div>
              </div>
              <div className='flex flex-col rounded-xl gap-1 border bg-gray-100 p-4'>
                <div className='font-medium'>Under review</div>
                <div className='text-sm text-gray-600'>{formStatus?.reviewed_on}</div>
              </div>
              <div className='flex flex-col rounded-xl gap-1 border bg-gray-100 p-4'>
                <div className='font-medium'>Received on</div>
                <div className='text-sm text-gray-600'>{formStatus?.submitted_on}</div>
              </div>
            </div>
            <div className='footer flex flex-row justify-end'>
              <Button onClick={() => {closeStatusModal(false)}} moreClass="border border-blue-500 bg-white text-blue-500 w-[140px]"  text="Close"></Button>
              {/* <button onClick={() => {closeStatusModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatusLogModal
