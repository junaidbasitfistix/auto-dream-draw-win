
import { Link } from 'react-router-dom';
import { Car, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#raffles" className="text-white/80 hover:text-white transition-colors">Active Raffles</a>
          <Link to="/winners" className="text-white/80 hover:text-white transition-colors">Winners</Link>
          <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="outline" size="sm" className="text-white border-white/20">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="text-white border-white/20">
              Profile
            </Button>
          </Link>
          <Link to="/signin">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
