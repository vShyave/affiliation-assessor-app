import React from 'react'
import { Outlet } from "react-router-dom";

import Header from '../components/Header';

const Dashboard = () => {
    return (
        <div className='flex flex-col'>
            <Header />
            {/* <div className='min-h-[calc(100vh-148px)] px-3 py-12'> */}
                <Outlet />
            {/* </div> */}
        </div>
    )
}

export default Dashboard
