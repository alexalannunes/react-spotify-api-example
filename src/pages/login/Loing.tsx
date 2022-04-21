import React from "react";
import styles from "./login.module.css";
const Login: React.FC = () => {
  const handleLogin = () => {
    var myWindow = window.open("", "", "width=400,height=500");
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
