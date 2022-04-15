// export const scopes = {
//   user_read_recently_played: "user-read-recently-played",
//   user_read_playback_state: "user-read-playback-state",
//   user_read_email: "user-read-email",
//   user_top_read: "user-top-read",
//   user_library_read: "user-library-read",
//   user_read_private: "user-read-private",
// } as const;

export const scopes = [
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-email",
  "user-top-read",
  "user-library-read",
  "user-read-private",
] as const;
