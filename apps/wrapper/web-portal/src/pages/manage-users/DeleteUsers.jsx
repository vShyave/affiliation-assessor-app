import React, { useEffect, useState } from "react";
import { getOnGroundViewStatus } from "../../api";

import { Button } from "../../components";

function DeleteUsersModal({ closeDeleteUsersModal,setDeleteFlags }) {
  //   const [formStatus, setFormStatus] = useState({})

  //   useEffect(()=>{
  // async function fetchData(){
  //   const postData = {"form_id": 23}
  //   const res = await getOnGroundViewStatus(postData)
  //   console.log('res here - ', res);
  //   setFormStatus(res.form_submissions[0])
  // }
  // fetchData();
  //   },[])



  return (
    <>
      <div className="flex flex-col justify-center items-center fixed inset-0 bg-opacity-25 backdrop-blur-sm">
        <div className="flex bg-white rounded-xl shadow-xl border border-gray-400 w-[760px] h-[270px] p-8">
          <div className="flex flex-col justify-between w-full">
            <div className="flex text-xl font-semibold">
              <h1>Want to delete?</h1>
            </div>
            <div>
              <p className="text-base">
              Are you sure, you want to delete the user/s ? Once deleted, 
                this action cannot be reverted.
              </p>
            </div>
            <hr />
            <div className="footer flex flex-row gap-4 justify-end">
              <Button
                onClick={() => {
                  closeDeleteUsersModal(false);
                  
                }}
                moreClass="border border-gray-200 bg-white text-blue-600 w-[120px]"
                text="Cancel"
              ></Button>
              <Button
                onClick={() => {
                  closeDeleteUsersModal(false);
                  setDeleteFlags(true)
                }}
                moreClass="border border-red-600 bg-red-600 text-white w-[120px]"
                text="Delete"
              ></Button>
              {/* <button onClick={() => {closeStatusModal(false)}} className="border border-blue-500 bg-white text-blue-500 w-[140px] h-[40px] font-medium rounded-[4px]">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteUsersModal;
