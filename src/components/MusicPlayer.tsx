
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Song, PlaylistState } from "@/types";
import { initialPlaylist } from "@/data/initialPlaylist";
import SongCard from "./SongCard";
import ProgressBar from "./ProgressBar";
import PlayerControls from "./PlayerControls";
import NowPlaying from "./NowPlaying";
import VolumeControl from "./VolumeControl";
import ParticleBackground from "./ParticleBackground";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
};

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [state, setState] = useState<PlaylistState>({
    currentSongIndex: 0,
    isPlaying: false,
    songs: initialPlaylist,
    progress: 0,
    volume: 0.7,
  });
  
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number | null>(null);
  
  const currentSong = state.songs[state.currentSongIndex];
  
  // Clear interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Update audio element when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
      
      if (state.isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setState((prev) => ({ ...prev, isPlaying: false }));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying, state.currentSongIndex, state.volume]);
  
  // Start progress tracking when playing
  useEffect(() => {
    if (state.isPlaying) {
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setState((prev) => ({
            ...prev,
            progress: audioRef.current?.currentTime || 0,
          }));
        }
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [state.isPlaying]);
  
  const handlePlayPause = () => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };
  
  const handlePrevious = () => {
    setState((prev) => ({
      ...prev,
      currentSongIndex:
        (prev.currentSongIndex - 1 + prev.songs.length) % prev.songs.length,
      progress: 0,
    }));
  };
  
  const handleNext = () => {
    setState((prev) => ({
      ...prev,
      currentSongIndex: (prev.currentSongIndex + 1) % prev.songs.length,
      progress: 0,
    }));
  };
  
  const handleEnded = () => {
    handleNext();
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleProgressChange = (newProgress: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress;
      setState((prev) => ({ ...prev, progress: newProgress }));
    }
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setState((prev) => ({ ...prev, volume: newVolume }));
  };
  
  const handleSongSelect = (index: number) => {
    if (index === state.currentSongIndex) {
      // Toggle play/pause if clicking on the current song
      handlePlayPause();
    } else {
      // Select a new song
      setState((prev) => ({
        ...prev,
        currentSongIndex: index,
        progress: 0,
        isPlaying: true,
      }));
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col max-w-4xl mx-auto h-full overflow-hidden animate-fade-in",
      className
    )}>
      <ParticleBackground />
      
      <div className="glass-panel rounded-lg p-6 mb-8 animate-fade-in-up">
        <h1 className="text-2xl font-medium text-white text-center mb-2">Every song tells a story. These were ours.</h1>
        <p className="text-spotify-text text-center">Each melody holds a moment we shared. With love on your birthday.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
        {/* Left panel (Playlist) */}
        <div className="glass-panel rounded-lg p-4 w-full md:w-1/2 flex flex-col animate-fade-in-up border border-pink-900/20" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-lg font-medium text-white mb-4">Our Playlist</h2>
          
          <div className="flex-1 overflow-y-auto pr-2">
            {state.songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                isActive={index === state.currentSongIndex}
                onClick={() => handleSongSelect(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Right panel (Now Playing) */}
        <div className="glass-panel rounded-lg p-4 w-full md:w-1/2 flex flex-col animate-fade-in-up border border-pink-900/20" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-medium text-white mb-4">Now Playing</h2>
          
          {currentSong && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-64 aspect-square rounded-md overflow-hidden mb-8 shadow-xl animate-float relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={currentSong.imageUrl}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold text-white text-center mb-1">
                {currentSong.title}
              </h3>
              <p className="text-spotify-text text-center mb-8">
                {currentSong.artist}
              </p>
              
              <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onEnded={handleEnded}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Player controls (bottom) */}
      <div className="glass-panel rounded-lg p-4 mt-6 animate-fade-in-up border border-pink-900/20" style={{ animationDelay: "0.3s" }}>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs text-spotify-text">
            <span>{formatTime(state.progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <ProgressBar
            value={state.progress}
            max={duration || currentSong?.duration || 0}
            onChange={handleProgressChange}
          />
          
          <div className="flex items-center justify-between">
            <NowPlaying song={currentSong} className="hidden md:flex w-1/4" />
            
            <PlayerControls
              isPlaying={state.isPlaying}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              className="flex-1 md:w-2/4"
            />
            
            <VolumeControl
              volume={state.volume}
              onChange={handleVolumeChange}
              className="hidden md:flex justify-end w-1/4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
