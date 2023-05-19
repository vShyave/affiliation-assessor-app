import React from 'react'
import { Select, Option } from "@material-tailwind/react";

import { Card, Button, Label, Input } from "./../../components";


const UploadForm = () => {
  return (
        <>
            <div className='container'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-row gap-4'>
                        <div className='flex grow items-center'>
                            <h1 className='text-2xl'>Create form</h1>
                        </div>
                        <div className='flex grow justify-end items-center gap-4'>
                            <Button moreClass="text-primary-600 border-primary-600 px-5" style={{backgroundColor: 'transparent'}} text="Cancel"></Button>
                            <Button moreClass="text-gray-600 border-gray-600 px-5" style={{backgroundColor: '#fff'}} text="Save as draft"></Button>
                        </div>
                    </div>

                    <div className='flex flex-row gap-3 justify-center'>
                        <div className='bg-white py-3 px-10 rounded-[4px] cursor-pointer'>1. Add attributes</div>
                        <div className='bg-black py-3 px-10 rounded-[4px] text-white cursor-pointer'>2. Upload CSV</div>
                    </div>

                    <Card>
                        <div className='flex flex-row'>
                            <div className='flex flex-col gap-1'>
                                <Label required text="Form title"></Label>
                                <Input type="text" placeholder="Enter here" required></Input>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label required text="Round No"></Label>
                                <Select label="Select here">
                                    {
                                        [10,25,50].map((pageSize) => (
                                            <Option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label required text="Form labels"></Label>
                                <Select label="Select here">
                                    {
                                        [10,25,50].map((pageSize) => (
                                            <Option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <Button moreClass="text-white px-6" text="Next"></Button>
                        </div>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default UploadForm
