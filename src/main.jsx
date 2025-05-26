import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportationProvider } from "./contexts/TransporationContext.jsx";
import { CateringProvider } from "./contexts/CateringContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TransportationProvider>
        <CateringProvider>
          <App />
        </CateringProvider>
      </TransportationProvider>
    </QueryClientProvider>
  </StrictMode>
);
