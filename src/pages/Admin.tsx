
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Song } from "@/types";
import { initialPlaylist } from "@/data/initialPlaylist";
import { Button } from "@/components/ui/button";
import { Heart, Music, Trash2, ArrowLeft, Plus, Save } from "lucide-react";
import FileUploader from "@/components/FileUploader";
import ImageUploader from "@/components/ImageUploader";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [songs, setSongs] = useState<Song[]>(initialPlaylist);
  const [newSong, setNewSong] = useState<Partial<Song>>({
    id: "",
    title: "",
    artist: "",
    audioUrl: "",
    imageUrl: "",
    duration: 0
  });
  const [isAdding, setIsAdding] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const navigate = useNavigate();
  
  // This is a simple authentication method - in a real app, use proper authentication
  const attemptLogin = () => {
    // Replace 'your-secret-password' with your actual password
    if (password === "lovable") {
      setIsAuthenticated(true);
      localStorage.setItem("cms-authenticated", "true");
    } else {
      alert("Incorrect password");
    }
  };
  
  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("cms-authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("cms-authenticated");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong(prev => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value
    }));
  };

  const handleAudioUpload = (file: File) => {
    setAudioFile(file);
    // Create a URL for the audio file
    const url = URL.createObjectURL(file);
    setNewSong(prev => ({
      ...prev,
      audioUrl: url
    }));
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    // Create a URL for the image file
    const url = URL.createObjectURL(file);
    setNewSong(prev => ({
      ...prev,
      imageUrl: url
    }));
  };
  
  const handleAddSong = () => {
    if (!newSong.title || !newSong.artist || !newSong.audioUrl || !newSong.imageUrl) {
      alert("Please fill in all fields");
      return;
    }
    
    const song: Song = {
      id: Date.now().toString(),
      title: newSong.title || "",
      artist: newSong.artist || "",
      audioUrl: newSong.audioUrl || "",
      imageUrl: newSong.imageUrl || "",
      duration: newSong.duration || 180
    };
    
    setSongs(prev => [...prev, song]);
    
    // In a real app, you would save this to your backend/database
    console.log("Song added:", song);
    
    // Reset form
    setNewSong({
      id: "",
      title: "",
      artist: "",
      audioUrl: "",
      imageUrl: "",
      duration: 0
    });
    setAudioFile(null);
    setImageFile(null);
    
    setIsAdding(false);
  };
  
  const handleRemoveSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
    // In a real app, you would delete this from your backend/database
  };
  
  const handleSavePlaylist = () => {
    // In a real app, you would save the entire playlist to your backend/database
    alert("Playlist saved! In a real application, this would update your database.");
    console.log("Saving playlist:", songs);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-black to-pink-900/30 flex items-center justify-center p-4">
        <div className="glass-panel rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <Heart size={36} className="text-pink-500" />
          </div>
          <h1 className="text-2xl font-medium text-white text-center mb-6">Admin Access</h1>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-spotify-text">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && attemptLogin()}
                className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Enter admin password"
              />
            </div>
            
            <Button 
              onClick={attemptLogin}
              className="w-full bg-pink-700 hover:bg-pink-600"
            >
              Login
            </Button>
            
            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-spotify-text hover:text-spotify-white"
              >
                Return to Player
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-black to-pink-900/30 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-xl font-medium text-white">Playlist Manager</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={handleSavePlaylist}
              className="bg-transparent border-pink-700 text-pink-300 hover:bg-pink-900/20"
            >
              <Save size={18} className="mr-2" />
              Save Playlist
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-spotify-text hover:text-spotify-white"
            >
              Logout
            </Button>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-4 mb-6 border border-pink-900/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Songs</h2>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-pink-700 hover:bg-pink-600"
              disabled={isAdding}
            >
              <Plus size={18} className="mr-1" />
              Add Song
            </Button>
          </div>
          
          {isAdding && (
            <div className="bg-spotify-gray rounded-lg p-4 mb-4 border border-pink-900/20">
              <h3 className="text-md font-semibold text-spotify-white mb-4">Add New Song</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-xs text-spotify-text">
                    Song Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newSong.title || ""}
                    onChange={handleInputChange}
                    className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="Enter song title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="artist" className="text-xs text-spotify-text">
                    Artist
                  </label>
                  <input
                    id="artist"
                    name="artist"
                    type="text"
                    value={newSong.artist || ""}
                    onChange={handleInputChange}
                    className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="Enter artist name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-spotify-text">Audio Source</label>
                  <div className="grid grid-cols-1 gap-2">
                    {audioFile ? (
                      <div className="bg-spotify-dark rounded p-2 text-sm text-spotify-white flex justify-between items-center">
                        <span className="truncate">{audioFile.name}</span>
                        <button 
                          onClick={() => {
                            setAudioFile(null);
                            setNewSong(prev => ({ ...prev, audioUrl: "" }));
                          }}
                          className="text-spotify-text hover:text-red-500 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FileUploader 
                          onFileUpload={handleAudioUpload} 
                          className="h-24" 
                        />
                        <div className="flex items-center">
                          <span className="text-xs text-spotify-text mx-auto">- OR -</span>
                        </div>
                        <div>
                          <input
                            name="audioUrl"
                            type="text"
                            value={newSong.audioUrl || ""}
                            onChange={handleInputChange}
                            className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="Enter audio URL"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-spotify-text">Image Source</label>
                  <div className="grid grid-cols-1 gap-2">
                    {imageFile ? (
                      <div className="relative h-24 bg-spotify-dark rounded overflow-hidden">
                        <img 
                          src={newSong.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => {
                            setImageFile(null);
                            setNewSong(prev => ({ ...prev, imageUrl: "" }));
                          }}
                          className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-spotify-text hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageUploader 
                          onImageUpload={handleImageUpload} 
                          className="h-24" 
                        />
                        <div className="flex items-center">
                          <span className="text-xs text-spotify-text mx-auto">- OR -</span>
                        </div>
                        <div>
                          <input
                            name="imageUrl"
                            type="text"
                            value={newSong.imageUrl || ""}
                            onChange={handleInputChange}
                            className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                            placeholder="Enter image URL"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="duration" className="text-xs text-spotify-text">
                    Duration (seconds)
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    value={newSong.duration || ""}
                    onChange={handleInputChange}
                    className="w-full bg-spotify-dark text-spotify-white rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="Enter duration in seconds"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleAddSong}
                  className="bg-pink-700 hover:bg-pink-600"
                >
                  Add Song
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false);
                    setAudioFile(null);
                    setImageFile(null);
                    setNewSong({
                      id: "",
                      title: "",
                      artist: "",
                      audioUrl: "",
                      imageUrl: "",
                      duration: 0
                    });
                  }}
                  className="text-spotify-text hover:text-spotify-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {songs.map((song) => (
              <div 
                key={song.id}
                className="flex items-center justify-between bg-spotify-dark rounded-md p-3 group hover:bg-spotify-light transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-spotify-white">{song.title}</h3>
                    <p className="text-xs text-spotify-text">{song.artist}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveSong(song.id)}
                  className="opacity-0 group-hover:opacity-100 text-spotify-text hover:text-red-500 hover:bg-transparent"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            
            {songs.length === 0 && (
              <div className="text-center py-6">
                <Music size={32} className="mx-auto text-spotify-text mb-2" />
                <p className="text-spotify-text">No songs in the playlist</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
