export interface Playlist {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  songs: Song[];
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url?: string;
  coverUrl?: string;
  playlistId?: number;
}
