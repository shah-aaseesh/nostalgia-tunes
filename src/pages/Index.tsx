
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-dark via-black to-pink-900/30 p-4 sm:p-6 md:p-8 flex flex-col">
      <div className="flex-grow">
        <MusicPlayer />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
