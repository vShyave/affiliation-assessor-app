import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeCookie, getCookie, getInitials } from "../utils";
import Button from "./Button";

import APPLICANT_ROUTE_MAP from "../routes/ApplicantRoute";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const Header = () => {
  const [showButtons, setshowButtons] = useState(false);
  const navigate = useNavigate();
  const userData = getCookie("userData");
  const instituteData = getCookie("institutes");

  const handleLogout = () => {
    removeCookie("userData");
    removeCookie("institutes");
    navigate(APPLICANT_ROUTE_MAP.loginModule.login);
  };

  const handleNavigateProfile = () => {
    navigate(APPLICANT_ROUTE_MAP.dashboardModule.profile);
  };

  useEffect(() => {
    if (instituteData != null) {
      setshowButtons(true);
    }
  }, [instituteData]);

  return (
    <div className="relative min-h-[80px] z-10 drop-shadow-md">
      <div className="top-0 fixed left-0 right-0 bg-white">
        <div className="container py-2 px-3 mx-auto">
          <div className="flex flex-row">
            <div className="flex flex-grow items-center">
              <img src="/images/upsmf.png" alt="logo" className="h-[64px]" />
            </div>
            <div className="flex flex-grow items-center justify-end gap-4">
              {!showButtons && (
                <div className="flex space-x-4">
                  <Link to={APPLICANT_ROUTE_MAP.dashboardModule.register}>
                    <Button
                      moreClass="px-4 text-primary-600"
                      style={{ backgroundColor: "#fff" }}
                      text="Self Registration"
                    ></Button>
                  </Link>
                  <Link to={APPLICANT_ROUTE_MAP.loginModule.login}>
                    <Button moreClass="px-6 text-white" text="Login"></Button>
                  </Link>
                </div>
              )}

              {userData?.userRepresentation && (
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <button
                      className="w-[44px] h-[44px] border-green-500 bg-green-500 hover:bg-green-400 justify-center items-center rounded-md font-bold shadow-sm p-2 tracking-wider text-base text-white"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      {getInitials(
                        `${userData?.userRepresentation?.firstName?.trim()} ${userData?.userRepresentation?.lastName?.trim()}`
                      )}
                    </button>
                  </MenuHandler>
                  <MenuList className="p-[4px]">
                    <MenuItem
                      className="text-gray-700 font-semibold block w-full text-left text-sm p-3"
                      onClick={handleNavigateProfile}
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem
                      className="text-gray-700 font-semibold block w-full text-left text-sm p-3"
                      onClick={handleLogout}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
