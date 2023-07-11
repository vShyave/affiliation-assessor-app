import { useState } from "react";
import Label from "../Label";

//Manage Users
export const ManageUsersFilters = ({ filterApiCall }) => {
  const [filters,setFilters] = useState({})
  const handleChange = (e)=>{
        setFilters((prevState)=>({...filters,[e.target.name]:e.target.value}))
  }
  return (
    <div className="flex flex-grow justify-around text-gray-700 dark:text-gray-400 p-4">
      <div className="grid grid-cols-12 gap-8">
        <div className="sm:col-span-3 ">
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Role</option>
            <option value="admin">Admin</option>
            <option value="applicant">Applicant</option>
          </select>
        </div>
        <div className="sm:col-span-3 ">
          <select
            name="account_status"
            id="account_status"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Account Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

//Manage Forms
export const ManageFormsFilters = ({ filterApiCall }) => (
  <div className="flex flex-grow justify-around text-gray-700 dark:text-gray-400 p-4">
    <div className="grid grid-cols-12 gap-8">
      <div className="sm:col-span-3 ">
        <select
          name="application_type"
          id="application_type"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Application Type</option>
          <option value="admin">Admin</option>
          <option value="applicant">Applicant</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="round_no"
          id="round_no"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Round</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="course_type"
          id="course_type"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Course Type</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
);

// Desktop Analysis
export const DesktopAnalysisFilters = ({ filterApiCall }) => (
  <div className="flex flex-grow justify-around text-gray-700 dark:text-gray-400 p-4">
    <div className="grid grid-cols-12 gap-8">
      <div className="sm:col-span-3 ">
        <select
          name="role"
          id="role"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Application Type</option>
          <option value="admin">Admin</option>
          <option value="applicant">Applicant</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Course Name</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Published On</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
);

// On-Ground Inspection Analysis
export const OnGroundInspectionFilters = ({ filterApiCall }) => (
  <div className="flex flex-grow justify-around text-gray-700 dark:text-gray-400 p-4">
    <div className="grid grid-cols-12 gap-8">
      <div className="sm:col-span-3 ">
        <select
          name="role"
          id="role"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Assessor</option>
          <option value="admin">Admin</option>
          <option value="applicant">Applicant</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Published On</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
);

// Schedule Management
export const ScheduleManagementFilters = ({ filterApiCall }) => (
  <div className="flex flex-grow justify-around text-gray-700 dark:text-gray-400 p-4">
    <div className="grid grid-cols-12 gap-8">
      <div className="sm:col-span-3 ">
        <select
          name="role"
          id="role"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">District</option>
          <option value="admin">Admin</option>
          <option value="applicant">Applicant</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Published On</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="sm:col-span-3 ">
        <select
          name="account_status"
          id="account_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  </div>
);
