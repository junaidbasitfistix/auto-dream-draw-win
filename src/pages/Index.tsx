
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, Trophy, Users, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredCars = [
    {
      id: 1,
      name: "2024 Lamborghini Huracán",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      value: "$220,000",
      entries: 1247,
      ticketPrice: "$25",
      totalTickets: 10000,
      status: "active"
    },
    {
      id: 2,
      name: "2024 Porsche 911 Turbo S",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      value: "$180,000",
      entries: 892,
      ticketPrice: "$20",
      totalTickets: 8000,
      status: "active"
    },
    {
      id: 3,
      name: "2024 BMW M4 Competition",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      value: "$85,000",
      entries: 2156,
      ticketPrice: "$10",
      totalTickets: 5000,
      status: "ending-soon"
    }
  ];

  const recentWinners = [
    { name: "Sarah M.", car: "Ferrari F8 Tributo", location: "California", date: "Dec 15, 2024" },
    { name: "Mike R.", car: "McLaren 720S", location: "Texas", date: "Dec 10, 2024" },
    { name: "Jennifer L.", car: "Aston Martin DB11", location: "New York", date: "Dec 5, 2024" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#raffles" className="text-white/80 hover:text-white transition-colors">Active Raffles</a>
            <a href="#winners" className="text-white/80 hover:text-white transition-colors">Winners</a>
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

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Win Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> Dream Car</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Enter our exclusive car raffles for a chance to win luxury supercars, sports cars, and dream vehicles. 
            Your next ride could be just one ticket away.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
            Browse Active Raffles
          </Button>
        </div>
      </section>

      {/* Featured Countdown */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-500/20">
            <div className="text-center mb-8">
              <Badge className="bg-red-600 text-white mb-4">Ending Soon</Badge>
              <h3 className="text-3xl font-bold text-white mb-2">2024 Lamborghini Huracán</h3>
              <p className="text-white/80">Last chance to enter!</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-white/60">Days</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-white/60">Hours</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-white/60">Minutes</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-sm text-white/60">Seconds</div>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/car/1">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Enter Now - $25/ticket
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Active Raffles */}
      <section id="raffles" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">Active Raffles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} className="bg-black/20 border-white/10 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      car.status === 'ending-soon' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {car.status === 'ending-soon' ? 'Ending Soon' : 'Active'}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-white">{car.name}</CardTitle>
                  <CardDescription className="text-blue-400 text-lg font-semibold">
                    Value: {car.value}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-white/80">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {car.entries.toLocaleString()} entries
                    </span>
                    <span>{car.ticketPrice}/ticket</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(car.entries / car.totalTickets) * 100}%` }}
                    ></div>
                  </div>
                  
                  <Link to={`/car/${car.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section id="winners" className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">Recent Winners</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentWinners.map((winner, index) => (
              <Card key={index} className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/20">
                <CardHeader className="text-center">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <CardTitle className="text-white">{winner.name}</CardTitle>
                  <CardDescription className="text-yellow-400 font-semibold">
                    Won: {winner.car}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80">{winner.location}</p>
                  <p className="text-sm text-white/60">{winner.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-12">How It Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Choose Your Car</h4>
              <p className="text-white/80">Browse our selection of luxury vehicles and pick your dream car to enter.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Buy Tickets</h4>
              <p className="text-white/80">Purchase raffle tickets to increase your chances of winning. More tickets = better odds!</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Win Your Car</h4>
              <p className="text-white/80">Wait for the draw and if you win, we'll arrange delivery of your new car!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
