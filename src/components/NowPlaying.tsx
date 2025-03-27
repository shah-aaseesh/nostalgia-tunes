
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
  
  useEffect(() => {
    // Reset loaded state when song changes
    setImageLoaded(false);
  }, [song?.id]);
  
  if (!song) return null;
  
  return (
    <div className={cn("flex items-center", className)}>
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
        onClick={() => setIsFavorite(!isFavorite)}
        className={cn(
          "text-spotify-text transition-colors",
          isFavorite ? "text-spotify hover:text-spotify/80" : "hover:text-spotify-white"
        )}
      >
        <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

export default NowPlaying;
