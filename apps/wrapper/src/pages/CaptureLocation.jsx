import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_MAP from "../routing/routeMap";

import { StateContext } from "../App";
import { getCookie } from "../utils";

import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";

const CaptureLocation = () => {
  const [lat, setLat] = useState(12.9330171);
  const [long, setLong] = useState(77.5998201);
  const [showMap, setShowMap] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showContinue, setShowContinue ] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [role, setRole] = useState('');
  const { state, setState } = useContext(StateContext);
  const [distance, setDistance] = useState(9999);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 769;

  const getLocation = () => {
    if (navigator.geolocation && !loading) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((p) => {
        setLat(p.coords.latitude);
        setLong(p.coords.longitude);
        // setShowMap(true);
        // setLoading(false);
      });
    } else {
      setError(`Please allow location access.`);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }

  const handleCaptureLocation = () => {
    console.log('navigator.geolocation - ', navigator);
    if (navigator.geolocation && !loading) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((p) => {
        setLat(p.coords.latitude);
        setLong(p.coords.longitude);
        setShowMap(true);
        // setLoading(false);
        setState({
          ...state,
          userData: {
            ...state.userData,
            lat: p.coords.latitude,
            long: p.coords.longitude,
          },
        });
        setDistance(
          calcDistance(
            p.coords.latitude,
            p.coords.longitude,
            state.todayAssessment.latitude,
            state.todayAssessment.longitude
          )
        );

        setShowContinue(true);
        // console.log('distance - ', distance);
      });
    } else {
      setError(`Please allow location access.`);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  function calcDistance(lat1, lon1, lat2, lon2) {
    // console.log(`lat1 - ${lat1} & lon1 - ${lon1} & lat2 - ${lat2} & lon2 - ${lon2}`);
    var d;
    try {
      var R = 6371000; // radius of earth in metres
      var dLat = toRad(lat2 - lat1);
      var dLon = toRad(lon2 - lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      d = R * c;
    } catch (err) {
      console.log(err);
      setError("An error occured: " + err.toString());
      setTimeout(() => setError(false), 5000);
    }
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  const handleSubmit = () => {
    if (
      !state?.todayAssessment?.latitude ||
      !state?.todayAssessment?.longitude
    ) {
      setError(
        `Institute co-ordinates are missing. Please try again from start`
      );
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    if (!lat || !long) {
      setError(`Please capture location before continuing`);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    if (distance > 500) {
      setError(`Please ensure you are within the institute premises`);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    navigate(ROUTE_MAP.capture_selfie);
  };

  useEffect(() => {
    if (lat != 0 && long != 0) setDisabled(false);
    else setDisabled(true);
  }, [lat, long]);

  useEffect(() => {
    const {
      user: { registrations },
    } = getCookie("userData");
    const roles = registrations[0]?.roles[0];
    setRole(roles);
    setTimeout(() => {
      setLoading(false);
      setShowMap(true);
    }, 2000);
    getLocation();
  }, [])

  return (
    <CommonLayout back={role == 'Medical' ? ROUTE_MAP.medical_assessments : ROUTE_MAP.assessment_type} 
      logoutDisabled 
      iconType='close' 
      pageTitle="1. Capture Location" 
      pageDesc="Enable location in your mobile settings and capture Institute's location">
      <div className="flex flex-col px-6 gap-5 pb-5 overflow-y-auto">
        <div className="flex flex-row w-full text-center">
          {
            !showMap && loading && 
            (
              <div className="flex w-[80%] border-primary border-[1px] h-[280px] mx-auto">
                <div className="loader"></div>
              </div>
            )
          }

          {
            showMap && 
            (
              <>
                <div className={`w-full ${showContinue ? 'pointer-events-none' : ''}`}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    width={isMobile ? "100%" : "60%"}
                    loading="lazy"
                    title="map"
                    className={`animate__animated animate__fadeIn ${showContinue ? 'h-[40vh]' : 'h-[50vh]' } `}
                  />
                </div>
              </>
            )
          }
        </div>

        {
          error && (
            <span className="text-white animate__animated animate__headShake bg-red-500 font-medium px-4 py-3 text-center mt-2">
              {error}
            </span>
          )
        }

        <div className="flex flex-col gap-4">
          {
            showMap && !showContinue && 
            (
              <Button
                text="Capture Location"
                onClick={handleCaptureLocation}
                styles="border-primary bg-primary text-white animate__animated animate__fadeInDown"
              />
            )
          }
          {
            showContinue && (
              <>
                <Button
                  text="Continue"
                  styles="bg-primary border-primary text-white"
                  onClick={handleSubmit}
                />

                <Button 
                  text="Re-capture Location"
                  onClick={handleCaptureLocation}
                  styles={
                    loading
                      ? "bg-white text-primary border-primary border-[1px] opacity-75"
                      : "bg-white border-primary text-primary animate__animated animate__fadeInDown"
                  }
                />
              </>
            )
          }
          
          
        </div>

        <style>
          {
            `
              .loader {
                border: 8px solid #FFF; /* Light grey */
                border-top: 8px solid #F8913D; /* Blue */
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 2s linear infinite;
                margin: auto;
              }
                
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `
          }
        </style>
      </div>
    </CommonLayout>
  );
};

export default CaptureLocation;
