import React, { createContext, ReactNode, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContextType, Credentials, UserType } from "../types";
import styles from "./layout.module.css";
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
  const { user } = useAuthContext();
  return (
    <div>
      <header className={styles.header}>
        {user.data && (
          <div className={styles.headerContent}>
            <img
              src={user.data.images[0].url}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <h4>{user.data.display_name}</h4>
          </div>
        )}
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
