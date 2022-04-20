import { useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { User, useSpotifyContext } from "./main";

function App() {
  const { login, user } = useSpotifyContext();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={login}>Login spotify</button>
        {user.data.display_name && (
          <img src={user.data.images[0].url} alt="alex" />
        )}
      </header>
    </div>
  );
}

export default App;
