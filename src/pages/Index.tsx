import { useEffect, useState } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";
import { songService } from "@/lib/songService";
import { Song } from "@/types";
import { toast } from "sonner";

const Index = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songs = await songService.getSongs();
        setSongs(songs);
      } catch (error) {
        toast.error("Failed to load songs");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-black to-pink-900/30 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-black to-pink-900/30 p-4 sm:p-6 md:p-8 flex flex-col">
      <div className="flex-grow">
        <MusicPlayer songs={songs} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
