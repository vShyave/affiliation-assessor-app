import React from 'react'

function StatusLogModal({closeStatusModal}) {
  return (
    <>
    <div className='flex w-full h-full bg-blur-sm justify-center items-center'>
    <div className='flex justify-center bg-white rounded-xl shadow-xl border border-gray-400 w-[560px] h-[520px]'>
        <div className='flex flex-col mt-8 gap-4'>
            <div className='flex text-xl font-medium'>
                <h1>Status log</h1>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 border bg-gray-100 w-[480px] h-[150px] p-4'>
                  <p className='font-medium'>Returned</p>
                  <p className='text-sm text-gray-600'>Your application is on-hold because of so and so issue was found in the so and so document.Please reupload the documents before dd/mm/yyyy.</p>
                  <p className='text-sm text-gray-600'>30 Mar 2023</p>
                </div>
                <div className='flex flex-col gap-4 border bg-gray-100 w-[480px] h-[100px] p-4'>
                  <p className='font-medium'>Under review</p>
                  <p className='text-sm text-gray-600'>29 Mar 2023</p>
                </div>
                <div className='flex flex-col gap-4 border bg-gray-100 w-[480px] h-[100px] p-4'>
                  <p className='font-medium'>Received on</p>
                  <p className='text-sm text-gray-600'>25 Mar 2023</p>
                </div>
            </div>
            <div className='footer flex flex-row justify-end'>
            <button onClick={() => {closeStatusModal(false)}} className="border border-blue-500 bg-white  text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button>
            </div>
         </div>
      </div>
    </div>
  </>
  )
}

export default StatusLogModal
