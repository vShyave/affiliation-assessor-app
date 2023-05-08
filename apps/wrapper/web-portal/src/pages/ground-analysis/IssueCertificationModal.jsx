import React from 'react'

function IssueCertificateModal({closeCertificateModal}) {
  return (
    <>
    <div className='flex justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm'>
      <div className='flex justify-center p-4 rounded-xl shadow-xl border border-gray-400 bg-gray-100 w-[580px] h-[300px]'>
            <div className='flex flex-col gap-4'>
                <div className='title flex font-bold'>
                  <h1>Issue certificate</h1>
                </div>
                <div className='body'>
                  <textarea placeholder='Write here' className='border w-[520px] h-[160px] rounded-xl p-2' name="" id="" cols="30" rows="10"></textarea>
                </div>
                    <div className='footer flex flex-row justify-between'>
                    <button onClick={() => {closeCertificateModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Cancel</button>
                    <div className='flex flex-row gap-4'>
                        <button className="border border-blue-500 text-blue-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]">Skip</button>
                        <button className="border border-blue-500 text-white bg-blue-500 w-[180px] h-[40px] font-medium rounded-[4px]">Select certificates</button>
                    </div>
                </div>
            </div>
       </div>
    </div>
    </>
  )
}

export default IssueCertificateModal
