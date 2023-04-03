import React, { useEffect, useState } from "react";
import ROUTE_MAP from "../routing/routeMap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import CommonLayout from "../components/CommonLayout";
import Button from "../components/Button";

const ThankYou = () => {

    useEffect(() => {
        // getData();
    }, []);

    return (
        <CommonLayout back={ROUTE_MAP.root} logoutDisabled backDisabled>
            <div className="flex flex-col px-6">
                <div className="flex flex-col justify-center h-[60vh]">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <FontAwesomeIcon icon={faCircleCheck} className="text-4xl text-[#009A2B;]" />
                        <div className="text-[#009A2B;] text-2xl lg:text-4xl font-bold">Thank you!</div>
                    </div>
                    <div className="my-4">
                        <hr className="border-slate-300" />
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                        <div className="text-gray-500">You've now completed</div>
                        <div className="text-primary font-bold text-[26px]">BSC in Nursing</div>
                        <div className="text-[18px] text-gray-500">(1/8 Applications)</div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 h-[15vh]">
                    <Button text="Inspect Next Form" styles="border-primary text-white"></Button>
                    <Button text="Exit" styles="bg-white border-[#DBDBDB] border-1 text-[#535461] hover:text-[#535461]"></Button>
                </div>

            </div>

            
        </CommonLayout>
    )
}

export default ThankYou;
