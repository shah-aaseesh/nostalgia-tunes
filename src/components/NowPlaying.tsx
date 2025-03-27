
import { useEffect, useState } from "react";
import { Song } from "../types";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface NowPlayingProps {
  song: Song | null;
  className?: string;
}

const NowPlaying = ({ song, className }: NowPlayingProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  
  useEffect(() => {
    // Reset loaded state when song changes
    setImageLoaded(false);
  }, [song?.id]);
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
  };
  
  if (!song) return null;
  
  return (
    <div className={cn("flex items-center relative", className)}>
      <div className="w-14 h-14 rounded-md overflow-hidden mr-4 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer"></div>
        )}
        <img
          src={song.imageUrl}
          alt={song.title}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="flex-grow mr-4">
        <h3 className="text-sm font-medium text-spotify-white truncate">
          {song.title}
        </h3>
        <p className="text-xs text-spotify-text truncate">{song.artist}</p>
      </div>
      <button
        onClick={handleFavoriteClick}
        className={cn(
          "text-spotify-text transition-colors",
          isFavorite ? "text-pink-500 hover:text-pink-400" : "hover:text-spotify-white"
        )}
      >
        <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
      </button>
      
      {showHeartAnimation && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Heart 
            size={40} 
            className="text-pink-500 animate-ping opacity-0" 
            fill="currentColor"
            style={{animationDuration: "0.8s"}}
          />
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
