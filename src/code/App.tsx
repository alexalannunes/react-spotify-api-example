import "./App.css";
import { UserLogged } from "./components/UserLogged";
import logo from "./logo.svg";
import { getHeaders, useSpotifyContext } from "./main";
import { api } from "./utils";

function App() {
  const { user, setPlaylist } = useSpotifyContext();
  const handleMyPlaylist = () => {
    api.get("/me/playlists", { headers: getHeaders() }).then((response) => {
      setPlaylist(response.data);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user?.data && <UserLogged {...user.data} />}
        <button onClick={handleMyPlaylist}>playlist</button>
      </header>
    </div>
  );
}

export default App;
