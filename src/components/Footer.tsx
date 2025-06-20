
import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="w-6 h-6 text-blue-400" />
              <h5 className="text-lg font-bold text-white">RaffleCars</h5>
            </div>
            <p className="text-white/60">Your chance to win luxury cars through fair and transparent raffles.</p>
          </div>
          
          <div>
            <h6 className="font-semibold text-white mb-4">Quick Links</h6>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Active Raffles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Past Winners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-white mb-4">Support</h6>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-semibold text-white mb-4">Follow Us</h6>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">i</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 RaffleCars. All rights reserved. | Must be 18+ to participate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
