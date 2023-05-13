import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, Label, Button, Input } from "../components";

import APPLICANT_ROUTE_MAP from '../routes/ApplicantRoute';

const ApplicantLogin = () => {
    const initialValue = { email : "" };
    const [ formValue, setFormValue ] = useState(initialValue)
    const [ formErrors, setFormErrors ] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('e - ', e);
    }

    const handleChange = (e) => {

    }

    useEffect(() => {

    }, [])

    return (
        <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-medium text-center mb-8">Login</h1>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" text="Email id" required></Label>
                        <Input type="email" name="email" id="email" placeholder="name@email.com" value={formValue.email} onChange={handleChange}></Input>
                        <p className="text-error-500 text-sm" >{formErrors.email}</p>
                    </div>
                    <Button moreClass="uppercase w-full mt-7" text="Sign in"></Button>
                    <p className="flex justify-center my-6">
                        <span className="text-gray-400">Create an account, </span>&nbsp;
                        <Link to={APPLICANT_ROUTE_MAP.loginModule.register} className="text-primary-700">Sign up</Link>
                    </p>
            </div>
            </form>
        </Card>
    )
}

export default ApplicantLogin
