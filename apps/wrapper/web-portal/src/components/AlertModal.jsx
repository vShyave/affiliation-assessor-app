import React, { useState } from 'react';
import Label from './Label';


function AlertModal({showAlert,actionFunction,alertTitle,actionButtonLabel, alertMsg,actionProps}) {
      
  return (
    
      <>
        <div className='flex justify-center items-center fixed inset-0 bg-opacity-25 z-10 backdrop-blur-sm'>
            <div className='flex justify-between p-4 rounded-xl shadow-xl border border-gray-400 bg-white max-w-[580px] max-h-[300px] '>
                <div className='flex flex-col gap-4 min-w-[400px]'>
                    <div className='title flex font-bold'>
                        <h1>{alertTitle}</h1>
                    </div>
                        <div className='body flex justify-center'>
                            <Label moreClass='max-w-[520px] max-h-[160px] p-2 rounded-xl resize' text={alertMsg} />
                        </div>
                     <div className='footer flex flex-row justify-between'>
                        <button onClick={() => {showAlert(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Cancel</button>
                        <button onClick={()=>actionFunction(actionProps)} className={`border  w-[140px] h-[40px] font-medium rounded-[4px] ${actionButtonLabel==="Delete" ? "border-red-800 text-white bg-red-800" : "border-blue-500 text-white bg-blue-500"}`}>{actionButtonLabel}</button>
                    </div>
                </div>
            </div>
        </div>
     </>
    )
   }

export default AlertModal
