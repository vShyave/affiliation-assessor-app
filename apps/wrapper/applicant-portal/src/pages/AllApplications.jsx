import React from 'react'
import { Link } from 'react-router-dom'

import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute'

const AllApplications = () => {
    return (
        <>
            <div className="h-[48px] bg-white drop-shadow-sm">
                <div className='container mx-auto px-3 py-3'>
                    <div className='font-bold'>
                        <Link to={APPLICANT_ROUTE_MAP.dashboardModule.all_applications}>
                            <span className='text-primary-400'>My Application</span>
                        </Link>
                        <span>&nbsp;&nbsp;  &nbsp;&nbsp; Available Forms</span>
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-12 px-3 min-h-[40vh]'>
                <div className='flex flex-col gap-3'>
                    <div className='text-xl font-semibold'>Application forms</div>
                    <div className='text-sm'>These are the available forms for you apply. Click on any of them to start filling</div>
                </div>
            </div>
        </>
    )
}

export default AllApplications
