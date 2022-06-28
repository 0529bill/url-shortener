import * as api from '@/api/index';

import { createContext, useContext, useState } from 'react';

const ContextApi = createContext();

export function useCustomContext() {
  return useContext(ContextApi);
}

export const ContextApiProvider = ({ children }) => {
  const [urlRequestData, setUrlRequestData] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const urlRequestSent = async (inputValue) => {
    try {
      setSpinning();
      const urlData = await api.sentUrlRequest(inputValue);
      console.log('urlData', urlData);
      setUrlRequestData(urlData.data.shortenedUrl);
      setStopSpinning();
    } catch (error) {
      console.log('urlRequestSent_error', error);
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

  const value = {
    setSpinning,
    setStopSpinning,
    isSpinning,
    urlRequestData,
    urlRequestSent,
    getUrlRespond,
  };

  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};
