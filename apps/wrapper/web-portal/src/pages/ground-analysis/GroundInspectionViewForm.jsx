import React, {useEffect, useState} from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

import Card from "./../../components/Card";
import NocModal from "./NocModal";
import StatusLogModal from "./StatusLogModal";
import IssueCertificateModal from "./IssueCertificationModal";
import RejectNocModal from "./RejectNocModal";
import Sidebar from "../../components/Sidebar";


import { getFormData } from "../../api";


export default function ApplicationPage({ closeModal,closeRejectModal,closeStatusModal,closeCertificateModal }) {

    const[openModel, setOpenModel] = useState(false)
    const[rejectModel, setRejectModel] = useState(false)
    const[openStatusModel, setOpenStatusModel] = useState(false)
    const[openCertificateModel,setOpenCertificateModel] = useState(false)


    const fetchFormData = async () => {
        const postData = {"date":"2023-05-05","assessor_id":"427d473d-d8ea-4bb3-b317-f230f1c9b2f7","applicant_id": 11};
        const res = await getFormData(postData);
        console.log('res - ', res);
    };

    useEffect(() => {
        fetchFormData();
    });

    return (
        <>
            <div className="flex flex-col gap-12">
                <div className="flex flex-row">
                    <div className="flex grow justify-start items-center">
                        <h1 className="text-2xl font-bold">New Institute - BSC GNM</h1>
                    </div>
                    <div className="flex grow gap-4 justify-end items-center">
                        <button onClick={()=>{setRejectModel(true)}} className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 bg-white text-gray-500 w-[140px] h-[40px] font-medium rounded-[4px]">Reject <span><AiOutlineClose/></span> </button>
                        <button onClick={()=>{setOpenModel(true)}} className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]">Approve <span><AiOutlineCheck/></span></button>
                        <div className="inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"></div>
                        <button onClick={()=>{setOpenStatusModel(true)}} className="border border-gray-500 text-blue-600 bg-gray-100 w-[140px] h-[40px] font-medium rounded-[4px]">View status log</button>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex w-[30%]"><Sidebar/></div>
                    <div className="flex w-full flex-col gap-4">
                        <Card moreClass="flex flex-col shadow-md border border-[#F5F5F5] gap-4" styles={{backgroundColor: '#F5F5F5'}}>
                            <div className="p-1 flex justify-center border border-[#D9D9D9] rounded-[4px]" style={{backgroundColor: '#EBEBEB'}}>
                                <h4 className="text-secondary font-medium">Status: Inspection completed</h4>
                            </div>
                            <div className="flex justify-center">
                                The field visit is complete, no flaws found. Please approve.
                            </div>
                        </Card>
                        <Card moreClass="shadow-md"></Card>
                    </div>
                </div>
            </div>
            { openModel && <NocModal closeModal={setOpenModel}/> }
            { rejectModel && <RejectNocModal closeRejectModal={setRejectModel}/> }
            {/* {openCertificateModel && <IssueCertificateModal closeCertificateModal={setOpenCertificateModel}/>} */}
            { openStatusModel && <StatusLogModal closeStatusModal={setOpenStatusModel}/> }
        </>
    )
}