import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
// import { registerUser } from "../api";

import { Card, Label, Button, Input } from "../components";



export default function AdminSingUp() {

  // const initialValues = {fullname:"" , email:""}
  // const [ formValues,setFormValues ] = useState(initialValues)
  // const [ formErrors, setFormErrors ] = useState({})
  // const [ isSubmit,setIsSubmit ] = useState(false)

// const  FormValues = {
//   fullName: String,
//   email: String
// }
const {
  register,
  handleSubmit,
  watch,
  formState: { errors }
} = useForm();

const onSubmit = (data) => {
  alert(JSON.stringify(data));
}; 
  // const{register,handleSubmit,formState: {errors}} = useForm();
  //   ,
  //   watch,
  //   
  // } 
// console.log(errors)
//   const onSubmit = (data) => {
// console.log("form submitted",data,FormValues);
//   }; 
  // console.log(watch("fullname"));

  // const handleChange =(e) =>{}
  //   // console.log(e.target)
  //   const { name , value } = e.target;
  //   setFormValues({...formValues, [name]: value})
  //   // console.log(formValues)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true)
  // }

  // useEffect(() =>{
  //   // console.log(formErrors)
  //   if(Object.keys(formErrors).length === 0 && isSubmit){
  //       const handleRegister = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const registerRes = registerUser(formValues);
  //       console.log('registerRes - ', registerRes);
  //       // return res.data;
  //     } catch (err) {
  //       console.log(err);
  //       alert(err);
  //       // return err;
  //     }
  //   };
  //    }
  // },[formErrors])

  // const validate = (values) => {
  //   const errors = {}
  //   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  //   const regui = /^[a-zA-Z ]{2,40}$/
  //   if(!values.fullname){
  //     errors.fullname = "Username is required"
  //   }else if(!regui.test(values.fullname)){
  //     errors.fullname = "Username can contain only letters"
  //   }  
  //   if(!values.email){
  //     errors.email = "Email is required"
  //   }
  //   else if(!regex.test(values.email)){
  //     errors.email = "This is not a valid email format"
  //   }  
  //   return errors;
  //   }

 



return (
  <>
    <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
    <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium text-center mb-8">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
          <label className="block mt-6 text-left leading-6 text-gray-800">
            Full name
          </label>
            <div>
                    <input
                  type="text"
                  id="fullname"                                                           
                  placeholder="Type here"
                  className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  {...register("fullname", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
                  })}
                  />
                  {errors?.fullname?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                  {errors?.fullname?.type === "maxLength" && (
                    <p className="text-red-500 mt-2 text-sm">First name cannot exceed 20 characters</p>
                  )}
                  {errors?.fullname?.type === "pattern" && (
                    <p className="text-red-500 mt-2 text-sm">Alphabetical characters only</p>
                  )}
                  </div>
           
           
           
           
           
           
            {/* <Label htmlFor="fullname" text="Fullname"></Label> */}
            {/* <Input 
            // type="text"              
            // id="fullName" 
            placeholder="Type here" 
            {...register("fullname",{required:true})}/> */}

            {/* {errors?.fullName?.type === "required" && <p className="text-error-500 text-sm">This field is required</p>}
            {errors?.fullName?.type === "maxLength" && (
            <p className="text-error-500 text-sm">First name cannot exceed 20 characters</p>
            )}
           {errors?.fullName?.type === "pattern" && (
           <p className="text-error-500 text-sm">Alphabetical characters only</p>
           )}
           
            {/* <p className="text-error-500 text-sm" >{formErrors.fullname}</p> */}
          </div> 
          <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block mt-6 text-left leading-6 text-gray-800">
            Email id
          </label>
            <div >
                    <input
                    type="email"
                    id="email"
                    placeholder="name@email.com"
                    className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
                    })}
                    />
                    {errors?.email?.type === "required" && <p className="text-red-500 mt-2 text-sm">This field is required</p>}
                    {errors?.email?.type === "pattern" && (
                      <p className="text-red-500 mt-2 text-sm">This is not a valid email format</p>
                    )}
            </div>
            
            
            
            
            
            
            
            {/* <Label htmlFor="email" text="Email id"></Label>
            < Input
            // type="email" 
            // name="email" 
            // id="email" 
            placeholder="name@email.com" 
            
            {...register("email",{required:true})} */}
            {/* /> */}
            {/* {errors?.email?.type === "required" && <p className="text-error-500 text-sm">This field is required</p>} */}
            {/* {errors?.email?.type === "pattern" && ( */}
           {/* <p className="text-error-500 text-sm">This is not a valid email format</p> */}
           {/* )} */}
            {/* <p className="text-error-500 text-sm" >{formErrors.email}</p> */}
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







              {/* <div className="bg-gray-100 flex flex-col py-16 w-full h-screen">
                  <div className="flex flex-col container items-center mx-auto">
                      <div className="flex flex-col py-12">
                      <div className="flex flex-row gap-4">
                              <img className="logo" src={Group} alt="logo1" />
                              <div
                                className="inline-block h-[72px] min-h-[1em] w-0.5 border opacity-100 dark:opacity-50">                                             
                              </div>
                              <img className="logo" src={Nirmaya} alt="logo2" />
                          </div>
                      </div>
                        <div className="flex container justify-center mx-auto">
                        {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="border-2 border-blue-800 bg-blue-100 text-blue-800 font-bold p-4">Signed in Successfully</div>) :
                        (<form onSubmit={handleSubmit}>
                          <div className="flex flex-col items-center shadow-md rounded-[12px] bg-white w-[624px] h-[520px]">
                                  <h1 className="text-2xl font-medium p-6 font-md">
                                          Sign up
                                  </h1>
                              <div className="sm:col-span-4">
                              <label className="block mt-6 text-left leading-6 text-gray-800">
                                  Full name
                                </label>
                                  <div className="mt-4">
                                          <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"                                                           
                                          placeholder="Type here"
                                          className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formValues.fullname}
                                        onChange={handleChange}
                                        />
                                        </div>
                                        <p className="text-red-500 mt-2 text-sm" >{formErrors.fullname}</p>

                                <label htmlFor="email" className="block mt-6 text-left leading-6 text-gray-800">
                                  Email id
                                </label>
                                  <div className="mt-4">
                                          <input
                                          type="email"
                                          name="email"
                                          id="email"
                                          placeholder="name@email.com"
                                          className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          value={ formValues.email }
                                          onChange={handleChange}
                                        />
                                    <p className="text-red-500 mt-2 text-sm" >{formErrors.email}</p>

                                      <button className="mt-6 border border-blue-900 text-white bg-blue-900 w-[400px] py-3 font-medium rounded-[4px]">Continue</button>
                                      <p className="flex justify-center p-8 text-gray-600"> Have an account, <a href="/login" className="text-blue-700 ml-2">Login</a> </p>
                                  </div>
                            </div> 
                        </div> 
                        </form> 
                        )}                                  
                  </div>
                  
              </div>
              
          </div> */}
        
