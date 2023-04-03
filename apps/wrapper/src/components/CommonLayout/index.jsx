import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRightFromBracket,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CommonModal from "../Modal";
import isOnline from 'is-online';
import { logout } from "../../utils/index.js";
import { useEffect } from "react";

const CommonLayout = (props) => {
  const navigate = useNavigate();
  const [logoutModal, showLogoutModal] = useState(false);
  const [online, setOnline] = useState(true);
  const onlineInterval = useRef();

  useEffect(() => {
    onlineInterval.current = setInterval(async () => {
      let status = await isOnline();
      setOnline(status)
    }, 1000)
    return () => clearInterval(onlineInterval.current)
  }, [])

  return (
    <>
      <div className="flex flex-col bg-tertiary h-screen w-screen lg:w-[52vw] md:w-[80vw] md:m-auto lg:m-auto overflow-none">
        <div className="flex flex-row w-full justify-between relative">
          <div style={{ height: 20, width: 20, borderRadius: '50%', position: 'absolute', top: 0, right: 0, background: online ? '#229225' : 'red', marginTop: 20, marginRight: 20 }}></div>
          <img
            src="/assets/redGolLogo.png"
            className="p-5 h-[120px] w-[120px] lg:w-[170px] lg:h-[170px]"
            alt="illustration"
          />
          <img
            src="/assets/niramyaLogo.png"
            className="p-5 h-[120px] w-[120px] lg:w-[170px] lg:h-[170px]"
            alt="illustration"
          />
        </div>
        <div className="bg-white h-[calc(100vh-120px)] w-full rounded-t-[60px] overflow-none">
          <div className="flex flex-row w-full px-8 py-7 items-center cursor-pointer">
            {!props.backDisabled && (
              <FontAwesomeIcon
                icon={ props.iconType === 'close' ? faXmark : faArrowLeft }
                className="text-2xl lg:text-4xl"
                onClick={() => {
                  props.backFunction
                    ? props.backFunction()
                    : navigate(props.back);
                }}
              />
            )}
            <div className="text-secondary tracking-wide text-[25px] ml-4 font-bold lg:text-[45px]">{props.pageTitle}</div>
            {!props.logoutDisabled && (
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="text-2xl lg:text-4xl"
                onClick={() => showLogoutModal(true)}
              />
            )}
          </div>
          {props.children}
        </div>
      </div>
      {logoutModal && (
        <CommonModal>
          <div>
            <p className="text-secondary text-xl lg:text-3xl text-semibold font-medium text-center">
              Continue to logout?
            </p>
            <div className="flex flex-row justify-center w-full py-4">
              <div
                className="border border-primary text-primary py-1 px-7 mr-2 cursor-pointer lg:px-16 lg:py-3 lg:text-xl"
                onClick={() => logout()}
              >
                Yes
              </div>
              <div
                className="border border-primary bg-primary text-white py-1 px-7 cursor-pointer lg:px-16 lg:py-3 lg:text-xl"
                onClick={() => showLogoutModal(false)}
              >
                No
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default CommonLayout;
