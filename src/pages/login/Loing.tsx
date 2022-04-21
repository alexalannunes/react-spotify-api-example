import React from "react";
import { scopes } from "../../scope";
import { generateRandomString } from "../../utils";
import styles from "./login.module.css";
const Login: React.FC = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const state = generateRandomString();
    localStorage.setItem("state", state);

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(clientId);
    url += "&scope=" + encodeURIComponent(scopes.join(" "));
    url += "&redirect_uri=" + encodeURIComponent(redirectUri);
    url += "&state=" + encodeURIComponent(state);

    window.open(url, "_self");
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
