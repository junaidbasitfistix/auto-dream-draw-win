
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, Trophy, Users, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from '@/components/CountdownTimer';
import CarFilters from '@/components/CarFilters';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [filters, setFilters] = useState({
    carType: [],
    priceRange: '',
    brand: [],
    status: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extended mock data for more raffles - 8 cars total (2 rows of 4)
  const featuredCars = [
    {
      id: 1,
      name: "2024 Lamborghini Huracán",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      value: "$220,000",
      entries: 1247,
      ticketPrice: "$25",
      totalTickets: 10000,
      status: "active",
      brand: "Lamborghini",
      carType: "Supercar",
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: "2024 Porsche 911 Turbo S",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      value: "$180,000",
      entries: 892,
      ticketPrice: "$20",
      totalTickets: 8000,
      status: "active",
      brand: "Porsche",
      carType: "Sports Car",
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: "2024 BMW M4 Competition",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      value: "$85,000",
      entries: 2156,
      ticketPrice: "$10",
      totalTickets: 5000,
      status: "ending-soon",
      brand: "BMW",
      carType: "Sports Car",
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      name: "2024 Mercedes AMG GT",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      value: "$140,000",
      entries: 1456,
      ticketPrice: "$15",
      totalTickets: 7000,
      status: "active",
      brand: "Mercedes",
      carType: "Sports Car",
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      name: "2024 Audi R8 V10",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      value: "$190,000",
      entries: 987,
      ticketPrice: "$22",
      totalTickets: 8500,
      status: "active",
      brand: "Audi",
      carType: "Supercar",
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      name: "2024 Ferrari F8 Tributo",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      value: "$280,000",
      entries: 678,
      ticketPrice: "$30",
      totalTickets: 9000,
      status: "active",
      brand: "Ferrari",
      carType: "Supercar",
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 7,
      name: "2024 McLaren 720S",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      value: "$310,000",
      entries: 543,
      ticketPrice: "$35",
      totalTickets: 7500,
      status: "active",
      brand: "McLaren",
      carType: "Supercar",
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    },
    {
      id: 8,
      name: "2024 Aston Martin DB12",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      value: "$250,000",
      entries: 721,
      ticketPrice: "$28",
      totalTickets: 6800,
      status: "active",
      brand: "Aston Martin",
      carType: "Luxury",
      endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
    }
  ];

  const recentWinners = [
    { name: "Sarah M.", car: "Ferrari F8 Tributo", location: "California", date: "Dec 15, 2024", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Mike R.", car: "McLaren 720S", location: "Texas", date: "Dec 10, 2024", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Jennifer L.", car: "Aston Martin DB11", location: "New York", date: "Dec 5, 2024", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
  ];

  // Filter cars based on selected filters
  const filteredCars = featuredCars.filter(car => {
    const matchesCarType = filters.carType.length === 0 || filters.carType.includes(car.carType);
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(car.brand);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(car.status === 'ending-soon' ? 'Ending Soon' : 'Active');
    
    let matchesPrice = true;
    if (filters.priceRange) {
      const carValue = parseInt(car.value.replace(/[$,]/g, ''));
      switch (filters.priceRange) {
        case 'Under $100k':
          matchesPrice = carValue < 100000;
          break;
        case '$100k - $200k':
          matchesPrice = carValue >= 100000 && carValue <= 200000;
          break;
        case '$200k - $500k':
          matchesPrice = carValue >= 200000 && carValue <= 500000;
          break;
        case 'Over $500k':
          matchesPrice = carValue > 500000;
          break;
      }
    }
    
    return matchesCarType && matchesBrand && matchesStatus && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

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

      {/* Featured Countdown - Smaller */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 border border-red-500/20 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <Badge className="bg-red-600 text-white mb-3">Ending Soon</Badge>
              <h3 className="text-2xl font-bold text-white mb-2">2024 Lamborghini Huracán</h3>
              <p className="text-white/80">Last chance to enter!</p>
            </div>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-slate-700/50">
                  <div className="text-lg font-bold text-white">5</div>
                  <div className="text-xs text-slate-300">Days</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-slate-700/50">
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-xs text-slate-300">Hours</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-slate-700/50">
                  <div className="text-lg font-bold text-white">45</div>
                  <div className="text-xs text-slate-300">Minutes</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 text-center border border-slate-700/50">
                  <div className="text-lg font-bold text-white">23</div>
                  <div className="text-xs text-slate-300">Seconds</div>
                </div>
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
          <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
            <h3 className="text-4xl font-bold text-white mb-6 lg:mb-0">Active Raffles</h3>
            <div className="w-full lg:w-auto">
              <CarFilters 
                onFiltersChange={setFilters}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 text-xs ${
                      car.status === 'ending-soon' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {car.status === 'ending-soon' ? 'Ending Soon' : 'Active'}
                  </Badge>
                </div>
                
                <CardHeader className="p-3">
                  <CardTitle className="text-white text-sm leading-tight">{car.name}</CardTitle>
                  <CardDescription className="text-blue-400 text-sm font-semibold">
                    {car.value}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-3 pt-0 space-y-3">
                  <div className="grid grid-cols-4 gap-1">
                    <div className="bg-slate-800/50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-white">5</div>
                      <div className="text-[10px] text-slate-300">Days</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-white">12</div>
                      <div className="text-[10px] text-slate-300">Hours</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-white">45</div>
                      <div className="text-[10px] text-slate-300">Minutes</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-1 text-center">
                      <div className="text-xs font-bold text-white">23</div>
                      <div className="text-[10px] text-slate-300">Seconds</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-white/80 text-xs">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {car.entries.toLocaleString()}
                    </span>
                    <span>{car.ticketPrice}</span>
                  </div>
                  
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(car.entries / car.totalTickets) * 100}%` }}
                    ></div>
                  </div>
                  
                  <Link to={`/car/${car.id}`}>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No cars match your current filters.</p>
              <Button 
                onClick={() => setFilters({ carType: [], priceRange: '', brand: [], status: [] })}
                variant="outline"
                className="mt-4 text-white border-white/20"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Recent Winners - Fancy Theme */}
      <section id="winners" className="py-16 px-4 bg-gradient-to-r from-slate-900/50 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-4xl font-bold text-white">Recent Winners</h3>
            <Link to="/winners">
              <Button variant="outline" className="text-white border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40">
                View All Winners
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentWinners.map((winner, index) => (
              <Card key={index} className="bg-gradient-to-br from-yellow-600/10 via-orange-600/10 to-red-600/10 border border-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="relative">
                  <img 
                    src={winner.image} 
                    alt={winner.car}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
                  <Trophy className="absolute top-4 right-4 w-8 h-8 text-yellow-400 drop-shadow-lg" />
                </div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-white text-lg">{winner.name}</CardTitle>
                  <CardDescription className="text-yellow-400 font-semibold text-base">
                    Won: {winner.car}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-white/80 mb-1">{winner.location}</p>
                  <p className="text-sm text-white/60">{winner.date}</p>
                  <div className="mt-3 px-3 py-1 bg-yellow-500/20 rounded-full">
                    <span className="text-yellow-400 text-xs font-medium">🎉 Congratulations!</span>
                  </div>
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

      <Footer />
    </div>
  );
};

export default Index;
