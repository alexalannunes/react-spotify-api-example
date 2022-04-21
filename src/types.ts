export interface Credentials {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  state: string;
}

export interface Image {
  height: any;
  url: string;
  width: any;
}
export interface User {
  display_name: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
}

export interface UserType {
  status: "idle" | "loading" | "error";
  data: User | null;
}

export interface SpotifyContextType {
  credentials: Credentials;
  user: UserType;
  login: () => void;
  setUser: (user: UserType) => void;
  playlist: Playlist | null;
  setPlaylist: (playlist: Playlist) => void;
}

export interface Playlist {
  href: string;
  items: PlaylistItem[];
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
}

export interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: any;
  public: boolean;
  type: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: any;
  url: string;
  width: any;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}
