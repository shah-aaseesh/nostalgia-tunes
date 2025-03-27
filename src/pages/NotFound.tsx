
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-spotify-dark via-black to-spotify-dark/90 p-4">
      <div className="glass-panel rounded-lg p-8 text-center max-w-md animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-spotify-text mb-6">Oops! This track doesn't exist</p>
        <a href="/" className="inline-block bg-spotify hover:bg-spotify/90 text-white py-2 px-6 rounded-full transition-colors">
          Return to Playlist
        </a>
      </div>
    </div>
  );
};

export default NotFound;
