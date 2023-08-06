import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import { getCookie, removeCookie, getInitials } from "../utils/common";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showButtons, setshowButtons] = useState(false);
  const navigate = useNavigate();
  const regulator = getCookie("regulator");
  const userData = getCookie("userData");
  const instituteData = getCookie("institutes");

  const logout = () => {
    removeCookie("userData");
    removeCookie("institutes");
    removeCookie("regulator");
    navigate(ADMIN_ROUTE_MAP.loginModule.login);
  };

  useEffect(() => {
    if (instituteData != null) {
      setshowButtons(true);
    }
  }, [instituteData]);

  return (
    <>
      <div className="relative min-h-[80px] z-10 drop-shadow-md">
        <div className="top-0 fixed left-0 right-0 bg-white">
          <div className="container py-2 px-3 mx-auto">
            <div className="flex flex-row">
              <div className="flex flex-grow items-center">
                <img src="/images/upsmf.png" alt="logo" className="h-[64px]" />
              </div>
              <div className="flex flex-grow items-center justify-end">
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
                      onClick={logout}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
