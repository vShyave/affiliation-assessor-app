import React, { Fragment, useCallback, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";
import Webcam from "react-webcam";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from '../components/Button';

const videoConstraints = {
    aspectRatio: 0.8,
    facingMode: "user"
};


const CaptureSelfie = () => {
    const [role, setRole] = useState('');
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    
    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    const handleNavigation = () => {
        navigate(ROUTE_MAP.medical_assessment_options)
    }

    return (
        <CommonLayout back={role == 'Medical' ? ROUTE_MAP.medical_assessments : ROUTE_MAP.assessment_type} 
            logoutDisabled 
            iconType='close' 
            pageTitle="2. Capture Selfie" 
            pageDesc="Please ensure that all the assessors are getting captured in the selfie.">
            <div className="flex flex-col px-6 gap-5 pb-5 overflow-y-auto">
                {
                    img === null ? ( 
                        <div className="flex flex-col w-full gap-5">
                            <Webcam mirrored={true} height={320} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints}/>
                            <div className='flex justify-center items-center w-[72px] h-[72px] rounded-[50%] bg-primary border-primary mx-auto' onClick={handleCapture}>
                                <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
                            </div>
                        </div>
                    ) : ( 
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <img src={img} alt="screenshot" className="h-[40vh] w-full" />
                                <div className="text-center font-bold text-[#009A2B] text-[18px]">Selfie captured!</div>
                                <div className="text-center break-words text-[#373839]">You have successfully uploaded your image and marked your attendance for the day.</div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Button text={"Continue"} styles="border-primary text-white" onClick={handleNavigation}></Button>
                                <Button text={"Re-capture photo"} styles="bg-white border-[#DBDBDB] border-1 text-[#535461] hover:text-[#535461]" onClick={() => setImg(null)}>Retake</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </CommonLayout>
    )
}

export default CaptureSelfie;
