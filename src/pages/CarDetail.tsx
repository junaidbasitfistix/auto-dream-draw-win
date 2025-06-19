
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, Clock, Users, Star, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  // Mock car data - in real app, fetch by ID
  const car = {
    id: 1,
    name: "2024 Lamborghini Huracán",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    value: "$220,000",
    entries: 1247,
    ticketPrice: 25,
    totalTickets: 10000,
    status: "active",
    description: "Experience the thrill of Italian engineering with this stunning 2024 Lamborghini Huracán. This supercar features a naturally aspirated V10 engine producing 640 horsepower, delivering an unforgettable driving experience.",
    specifications: {
      engine: "5.2L V10",
      horsepower: "640 HP",
      transmission: "7-Speed Dual-Clutch",
      topSpeed: "202 mph",
      acceleration: "0-60 mph in 3.2s",
      drivetrain: "All-Wheel Drive"
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Similar cars data
  const similarCars = [
    {
      id: 2,
      name: "2024 Porsche 911 Turbo S",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      value: "$180,000",
      ticketPrice: 20
    },
    {
      id: 3,
      name: "2024 BMW M4 Competition",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      value: "$85,000",
      ticketPrice: 10
    }
  ];

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

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} ticket(s) for ${car.name} added to your cart.`,
    });
  };

  const adjustQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6 text-white" />
              <span className="text-white">Back to Raffles</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="sm" className="text-white border-white/20">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={car.images[currentImageIndex]} 
                alt={car.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              <Badge 
                className={`absolute top-4 right-4 ${
                  car.status === 'ending-soon' ? 'bg-red-600' : 'bg-green-600'
                }`}
              >
                {car.status === 'ending-soon' ? 'Ending Soon' : 'Active'}
              </Badge>
            </div>
            
            <div className="flex space-x-2">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-white/20'
                  }`}
                >
                  <img src={image} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{car.name}</h1>
              <p className="text-blue-400 text-2xl font-semibold">Value: {car.value}</p>
            </div>

            {/* Countdown Timer */}
            <Card className="bg-red-900/30 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-xs text-white/60">Days</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-xs text-white/60">Hours</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-xs text-white/60">Minutes</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{timeLeft.seconds}</div>
                    <div className="text-xs text-white/60">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Entry Statistics */}
            <Card className="bg-black/20 border-white/10">
              <CardContent className="pt-6">
                <div className="flex justify-between text-white/80 mb-4">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {car.entries.toLocaleString()} entries
                  </span>
                  <span>${car.ticketPrice}/ticket</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${(car.entries / car.totalTickets) * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-white/60 text-sm">
                  {car.totalTickets - car.entries} tickets remaining
                </p>
              </CardContent>
            </Card>

            {/* Ticket Selection */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Select Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => adjustQuantity(-1)}
                      className="text-white border-white/20"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-bold text-white px-4">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => adjustQuantity(1)}
                      className="text-white border-white/20"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-white">Total:</span>
                  <span className="text-blue-400 font-bold">${car.ticketPrice * quantity}</span>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Car Description & Specifications */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">{car.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(car.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-white/60 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                    <dd className="text-white font-semibold">{value}</dd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Similar Cars */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-white mb-8">Similar Cars</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {similarCars.map((similarCar) => (
              <Link key={similarCar.id} to={`/car/${similarCar.id}`}>
                <Card className="bg-black/20 border-white/10 overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={similarCar.image} 
                      alt={similarCar.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-white">{similarCar.name}</CardTitle>
                    <CardDescription className="text-blue-400 text-lg font-semibold">
                      Value: {similarCar.value}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      View Details - ${similarCar.ticketPrice}/ticket
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
