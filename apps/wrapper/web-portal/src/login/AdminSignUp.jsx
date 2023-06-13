import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import customPost from "../api/adminCustomApi";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
import { registerUser } from "../api";
import { userService } from "../api/userService";
import { Card, Label, Button, Input } from "../components";
import { forkJoin, lastValueFrom } from "rxjs";
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
    watch,
    formState: { errors },
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
  const signupHandler = async (data) => {
    const { fullName, mobilePhone } = data;
    var firstName = fullName?.split(" ").slice(0, -1).join(" ");
    var lastName = fullName?.split(" ").slice(-1).join(" ");
    console.log(data.fullname);
    console.log(firstName);
    console.log(lastName);
    let userDetails = {
      registration: {
        applicationId: process.env.REACT_APP_APPLICATION_ID,
        usernameStatus: "ACTIVE",
        roles: ["Admin"],
      },
      user: {
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        fullName: `${fullName}`,
        username: mobilePhone,
        password: mobilePhone,
        mobilePhone: mobilePhone,
      },
    };

    try {
      const res = await userService.signup(userDetails);
      console.log(res);

      const adminDetails = {
        user_id: res.data.user.id,
        fname: firstName,
        lname: lastName,
        fullName: fullName,
        phoneNumber: mobilePhone,
      };
      const addAdimRes = await registerUser(adminDetails);
      console.log(addAdimRes);
      navigate(ADMIN_ROUTE_MAP.loginModule.login);
    } catch (error) {
      console.error("Registration failed due to some error:", error);
    }
  };
  return (
    <>
      <Card moreClass="shadow-md w-screen sm:px-24 sm:w-[480px] md:w-[600px] py-16">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            signupHandler(data);
          })}
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-center mb-8">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label 
                htmlFor="fullName"
                text="Full name"
                required
                >
                </Label>
                <div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Type here"
                    className="w-full rounded-[4px] p-4 py-3 text-gray-900 ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    {...register("fullName", {
                      required: true,
                      pattern: /^[A-Za-z ]+$/i,
                    })}
                  />
                  {errors?.fullName?.type === "required" && (
                    <p className="text-red-500 mt-2 text-sm">
                      This field is required
                    </p>
                  )}
                  {errors?.fullName?.type === "pattern" && (
                    <p className="text-red-500 mt-2 text-sm">
                      Alphabetical characters only
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="phoneNumber"
                  text="Mobile Number"
                  required
                >
                </Label>
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
            <Button moreClass="uppercase w-full mt-7" text="Continue"></Button>
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
