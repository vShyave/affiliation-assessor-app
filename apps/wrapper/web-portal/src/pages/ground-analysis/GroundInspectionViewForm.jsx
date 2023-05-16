import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

import { Card, Button } from "./../../components";

import NocModal from "./NocModal";
import StatusLogModal from "./StatusLogModal";
import RejectNocModal from "./RejectNocModal";
import Sidebar from "../../components/Sidebar";

import { getFormData } from "../../api";
import { getPrefillXML } from "./../../api/formApi";

const ENKETO_URL = process.env.REACT_APP_ENKETO_URL;

export default function ApplicationPage({ closeModal, closeRejectModal, closeStatusModal, closeCertificateModal }) {

    const [rejectModel, setRejectModel] = useState(false)
    const [openModel, setOpenModel] = useState(false);
    const [openStatusModel, setOpenStatusModel] = useState(false);
    const [encodedFormURI, setEncodedFormURI] = useState('');
    let { formName, formId } = useParams();

    const userId = "427d473d-d8ea-4bb3-b317-f230f1c9b2f7";
    const formSpec = {
        "skipOnSuccessMessage": true,
        "prefill": {},
        "submissionURL": "",
        "name": formName,
        "successCheck": "async (formData) => { return true; }",
        "onSuccess": {
            "notificationMessage": "Form submitted successfully",
            "sideEffect": "async (formData) => { console.log(formData); }"
        },
        "onFailure": {
            "message": "Form submission failed",
            "sideEffect": "async (formData) => { console.log(formData); }",
            "next": {
                "type": "url",
                "id": "google"
            }
        }
    };

    const fetchFormData = async () => {
        const postData = {"form_id": formId}
        const res = await getFormData(postData);
        const formData = res.data.form_submissions[0];
        console.log('formData - ', formData);
        let formURI = await getPrefillXML(`${formData?.form_name}`, '', formData.form_data, formData.imageUrls);
        setEncodedFormURI(formURI);
    };

    return (
        <>
            <div className="flex flex-col gap-12">
                <div className="flex flex-row">
                    <div className="flex grow justify-start items-center">
                        <h1 className="text-2xl font-bold uppercase">{ formName.split('_').join(' ') }</h1>
                    </div>
                    <div className="flex grow gap-4 justify-end items-center">
                        <button onClick={() => setRejectModel(true)} className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 bg-white text-gray-500 w-[140px] h-[40px] font-medium rounded-[4px]">Reject <span><AiOutlineClose/></span> </button>
                        <button onClick={() => setOpenModel(true)} className="flex flex-wrap items-center justify-center gap-2 border border-gray-500 text-gray-500 bg-white w-[140px] h-[40px] font-medium rounded-[4px]">Approve <span><AiOutlineCheck/></span></button>
                        <div className="inline-block h-[40px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50"></div>
                        <button onClick={() => setOpenStatusModel(true)} className="border border-gray-500 text-blue-600 bg-gray-100 w-[140px] h-[40px] font-medium rounded-[4px]">View status log</button>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex w-[30%]"><Sidebar/></div>
                    <div className="flex w-full flex-col gap-4">
                        <Card moreClass="flex flex-col shadow-md border border-[#F5F5F5] gap-4" styles={{backgroundColor: '#F5F5F5'}}>
                            <div className="p-1 flex justify-center border border-[#D9D9D9] rounded-[4px]" style={{backgroundColor: '#EBEBEB'}}>
                                <h4 className="text-secondary font-medium">Status: Inspection completed</h4>
                            </div>
                        </Card>
                        <Card moreClass="shadow-md">
                            <iframe
                                title = "form"
                                src = {`${ENKETO_URL}preview?formSpec=${encodeURI(JSON.stringify(formSpec))}&xform=${encodedFormURI}&userId=${userId}`}
                                style = {{ minHeight: "100vh", width: "100%" }}
                                />
                        </Card>
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