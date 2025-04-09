
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-wellness-100 py-8 mt-12 bg-background">
      <div className="bloom-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-lg font-bold text-gradient">Bloom</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Supporting your mental wellness journey
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm text-foreground/70 hover:text-wellness-500 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className="text-sm text-foreground/70 hover:text-wellness-500 transition-colors"
            >
              Chat
            </Link>
            <Link 
              to="/journal" 
              className="text-sm text-foreground/70 hover:text-wellness-500 transition-colors"
            >
              Journal
            </Link>
            <Link 
              to="/mood" 
              className="text-sm text-foreground/70 hover:text-wellness-500 transition-colors"
            >
              Mood
            </Link>
            <Link 
              to="/meditate" 
              className="text-sm text-foreground/70 hover:text-wellness-500 transition-colors"
            >
              Meditate
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-wellness-100 pt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart size={14} className="text-wellness-500 animate-pulse" /> for your wellbeing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
