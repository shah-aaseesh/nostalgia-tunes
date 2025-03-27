
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(
      "mt-8 text-center text-xs sm:text-sm text-spotify-text py-4 animate-fade-in-up",
      className
    )}>
      <div className="flex items-center justify-center gap-1.5">
        <span>Made with</span>
        <Heart className="h-3 w-3 text-pink-500 animate-heartbeat" fill="currentColor" />
        <span>and only love, just for you.</span>
      </div>
    </footer>
  );
};

export default Footer;
