import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/use-localStorage";
import { Credentials } from "../../types";
import { api } from "../../utils";

interface TracksState {
  data: [] | null;
  status: "idle" | "loading" | "error";
}

const Tracks: React.FC = () => {
  const credentials: Credentials | null = useLocalStorage(
    "session:credentials"
  );

  const { playlistId } = useParams();
  console.log(playlistId);

  useEffect(() => {
    async function playlist() {
      const req = await api.get(`/playlists/${playlistId}`, {
        headers: {
          Authorization: `${credentials?.tokenType} ${credentials?.accessToken}`,
        },
      });
      const data = req.data;
    }

    playlist();
  }, []);

  return (
    <div>
      <h1>My tracks</h1>

      <div style={{ display: "flex", gap: 10 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
        soluta dignissimos nihil alias molestias magni error! Odio asperiores
        accusamus qui adipisci, totam nesciunt minus beatae labore natus sequi
        error recusandae?
      </div>
    </div>
  );
};

export { Tracks };
