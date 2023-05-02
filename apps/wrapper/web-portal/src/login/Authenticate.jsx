import React from 'react'
import { Outlet } from 'react-router-dom'

const Authenticate = () => {
  return (
    <>
        <div className='container m-auto'>
            <div className="flex flex-col h-screen items-center justify-center gap-16 p-4">
                <div className="flex">
                    <img src="/images/upsmf.png" alt="logo" />
                </div>
                <div className='flex'>
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  )
}

export default Authenticate
