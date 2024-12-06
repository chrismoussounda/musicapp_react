export interface Playlist {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url?: string;
  coverUrl?: string;
  playlistId: number;
}

export interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  totalDuration?: number;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
}

export interface NowPlayingProps {
  title?: string;
  artist?: string;
  coverUrl?: string;
}
