import React, { useState, useEffect } from "react";

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

  // async function Adminlogin() {
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
    <div className="bg-gray-100 flex flex-col py-16 w-full h-screen">
      <div className="flex flex-col container items-center mx-auto">
        <div className="flex flex-col py-20">
          <div className="flex flex-row gap-4">
            <img className="logo" src="/images/upsmf.png" alt="logo" />
          </div>
        </div>
        <div className="flex container justify-center mx-auto">
          {
            Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="border-2 border-green-800 bg-green-100 text-green-800 font-bold p-4">Logged in Successfully</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center shadow-md rounded-[12px] bg-white w-[624px] h-[400px]">
                  <h1 className="text-2xl font-medium p-6 font-md">Login</h1>
                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block mt-6 text-left leading-6 text-gray-800">Email id</label>
                    <div className="mt-4">
                      <input type="email" name="email" id="email" placeholder="name@email.com" className="block rounded-[4px] w-full p-4 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValue.email} onChange={handleChange} />
                      <p className="text-red-500 mt-2 text-sm" >{formErrors.email}</p>
                      <button className="mt-6 border border-blue-900 text-white bg-blue-900 w-[400px] py-3 font-medium rounded-[4px]">GET OTP</button>               
                      <p className="flex justify-center p-8 text-gray-600">
                        Create an account,
                        <a href="/signup" className="text-blue-700 ml-2">Sign up</a>
                      </p>
                    </div>
                  </div> 
                </div>
              </form>                                     
            ) 
          }
        </div>                                 
      </div>
    </div>
  )
}

export default AdminLogin
