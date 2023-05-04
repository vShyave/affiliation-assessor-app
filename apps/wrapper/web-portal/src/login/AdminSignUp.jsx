import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import customPost from "../api/adminCustomApi";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";

import { Card, Label, Button, Input } from "../components";

export default function AdminSingUp() {
  const initialValues = { fullname : "" , email : "" }
  const [ formValues, setFormValues ] = useState(initialValues)
  const [ formErrors, setFormErrors ] = useState({})
  const [ isSubmit, setIsSubmit ] = useState(false)

  const handleChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value})
    // console.log(formValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
  }

  useEffect(() => {
    // console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit) { }
  },[formErrors])

  const validate = (values) => {
    const errors = {}
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const nameRegex = /^[a-zA-Z]+$/
    if(!values.fullname) {
      errors.fullname = "Username is required"
    } else if(!nameRegex.test(values.fullname)) {
      errors.fullname = "Username can contain only letters"
    } 

    if(!values.email) {
      errors.email = "Email is required"
    } else if(!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format"
    }  
    return errors;
  }

  //  const handleRegister = async (fullname, email) => {
  //     try {
  //       const res = await axios.post(BASE_URL + "user/registration", {
  //         password: pass,
  //         loginId: fullname,
  //         applicationId: email,
  //       });
  //       return res.data;
  //     } catch (err) {
  //       console.log(err);
  //       return err;
  //     }
  //   };

  return (
    <>
      <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-center mb-8">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="fullname" text="Fullname" required></Label>
                <Input type="text" name="fullname" id="fullname" placeholder="Type here" value={formValues.fullname} onChange={handleChange}></Input>
                <p className="text-error-500 text-sm">{formErrors.fullname}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" text="Email id" required></Label>
                <Input type="email" name="email" id="email" placeholder="name@email.com" value={formValues.email} onChange={handleChange}></Input>
                <p className="text-error-500 text-sm">{formErrors.email}</p>
              </div>
            </div>
            <Button moreClass="uppercase w-full mt-7" text="Continue"></Button>
            <p className="flex justify-center my-6">
              <span className="text-gray-400">Have an account, </span>&nbsp;
              <Link to={ADMIN_ROUTE_MAP.loginModule.login} className="text-primary-700">Login</Link>
            </p>
          </div>
        </form>
      </Card>
    </>
  )
}
