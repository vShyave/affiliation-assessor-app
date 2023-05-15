import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Card } from '../components'
import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute'

const MyApplications = () => {
    return (
        <>
            <div className="h-[48px] bg-white drop-shadow-sm">
                <div className='container mx-auto px-3 py-3'>
                    <div className='text-primary-400 uppercase font-medium'>My Application</div>
                </div>
            </div>

            <div className='container mx-auto py-12 px-3 min-h-[40vh]'>
                <div className='flex flex-col gap-3'>
                    <div className='text-xl font-semibold'>My Applications</div>
                    <div className='text-sm'>There is no active applications. Select one from the below list to apply.</div>
                </div>
            </div>

            <div className='bg-white drop-shadow-sm'>
                <div className='container mx-auto px-3 py-6'>
                    <div className="flex flex-col gap-5">
                        <div className='flex flex-row'>
                            <div className='flex grow'>
                                <div className='flex flex-col gap-3'>
                                    <div className='text-xl font-semibold'>Application form</div>
                                    <div className='text-sm'>These are the available forms for you to apply. Click on any of them to start filling</div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Link to={APPLICANT_ROUTE_MAP.dashboardModule.all_applications}>
                                    <Button moreClass="text-primary-500 font-bold uppercase border-gray-500" style={{backgroundColor: '#fff', border: '1px solid #d1d5db' }} text="See all"></Button>
                                </Link>
                            </div>
                        </div>

                        <div className='flex flex-wrap'>
                            {
                                [1, 2, 3, 4].map((index) => (
                                    <Card moreClass="flex flex-col border-gray-100 m-3 gap-3 w-[300px] border-[1px] drop-shadow" key={index}>
                                        <div className='text-xl font-medium'>ANM</div>
                                        <div className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, quibusdam?</div>
                                        <div className='flex'>
                                            <Button moreClass="text-primary-500 font-bold uppercase border-gray-500 text-primary-400" style={{backgroundColor: '#fff' }} text="Apply"></Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyApplications
