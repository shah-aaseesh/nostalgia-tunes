
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  shuffle?: boolean;
  onShuffle?: () => void;
  repeat?: "off" | "all" | "one";
  onRepeat?: () => void;
  className?: string;
}

const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  shuffle = false,
  onShuffle,
  repeat = "off",
  onRepeat,
  className
}: PlayerControlsProps) => {
  return (
    <div className={cn("flex items-center justify-center space-x-4", className)}>
      {onShuffle && (
        <button 
          onClick={onShuffle}
          className={cn(
            "text-spotify-text hover:text-spotify-white transition-colors",
            shuffle && "text-spotify"
          )}
        >
          <Shuffle size={18} />
        </button>
      )}
      
      <button 
        onClick={onPrevious}
        className="text-spotify-text hover:text-spotify-white transition-colors"
      >
        <SkipBack size={20} />
      </button>
      
      <button 
        onClick={onPlayPause}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isPlaying ? (
          <Pause size={20} className="text-black" />
        ) : (
          <Play size={20} className="text-black ml-0.5" />
        )}
      </button>
      
      <button 
        onClick={onNext}
        className="text-spotify-text hover:text-spotify-white transition-colors"
      >
        <SkipForward size={20} />
      </button>
      
      {onRepeat && (
        <button 
          onClick={onRepeat}
          className={cn(
            "text-spotify-text hover:text-spotify-white transition-colors",
            repeat !== "off" && "text-spotify"
          )}
        >
          <Repeat size={18} />
          {repeat === "one" && (
            <span className="absolute text-[10px] top-0 right-0">1</span>
          )}
        </button>
      )}
    </div>
  );
};

export default PlayerControls;
