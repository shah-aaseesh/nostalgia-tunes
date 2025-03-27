
import { Song } from "../types";
import { cn } from "@/lib/utils";

interface SongCardProps {
  song: Song;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const SongCard = ({ song, isActive, onClick, className }: SongCardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div
      className={cn(
        "group flex items-center p-3 rounded-md mb-2 transition-all duration-300 hover:bg-spotify-light cursor-pointer",
        isActive ? "bg-spotify-light" : "bg-spotify-gray",
        className
      )}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-grow">
        <h3 className={cn("text-sm font-medium transition-colors", isActive ? "text-spotify" : "text-spotify-white")}>
          {song.title}
        </h3>
        <p className="text-xs text-spotify-text">{song.artist}</p>
      </div>
      <div className="text-xs text-spotify-text">{formatTime(song.duration)}</div>
    </div>
  );
};

export default SongCard;
