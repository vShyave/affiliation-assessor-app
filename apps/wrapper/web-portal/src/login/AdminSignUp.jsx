import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import customPost from "../api/adminCustomApi";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
import { registerUser } from "../api";
import { userService } from "../api/userService";

import { Card, Label, Button, Input } from "../components";
//import { forkJoin, lastValueFrom } from "rxjs";
import Toast from "../components/Toast";

export default function AdminSingUp() {
  // const initialValues = {fullname:"" , email:""}
  // const [ formValues,setFormValues ] = useState(initialValues)
  // const [ formErrors, setFormErrors ] = useState({})
  // const [ isSubmit,setIsSubmit ] = useState(false)

  // const  FormValues = {
  //   fullName: String,
  //   email: String
  // }
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [toast, setToast] = useState({
    toastOpen: false,
    toastMsg: "",
    toastType: "",
  });
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
  const signupHandler = async (data) => {
    const {firstName,lastName,email, mobilePhone } = data;
    let userDetails = [{
      
        firstName: firstName,
        lastName: lastName,
        fullName: firstName+" "+lastName,
        email: email,
        username: email,
        password: "rkr",
        roleName: "Regulator"
      
    }];
    let res = "";
    try {
      res = await userService.signup(userDetails);

      const adminDetails = {
        user_id: "", //TODO: after rejendra's API
        fname: firstName,
        lname: lastName,
        fullName: firstName+" "+lastName,
        email: email,
        phoneNumber: mobilePhone,
      };
      const adminRes = await registerUser(adminDetails);
      console.log(adminRes)
      navigate(ADMIN_ROUTE_MAP.loginModule.login);
    } catch (error) {
      setToast((prevState) => ({
        ...prevState,
        toastOpen: true,
        toastMsg: "User already registered.",
        toastType: "error",
      }));
      setTimeout(
        () =>
          setToast((prevState) => ({
            ...prevState,
            toastOpen: false,
            toastMsg: "",
            toastType: "",
          })),
        3000
      );
      console.error("Registration failed due to some error:", error);
    }
  };

  return (
    <>
      {toast.toastOpen && (
        <Toast toastMsg={toast.toastMsg} toastType={toast.toastType} />
      )}
      <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
        <form
          onSubmit={handleSubmit((data) => {
            signupHandler(data);
          })}
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-center mb-8">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName" text="First name" required></Label>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Type here"
                    className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    {...register("firstName", {
                      required: true,
                      pattern: /^[A-Za-z ]+$/i,
                    })}
                  />
                  {errors?.firstName?.type === "required" && (
                    <p className="text-red-500 mt-2 text-sm">
                      This field is required
                    </p>
                  )}
                  {errors?.firstName?.type === "pattern" && (
                    <p className="text-red-500 mt-2 text-sm">
                      Alphabetical characters only
                    </p>
                  )}
                </div>
                <Label htmlFor="lastName" text="Last name" required></Label>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Type here"
                    className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    {...register("lastName", {
                      required: true,
                      pattern: /^[A-Za-z ]+$/i,
                    })}
                  />
                  {errors?.lastName?.type === "required" && (
                    <p className="text-red-500 mt-2 text-sm">
                      This field is required
                    </p>
                  )}
                  {errors?.lastName?.type === "pattern" && (
                    <p className="text-red-500 mt-2 text-sm">
                      Alphabetical characters only
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                    <Label htmlFor="email" text="Email id" required></Label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@email.com"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      })}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      noValidate
                    />
                    {errors?.email?.type === "required" && (
                      <p className="text-red-500 mt-2 text-sm">
                        This field is required
                      </p>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <p className="text-red-500 mt-2 text-sm">
                        This is not a valid email format
                      </p>
                    )}
                  </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="phoneNumber"
                  text="Mobile Number"
                  required
                ></Label>
                <div>
                  <input
                    type="tel"
                    placeholder="Type here"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("mobilePhone", {
                      required: true,
                      maxLength: 10,
                      pattern: /^([+]\d{2})?\d{10}$/,
                    })}
                  />
                  {errors?.mobilePhone?.type === "required" && (
                    <p className="text-red-500 mt-2 text-sm">
                      This field is required
                    </p>
                  )}
                  {errors?.mobilePhone?.type === "pattern" && (
                    <p className="text-red-500 mt-2 text-sm">
                      This is not a valid mobile number
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              moreClass="uppercase w-full mt-7 text-white"
              text="Continue"
            ></Button>
            <p className="flex justify-center my-6">
              <span className="text-gray-400">Have an account, </span>&nbsp;
              <Link
                to={ADMIN_ROUTE_MAP.loginModule.login}
                className="text-primary-700 "
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </>
  );
}
