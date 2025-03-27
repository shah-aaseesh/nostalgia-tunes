
import { Volume2, VolumeX } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
  className?: string;
}

const VolumeControl = ({ volume, onChange, className }: VolumeControlProps) => {
  const toggleMute = () => {
    onChange(volume > 0 ? 0 : 1);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <button 
        onClick={toggleMute}
        className="text-spotify-text hover:text-spotify-white transition-colors"
      >
        {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <ProgressBar 
        value={volume} 
        max={1} 
        onChange={onChange} 
        className="w-24" 
      />
    </div>
  );
};

export default VolumeControl;
