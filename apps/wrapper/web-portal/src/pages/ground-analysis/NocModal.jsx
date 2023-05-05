import React from 'react'

function NocModal({closeModal}) {
  return (
    <div className='flex justify-center p-2 rounded-xl shadow-xl border border-gray-400 w-[580px] h-[380px]'>
        <div className='flex flex-col gap-4'>
            <div className='title flex font-bold'>
                <h1>Issue NOC</h1>
            </div>
            <div className=''>
            <textarea className='border w-[520px] p-2' name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className='footer flex flex-row justify-between'>
            <button onClick={() => {closeModal(false)}} className="border border-blue-500 bg-white  text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Reject</button>
            <button className="border border-blue-500 text-white bg-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Approve</button>

            </div>

        </div>
      
    </div>
  )
}

export default NocModal
