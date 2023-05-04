import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";

import { Card, Label, Button, Input } from "../components";

const AdminLogin = () => {
  const initialValue = { email : "" };
  const [ formValue,setFormValue ] = useState(initialValue)
  const [ formErrors, setFormErrors ] = useState({})
  const [ isSubmit,setIsSubmit ] = useState(false)

  const handleChange =(e) =>{
    // console.log(e.target)
    const { name , value } = e.target;
    setFormValue({...formValue, [name]: value})
    // console.log(formValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true)
  }

  useEffect(() => {
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit){
    }
  },[formErrors])

  const validate = (values) => {
    const errors = {}
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if(!values.email) {
      errors.email = "Email is required"
    } else if(!regex.test(values.email)) {
      errors.email = "This is not a valid email format"
    }  
    return errors; 
  }

  // async function handleLogin() {
  //   console.log(formValue);
  //   let item = {formValue};
  //   let logindata = await fetch("https://hasura.upsmfac.org/api/rest/getAdminData"),{
  //     method:"POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Hasura-Client-Name": "hasura-console",
  //       "x-hasura-admin-secret": "myadminsecretkey"
  //     }
  //   }
  // }

  return ( 
    <>
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
              <Link to={ADMIN_ROUTE_MAP.loginModule.signup} className="text-primary-700">Sign up</Link>
            </p>
          </div>
        </form>
      </Card>
    </>
  )
}

export default AdminLogin