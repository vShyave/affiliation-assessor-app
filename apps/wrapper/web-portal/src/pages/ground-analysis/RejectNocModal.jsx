import React from 'react'

function RejectNocModal({closeRejectModal}) {
  return (
      <>
        <div className='flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm'>
            <div className='flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]'>
                <div className='flex flex-col gap-4'>
                    <div className='title flex font-bold'>
                        <h1>Reason for rejection</h1>
                    </div>
                        <div className='body'>
                            <textarea placeholder='Write here' className='border w-[520px] h-[160px] p-2 rounded-xl resize-none' name="" id="" cols="30" rows="10"></textarea>
                        </div>
                     <div className='footer flex flex-row justify-between'>
                        <button onClick={() => {closeRejectModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button>
                        <button className="border border-blue-500 text-white bg-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Submit</button>
                    </div>
                </div>
            </div>
        </div>
     </>
    )
   }

export default RejectNocModal
