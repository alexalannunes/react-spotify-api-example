import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Layout";
import styles from "./login.module.css";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setCredential } = useAuthContext();

  const handleLogin = () => {
    setCredential({
      accessToken: "",
      expiresIn: "",
      state: "",
      tokenType: "",
    });
    navigate("/");
    // var myWindow = window.open("", "", "width=400,height=500");
  };
  return (
    <div className={styles.login}>
      <h1 role="button" onClick={handleLogin} className={styles.loginTitle}>
        Login with Spotify
      </h1>
    </div>
  );
};

export { Login };
