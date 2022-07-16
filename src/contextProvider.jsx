import * as api from "@/api/index";

import { createContext, useContext, useState } from "react";

import AlertModal from "@/components/AlertModal";
import { RTNCODES } from "@/constants";
import { useEffect } from "react";

console.log("RTNCODES", RTNCODES);
const ContextApi = createContext();

export function useCustomContext() {
  return useContext(ContextApi);
}

export const ContextApiProvider = ({ children }) => {
  const [urlRequestData, setUrlRequestData] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const urlRequestSent = async (inputValue) => {
    setSpinning();
    try {
      const urlData = await api.sentUrlRequest(inputValue);
      setUrlRequestData(urlData.data.shortenedUrl);
      setStopSpinning();
    } catch (error) {
      setStopSpinning();
      return false;
    }
    return true;
  };

  const getUrlRespond = () => {
    setSpinning();
    if (urlRequestData) {
      setStopSpinning();
      return urlRequestData;
    }
    setStopSpinning();
    return false;
  };

  const setSpinning = () => setIsSpinning(true);

  const setStopSpinning = () => setIsSpinning(false);

  const setAlert = (alertProps) => {
    return AlertModal(alertProps);
  };

  const setStopAlert = () => setAlertMessage(null);

  const createUser = async ({ userInfo, setPassedResult, history }) => {
    setSpinning();
    try {
      const infoData = await api.createUser(userInfo);
      console.log("infoData", infoData);
      setStopSpinning();
      setAlert({ type: "success", content: "User created!" });
      setPassedResult(null);
      return history.push("/user/signIn");
    } catch (error) {
      console.log("createUser_error", error);

      if (error?.headers?.rtn === RTNCODES.DuplicateUser) {
        setStopSpinning();

        setAlert({ type: "error", content: "Duplicated user" });
        return setPassedResult({ msg: "Duplicated user" });
      }
      setStopSpinning();
      setAlert({ type: "error", content: "Failed to create User" });
      return setPassedResult({ msg: "Failed to create User" });
    }
  };

  const value = {
    setSpinning,
    setStopSpinning,
    isSpinning,
    setAlert,
    setStopAlert,
    alertMessage,
    urlRequestData,
    urlRequestSent,
    getUrlRespond,
    createUser,
  };

  // useEffect(() => {
  //   setAlert("warning");
  // }, []);

  // useEffect(() => {
  //   if (setAlert) {
  //     setTimeout(() => setStopAlert(null), 3000);
  //   }
  // }, [setAlert]);

  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};
