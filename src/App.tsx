import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { scopes } from "./scope";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface Credentials {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  state: string;
}

export interface User {
  display_name: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
}

export interface Image {
  height: any;
  url: string;
  width: any;
}

function generateRandomString(length = 16) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getHeaders() {
  // or axios.defaults.headers['Authorization']='<token>';

  const credentials: Credentials = JSON.parse(
    localStorage.getItem("credentials") as string
  );
  const token = `${credentials.tokenType} ${credentials.accessToken}`;
  const headers = {
    Authorization: token,
  };
  return headers;
}

function App() {
  const params = useRef(new URLSearchParams(location.hash.slice(1)));

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.current.get("access_token")) {
      const accessToken = params.current.get("access_token");
      const tokenType = params.current.get("token_type");
      const expiresIn = params.current.get("expires_in");
      const state = params.current.get("state"); // compare with localStorage

      const authCredentials = {
        accessToken,
        tokenType,
        expiresIn,
        state,
      };

      localStorage.setItem("credentials", JSON.stringify(authCredentials));

      setLogged(true);
      handleMe();
    }
  }, []);

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

    const win = window.open(url, "target=_blank");
  };

  const handleMe = () => {
    api
      .get("/me", { headers: getHeaders() })
      .then((response: AxiosResponse<User>) => {
        const userData: User = {
          display_name: response.data.display_name,
          id: response.data.id,
          images: response.data.images,
          product: response.data.product,
          type: response.data.type,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      });
  };

  const handleMyPlaylist = () => {
    api.get("/me/playlists", { headers: getHeaders() }).then((response) => {
      //
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleLogin}>Login spotify</button>
        {logged && (
          <>
            <button onClick={handleMe}>Me</button>
            <button onClick={handleMyPlaylist}>my playlist</button>
            {user?.display_name && (
              <>
                <h1>{user.display_name}</h1>
                <img src={user.images[0].url} />
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
