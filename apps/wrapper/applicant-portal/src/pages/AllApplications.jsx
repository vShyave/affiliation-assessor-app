import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Card } from '../components'
import { FaAngleRight } from "react-icons/fa";

import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute'

const AllApplications = () => {
    return (
        <>
            <div className="h-[48px] bg-white drop-shadow-sm">
                <div className='container mx-auto px-3 py-3'>
                    <div className='flex flex-row font-bold gap-2 items-center'>
                        <Link to={APPLICANT_ROUTE_MAP.dashboardModule.my_applications}>
                            <span className='text-primary-400 cursor-pointer'>My Application</span>
                        </Link>
                        <FaAngleRight className='text-[16px]'/>
                        <span className='text-gray-500'>Available Forms</span>
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-12 px-3 min-h-[40vh]'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3'>
                        <div className='text-xl font-semibold'>Application forms</div>
                        <div className='text-sm'>These are the available forms for you apply. Click on any of them to start filling</div>
                    </div>

                    <div className='flex flex-wrap'>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 8, 10].map((index) => (
                                <Card moreClass="flex flex-col border-gray-100 m-3 gap-4 w-[300px] border-[1px] drop-shadow" key={index}>
                                    <div className='text-xl font-medium'>ANM</div>
                                    <div className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, quibusdam?</div>
                                    <div className='flex'>
                                        <Button moreClass="text-primary-500 font-bold border-gray-500 text-primary-400" style={{backgroundColor: '#fff' }} text="Apply"></Button>
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllApplications
