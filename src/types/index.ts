export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
  duration: number; // Duration in seconds
}

export interface PlaylistState {
  currentSongIndex: number;
  isPlaying: boolean;
  songs: Song[];
  progress: number; // Current playback progress in seconds
  volume: number; // Volume from 0 to 1
}
