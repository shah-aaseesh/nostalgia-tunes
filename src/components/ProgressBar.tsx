
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  onChange?: (value: number) => void;
  className?: string;
}

const ProgressBar = ({ value, max, onChange, className }: ProgressBarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const percentage = (value / max) * 100;
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onChange) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newValue = Math.max(0, Math.min(max, position * max));
    
    onChange(newValue);
  }, [max, onChange]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    
    if (isDragging && onChange) {
      const newValue = Math.max(0, Math.min(max, position * max));
      onChange(newValue);
    } else {
      setHoverPosition(position * 100);
    }
  }, [isDragging, max, onChange]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseEnter = () => {
    if (progressRef.current) {
      progressRef.current.addEventListener("mousemove", handleMouseMove);
    }
  };
  
  const handleMouseLeave = () => {
    if (progressRef.current) {
      progressRef.current.removeEventListener("mousemove", handleMouseMove);
      setHoverPosition(null);
    }
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  return (
    <div 
      ref={progressRef}
      className={cn(
        "h-1 bg-spotify-light rounded-full cursor-pointer group relative",
        className
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute top-0 left-0 h-full progress-gradient rounded-full"
        style={{ width: `${percentage}%` }}
      />
      {/* Hover effect */}
      {hoverPosition !== null && (
        <div 
          className="absolute top-0 left-0 h-full bg-spotify-text/30 rounded-full"
          style={{ width: `${hoverPosition}%` }}
        />
      )}
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `calc(${percentage}% - 6px)` }}
      />
    </div>
  );
};

export default ProgressBar;
