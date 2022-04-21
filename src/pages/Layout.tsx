import React, { createContext, ReactNode, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext<any | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [credential, setCredential] = useState<any | null>(null);

  const value = {
    credential,
    setCredential,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

const Layout: React.FC = () => {
  return (
    <div>
      <header>header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
