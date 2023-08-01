import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import { getCookie, removeCookie, getInitials } from "../utils/common";
import ADMIN_ROUTE_MAP from "../routes/adminRouteMap";
import Overlay from "../pages/notifications/Overlay";

export default function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showButtons, setshowButtons] = useState(false);
  const navigate = useNavigate();
  const regulator = getCookie("regulator");
  const userData = getCookie("userData")
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
              <div className="flex grow">
                <img src="/images/upsmf.png" alt="logo" className="h-[64px]" />
              </div>
              <div className="relative inline-block text-left flex gap-12 items-center">
                <Overlay className="text-3xl text-gray-500" />
                <div>
                  <button
                    type="button"
                    className="border-green-500 bg-green-500 inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white-500 shadow-sm hover:bg-green-400"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                    }}
                  >
                    {/* {getInitials(regulator[0].full_name)}  */}
                    {getInitials(userData?.userRepresentation?.firstName.trim()+" "+userData?.userRepresentation?.lastName.trim())}

                  </button>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div class="py-1" role="none">
                        <button
                          type="button"
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-3"
                          onClick={logout}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>

    </>
  );
}
