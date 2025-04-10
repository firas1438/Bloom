
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Home, MessageSquare, LineChart, BookOpen, Sparkles, EyeClosed, Facebook, ScanEye, ScanEyeIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-wellness-100">
      <div className="bloom-container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-wellness-400 to-wellness-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Bloom</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <Home size={16} />
            <span>Home</span>
          </Link>
          <Link to="/chat" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <MessageSquare size={16} />
            <span>Chat</span>
          </Link>
          <Link to="/express" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <ScanEye size={16} />
            <span>Express</span>
          </Link>
          <Link to="/mood" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <LineChart size={16} />
            <span>Mood</span>
          </Link>
          <Link to="/journal" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <BookOpen size={16} />
            <span>Journal</span>
          </Link>
          <Link to="/meditate" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-wellness-600 transition-colors">
            <Sparkles size={16} />
            <span>Meditate</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-background z-40">
          <nav className="flex flex-col gap-1 p-4 bg-white rounded-md border-2 ">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <Home size={18} className="text-wellness-500" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <MessageSquare size={18} className="text-wellness-500" />
              <span className="font-medium">Chat</span>
            </Link>
            <Link 
              to="/mood" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <LineChart size={18} className="text-wellness-500" />
              <span className="font-medium">Mood</span>
            </Link>
            <Link 
              to="/journal" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <BookOpen size={18} className="text-wellness-500" />
              <span className="font-medium">Journal</span>
            </Link>
            <Link 
              to="/meditate" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <Sparkles size={18} className="text-wellness-500" />
              <span className="font-medium">Meditate</span>
            </Link>
            <Link 
              to="/eyes" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-wellness-50 transition-colors"
              onClick={toggleMenu}
            >
              <ScanEye size={18} className="text-wellness-500" />
              <span className="font-medium">Express</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
