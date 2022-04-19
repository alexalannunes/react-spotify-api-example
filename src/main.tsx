import React, { createContext, FC, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const SpotifyContext = createContext<any>(null);

const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SpotifyContext.Provider value={{ id: 1 }}>
      {children}
    </SpotifyContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SpotifyProvider>
    <App />
  </SpotifyProvider>
  // </React.StrictMode>
);
