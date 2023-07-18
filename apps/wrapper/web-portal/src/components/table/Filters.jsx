import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { formatDate, readableDate } from "../../utils/common";

//Manage Users
export const ManageUsersFilters = ({ filterApiCall }) => {
  const [filters, setFilters] = useState({ condition: {} });
  const handleChange = (e) => {
    if (e.target.value === "") {
      delete filters?.condition[e.target.name];
      return;
    }
    setFilters({
      condition: {
        ...filters.condition,
        [e.target.name]: {
          _eq: e.target.value,
        },
      },
    });
  };
  useEffect(() => {
    filterApiCall(filters);
  }, [filters]);
  return (
    <div className="flex flex-grow text-gray-700 dark:text-gray-400 gap-8">
      <div className="flex">
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
      <div className="flex">
        <select
          name="workingstatus"
          id="workingstatus"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Account Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

//Manage Forms
export const ManageFormsFilters = ({ filterApiCall }) => {
  const [filters, setFilters] = useState({ condition: {} });
  const handleChange = (e) => {
    if (e.target.value === "") {
      delete filters?.condition[e.target.name];
      return;
    }
    setFilters({
      condition: {
        ...filters.condition,
        [e.target.name]: {
          _eq: e.target.value,
        },
      },
    });
  };

  useEffect(() => {
    filterApiCall(filters);
  }, [filters]);

  return (
    <div className="flex flex-grow text-gray-700 dark:text-gray-400 gap-8">
      <div className="flex">
        <select
          name="application_type"
          id="application_type"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Application Type</option>
          <option value="new_institute">New Institute</option>
          <option value="new_course">New Course</option>
        </select>
      </div>
      <div className="flex">
        <select
          name="round"
          id="round"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Round No.</option>
          <option value={1}>Round 1</option>
          <option value={2}>Round 2</option>
        </select>
      </div>
      <div className="flex">
        <select
          name="course_type"
          id="course_type"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Course Type</option>
          <option value="nursing">Nursing</option>
          <option value="paramedical">Paramedical</option>
        </select>
      </div>
    </div>
  );
};

// Desktop Analysis
export const DesktopAnalysisFilters = ({ filterApiCall }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [buttonText, setButtonText] = useState("Published On");
  const [filters, setFilters] = useState({
    condition: {
      assessor_id: { _is_null: true },
    },
  });
  const handleChange = (e) => {
    if (e.target.value === "") {
      delete filters?.condition[e.target.name];
      return;
    }
    if (e.target.name === "course_applied") {
      setFilters({
        condition: {
          ...filters.condition,
          institute: {
            [e.target.name]: {
              _eq: e.target.value,
            },
          },
        },
      });
    } else {
      setFilters({
        condition: {
          ...filters.condition,
          [e.target.name]: {
            _eq: e.target.value,
          },
        },
      });
    }
  };

  const handleDateSelect = (date) => {
    setButtonText(formatDate(date));
    setShowCalendar(false);
    setFilters({
      condition: {
        ...filters.condition,
        submitted_on: {
          _eq: formatDate(date),
        },
      },
    });
  };

  useEffect(() => {
    filterApiCall(filters);
  }, [filters]);

  return (
    <div className="flex flex-grow text-gray-700 dark:text-gray-400 gap-8">
      <div className="flex">
        <select
          name="assessment_type"
          id="assessment_type"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Application Type</option>
          <option value="institute">Institute</option>
          <option value="applicant">Applicant</option>
        </select>
      </div>
      <div className="flex">
        <select
          name="course_applied"
          id="course_applied"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Course Name</option>
          <option value="Nursing">Nursing</option>
          {/* <option value="inactive">Inactive</option> */}
        </select>
      </div>
      <div className="flex">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-8"
          onClick={() => setShowCalendar(true)}
        >
          {buttonText.includes("Published")
            ? buttonText
            : readableDate(buttonText)}
        </button>
        {showCalendar && <Calendar onChange={handleDateSelect} />}
      </div>
      <div className="flex">
        <select
          name="review_status"
          id="review_status"
          onChange={() => {}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="In Progress">In Progress</option>
          {/* <option value="inactive">Inactive</option> */}
        </select>
      </div>
    </div>
  );
};

// On-Ground Inspection Analysis
export const OnGroundInspectionFilters = ({ filterApiCall }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [buttonText, setButtonText] = useState("Published On");
  const [filters, setFilters] = useState({ condition: {} });
  const handleChange = (e) => {
    if (e.target.value === "") {
      delete filters?.condition[e.target.name];
      return;
    }
    setFilters({
      condition: {
        ...filters.condition,
        [e.target.name]: {
          _eq: e.target.value,
        },
      },
    });
  };

  const handleDateSelect = (date) => {
    setButtonText(formatDate(date));
    setShowCalendar(false);
    setFilters({
      condition: {
        ...filters.condition,
        submitted_on: {
          _eq: formatDate(date),
        },
      },
    });
  };

  useEffect(() => {
    filterApiCall(filters);
  }, [filters]);

  return (
    <div className="flex flex-grow text-gray-700 dark:text-gray-400 gap-8">
      <div className="flex">
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
      <div className="flex">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onClick={() => setShowCalendar(true)}
        >
          {buttonText.includes("Published")
            ? buttonText
            : readableDate(buttonText)}
        </button>
        {showCalendar && <Calendar onChange={handleDateSelect} />}
      </div>
      <div className="flex">
        <select
          name="review_status"
          id="review_status"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Review Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

// Schedule Management
export const ScheduleManagementFilters = ({ filterApiCall }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [buttonText, setButtonText] = useState("Published On");
  const [filters, setFilters] = useState({ condition: {} });

  const handleChange = (e) => {
    if (e.target.value === "") {
      delete filters?.condition[e.target.name];
      return;
    }
    if (e.target.name === "district") {
      setFilters({
        condition: {
          ...filters.condition,
          institute: {
            [e.target.name]: {
              _eq: e.target.value,
            },
          },
        },
      });
    } else {
      setFilters({
        condition: {
          ...filters.condition,
          [e.target.name]: {
            _eq: e.target.value,
          },
        },
      });
    }
  };

  const handleDateSelect = (date) => {
    setButtonText(formatDate(date));
    setShowCalendar(false);
    setFilters({
      condition: {
        ...filters.condition,
        date: {
          _eq: formatDate(date),
        },
      },
    });
  };

  useEffect(() => {
    filterApiCall(filters);
  }, [filters]);

  return (
    <div className="flex flex-grow text-gray-700 dark:text-gray-400 gap-8">
      <div className="flex">
        <select
          name="district"
          id="district"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">District</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Ballari">Ballari</option>
          <option value="KANPUR DEHAT">KANPUR DEHAT</option>
          <option value="BIJNOR">BIJNOR</option>
          <option value="PRAYAGRAJ">PRAYAGRAJ</option>
          <option value="BHADOHI">BHADOHI</option>
        </select>
      </div>
      <div className="flex">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onClick={() => setShowCalendar(true)}
        >
          {buttonText.includes("Published")
            ? buttonText
            : readableDate(buttonText)}
        </button>
        {showCalendar && <Calendar onChange={handleDateSelect} />}
      </div>
      <div className="flex">
        <select
          name="status"
          id="status"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Status</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
};
