
import { Volume2, VolumeX } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onChange }: VolumeControlProps) => {
  const toggleMute = () => {
    onChange(volume > 0 ? 0 : 1);
  };

  return (
    <div className="flex items-center space-x-2">
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
