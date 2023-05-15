import React from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute'

const Header = () => {
    return (
        <div className="relative min-h-[80px] z-10 drop-shadow-md">
            <div className="top-0 fixed left-0 right-0 bg-white">
                <div className="container py-2 px-3 mx-auto">
                    <div className="flex flex-row">
                        <div className="flex grow">
                            <img src="/images/upsmf.png" alt="logo" className="h-[64px]" />
                        </div>
                        <div className="flex grow justify-end items-center gap-4">
                            <Link to={APPLICANT_ROUTE_MAP.dashboardModule.register}>
                                <Button moreClass="px-4 text-primary-600" style={{backgroundColor: '#fff'}} text="Self Registration"></Button>
                            </Link>
                            <Link to={APPLICANT_ROUTE_MAP.loginModule.login}>
                                <Button moreClass="px-6" text="Login"></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
