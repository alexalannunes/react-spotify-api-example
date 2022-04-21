import React, { createContext, ReactNode, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContextType, Credentials, UserType } from "../types";

export const AuthContext = createContext<AuthContextType>({
  credentials: null,
  setCredential: (crentential) => {},
  user: {
    status: "idle",
    data: null,
  },
  setUser: (user) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, dispatchCredential] = useState<Credentials | null>(null);
  const [user, dispatchUser] = useState<UserType>({
    data: null,
    status: "idle",
  });
  const setCredential = (credentials: Credentials) => {
    dispatchCredential(credentials);
  };

  const setUser = (user: UserType) => {
    dispatchUser(user);
  };

  const value = {
    credentials,
    setCredential,
    user,
    setUser,
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
