import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Credentials, Playlist } from "../../types";
import { api } from "../../utils";
import { useAuthContext } from "../Layout";

function useLocalStorage(key: string, isObject = true) {
  const value = useMemo(() => {
    const valueItem = localStorage.getItem(key);
    return valueItem ? (isObject ? JSON.parse(valueItem) : valueItem) : null;
  }, []);

  return value;
}

interface PlaylistState {
  data: Playlist | null;
  status: "idle" | "loading" | "error";
}

const Home: React.FC = () => {
  const credentials: Credentials | null = useLocalStorage(
    "session:credentials"
  );
  const user = useLocalStorage("session:user");

  const { setUser } = useAuthContext();

  const [playlists, setPlaylists] = useState<PlaylistState>({
    data: null,
    status: "idle",
  });

  useEffect(() => {
    async function playlist() {
      const req = await api.get<Playlist>("/me/playlists", {
        headers: {
          Authorization: `${credentials?.tokenType} ${credentials?.accessToken}`,
        },
      });
      const data = req.data;
      setPlaylists({
        status: "loading",
        data: data,
      });
    }

    setUser(user);

    playlist();
  }, []);

  return (
    <div>
      <h1>My Playlist</h1>

      <div style={{ display: "flex", gap: 10 }}>
        {playlists.data?.items.map((i) => (
          <div
            key={i.id}
            style={{
              padding: 10,
              borderRadius: 2,
              border: "1px solid #fff",
              width: 150,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              fontSize: 14,
            }}
          >
            <div>
              <img
                src={i.images[0].url}
                width={100}
                height={100}
                alt={i.name}
              />
            </div>
            <div>
              <h5
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {i.name}
              </h5>
            </div>
            <div>
              <Link to={`/playlist/${i.id}`} style={{ color: "#fff" }}>
                Visit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Home };
