import { AxiosResponse } from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { scopes } from "./scope";
import {
  Credentials,
  Playlist,
  SpotifyContextType,
  User,
  UserType,
} from "./types";
import { api, generateRandomString } from "./utils";

export function getHeaders() {
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

const SpotifyContext = createContext<SpotifyContextType>({
  credentials: {
    accessToken: "",
    tokenType: "",
    expiresIn: "",
    state: "",
  },
  user: {
    status: "idle",
    data: null,
  },
  login: () => {},
  setUser: (user: UserType) => {},
  playlist: null,
  setPlaylist: (playlist: Playlist) => {},
});

const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    accessToken: "",
    tokenType: "",
    expiresIn: "",
    state: "",
  });
  const [user, setUserDispatch] = useState<UserType>({
    status: "idle",
    data: null,
  });
  const [playlist, setPlaylistDispatch] = useState<Playlist | null>(null);
  const params = useRef(new URLSearchParams(location.hash.slice(1)));

  const login = () => {
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

    window.open(url, "target=_blank");
  };

  const setUser = (user: UserType) => {
    setUserDispatch(user);
  };

  const setPlaylist = (playlist: Playlist) => {
    setPlaylistDispatch(playlist);
  };

  const value = {
    credentials,
    user,
    login,
    setUser,
    playlist,
    setPlaylist,
  };

  useEffect(() => {
    if (params.current.get("access_token")) {
      const accessToken = params.current.get("access_token")!;
      const tokenType = params.current.get("token_type")!;
      const expiresIn = params.current.get("expires_in")!;
      const state = params.current.get("state")!; // compare with localStorage

      const authCredentials: Credentials = {
        accessToken,
        tokenType,
        expiresIn,
        state,
      };

      localStorage.setItem("credentials", JSON.stringify(authCredentials));

      setCredentials(authCredentials);
      handleMe();
    }
  }, []);

  const handleMe = () => {
    api
      .get("/me", { headers: getHeaders() })
      .then((response: AxiosResponse<User>) => {
        const userData: UserType = {
          status: "idle",
          data: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            product: response.data.product,
            type: response.data.type,
          },
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      });
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

export const useSpotifyContext = () => useContext(SpotifyContext);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SpotifyProvider>
    <App />
  </SpotifyProvider>
  // </React.StrictMode>
);
