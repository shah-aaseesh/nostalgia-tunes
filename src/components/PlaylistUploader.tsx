
import { useState } from "react";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import ImageUploader from "./ImageUploader";
import { X } from "lucide-react";
import { Song } from "@/types";

interface PlaylistUploaderProps {
  onAddSong: (song: Song) => void;
  className?: string;
}

const PlaylistUploader = ({ onAddSong, className }: PlaylistUploaderProps) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const resetForm = () => {
    setTitle("");
    setArtist("");
    setAudioFile(null);
    setImageFile(null);
    
    // Revoke object URLs to free up memory
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    
    setAudioUrl(null);
    setImageUrl(null);
  };
  
  const handleAudioUpload = (file: File) => {
    setAudioFile(file);
    
    // Create a URL for the audio file
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Auto-fill title and artist from filename if not already set
    if (!title || !artist) {
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const parts = fileName.split("-").map(part => part.trim());
      
      if (parts.length >= 2) {
        if (!artist) setArtist(parts[0]);
        if (!title) setTitle(parts[1]);
      } else {
        if (!title) setTitle(fileName);
      }
    }
    
    // Get audio duration
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      // Audio duration is available here
      console.log("Audio duration:", audio.duration);
    });
  };
  
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    
    // Create a URL for the image file
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !artist || !audioUrl || !imageUrl) {
      alert("Please fill in all fields and upload both audio and image files");
      return;
    }
    
    // Create a new song object
    const newSong: Song = {
      id: Date.now().toString(),
      title,
      artist,
      audioUrl,
      imageUrl,
      duration: 180 // Default duration, will be updated when actually playing
    };
    
    // Add the song to the playlist
    onAddSong(newSong);
    
    // Reset the form
    resetForm();
  };
  
  return (
    <div className={cn("bg-spotify-gray rounded-lg p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-spotify-white">Add New Song</h3>
        <button 
          onClick={resetForm}
          className="text-spotify-text hover:text-spotify-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-xs text-spotify-text">
            Song Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-spotify"
            placeholder="Enter song title"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="artist" className="text-xs text-spotify-text">
            Artist
          </label>
          <input
            id="artist"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-spotify"
            placeholder="Enter artist name"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-spotify-text mb-2">Song File</p>
            {audioFile ? (
              <div className="bg-spotify-dark rounded p-2 flex items-center justify-between">
                <span className="text-xs text-spotify-white truncate pr-2">
                  {audioFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (audioUrl) URL.revokeObjectURL(audioUrl);
                    setAudioFile(null);
                    setAudioUrl(null);
                  }}
                  className="text-spotify-text hover:text-spotify-white"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <FileUploader onFileUpload={handleAudioUpload} />
            )}
          </div>
          
          <div>
            <p className="text-xs text-spotify-text mb-2">Memory Photo</p>
            {imageFile ? (
              <div className="relative h-24 w-full bg-spotify-dark rounded overflow-hidden">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (imageUrl) URL.revokeObjectURL(imageUrl);
                    setImageFile(null);
                    setImageUrl(null);
                  }}
                  className="absolute top-1 right-1 bg-spotify-dark/70 rounded-full p-1 text-spotify-text hover:text-spotify-white"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <ImageUploader onImageUpload={handleImageUpload} />
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-spotify text-white rounded py-2 text-sm font-medium hover:bg-spotify/90 transition-colors"
          disabled={!title || !artist || !audioUrl || !imageUrl}
        >
          Add Song to Playlist
        </button>
      </form>
    </div>
  );
};

export default PlaylistUploader;
