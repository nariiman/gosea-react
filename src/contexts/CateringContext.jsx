import React, { createContext, useContext, useState } from "react";

const CateringContext = createContext();

export const CateringProvider = ({ children }) => {
  const [cateringRequest, setCateringRequest] = useState(null);

  return (
    <CateringContext.Provider value={{ cateringRequest, setCateringRequest }}>
      {children}
    </CateringContext.Provider>
  );
};

export const useCatering = () => useContext(CateringContext);
