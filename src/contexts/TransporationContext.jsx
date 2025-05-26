import { createContext, useContext, useState } from "react";

const TransportationContext = createContext();

export const TransportationProvider = ({ children }) => {
  const [transportationRequest, setTransportationRequest] = useState(null);

  return (
    <TransportationContext.Provider
      value={{ transportationRequest, setTransportationRequest }}
    >
      {children}
    </TransportationContext.Provider>
  );
};

export const useTransportation = () => useContext(TransportationContext);
