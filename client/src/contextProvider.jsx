import * as api from '@/api/index';

import { createContext, useContext, useState } from 'react';

const ContextApi = createContext();

export function useCustomContext() {
  return useContext(ContextApi);
}

export const ContextApiProvider = ({ children }) => {
  const [urlRequestData, setUrlRequestData] = useState(null);

  const urlRequestSent = async (inputValue) => {
    try {
      const urlData = await api.sentUrlRequest(inputValue);
      console.log('urlData', urlData);
      setUrlRequestData(urlData.data.shortenedUrl);
    } catch (error) {
      console.log('urlRequestSent_error', error);
      return false;
    }
    return true;
  };

  const getUrlRespond = () => {
    if (urlRequestData) {
      return urlRequestData;
    }
    return false;
  };

  const value = {
    urlRequestData,
    urlRequestSent,
    getUrlRespond,
  };

  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};
