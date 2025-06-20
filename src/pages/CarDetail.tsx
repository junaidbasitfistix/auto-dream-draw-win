
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, Clock, Users, Star, ArrowLeft, Plus, Minus, ShoppingCart, Car as CarIcon, Gauge, Settings, Fuel, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/CountdownTimer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Mock car data - in real app, fetch by ID
  const car = {
    id: 1,
    name: "2024 Lamborghini Huracán",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    value: "$220,000",
    entries: 1247,
    ticketPrice: 25,
    totalTickets: 10000,
    status: "active",
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    description: "Experience the thrill of Italian engineering with this stunning 2024 Lamborghini Huracán. This supercar features a naturally aspirated V10 engine producing 640 horsepower, delivering an unforgettable driving experience.",
    specifications: {
      engine: "5.2L V10",
      horsepower: "640 HP",
      transmission: "7-Speed Dual-Clutch",
      topSpeed: "202 mph",
      acceleration: "0-60 mph in 3.2s",
      drivetrain: "All-Wheel Drive",
      fuelType: "Premium Gasoline",
      fuelEconomy: "13/18 mpg",
      weight: "3,135 lbs",
      length: "175.6 in",
      width: "75.8 in",
      height: "45.9 in"
    },
    features: [
      "Adaptive Suspension",
      "Carbon Fiber Interior",
      "Premium Audio System",
      "Navigation System",
      "Heated Seats",
      "Rearview Camera",
      "Bluetooth Connectivity",
      "Keyless Entry",
      "LED Lighting",
      "Sport Exhaust System"
    ],
    safety: [
      "ABS Braking System",
      "Electronic Stability Control",
      "Traction Control",
      "Multiple Airbags",
      "Tire Pressure Monitoring",
      "Immobilizer System"
    ]
  };

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

  // Mock car winners data
  const carWinners = [
    {
      id: 1,
      name: "Michael R.",
      car: "2023 Lamborghini Huracán",
      location: "Miami, FL",
      date: "Nov 2024",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Jessica T.",
      car: "2022 Lamborghini Huracán",
      location: "Los Angeles, CA",
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

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
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Images Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {car.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img 
                        src={image} 
                        alt={`${car.name} ${index + 1}`}
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            {/* All Images Grid */}
            <div className="grid grid-cols-5 gap-2">
              {car.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${car.name} ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{car.name}</h1>
              <p className="text-blue-400 text-2xl font-semibold">Value: {car.value}</p>
            </div>

            {/* Countdown Timer - Smaller */}
            <Card className="bg-red-900/30 border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CountdownTimer endDate={car.endDate} className="text-sm" />
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

        {/* Detailed Information Tabs */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">{car.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-white/80 flex items-center">
                    <Star className="w-3 h-3 mr-2 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Safety */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Safety Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {car.safety.map((feature, index) => (
                  <li key={index} className="text-white/80 flex items-center">
                    <Star className="w-3 h-3 mr-2 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <div className="mt-8">
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-blue-400 font-semibold flex items-center">
                    <CarIcon className="w-4 h-4 mr-2" />
                    Engine & Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Engine</span>
                      <span className="text-white">{car.specifications.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Horsepower</span>
                      <span className="text-white">{car.specifications.horsepower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Transmission</span>
                      <span className="text-white">{car.specifications.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Top Speed</span>
                      <span className="text-white">{car.specifications.topSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">0-60 mph</span>
                      <span className="text-white">{car.specifications.acceleration}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-blue-400 font-semibold flex items-center">
                    <Fuel className="w-4 h-4 mr-2" />
                    Fuel & Efficiency
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Fuel Type</span>
                      <span className="text-white">{car.specifications.fuelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Fuel Economy</span>
                      <span className="text-white">{car.specifications.fuelEconomy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Drivetrain</span>
                      <span className="text-white">{car.specifications.drivetrain}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-blue-400 font-semibold flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Dimensions & Weight
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Weight</span>
                      <span className="text-white">{car.specifications.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Length</span>
                      <span className="text-white">{car.specifications.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Width</span>
                      <span className="text-white">{car.specifications.width}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Height</span>
                      <span className="text-white">{car.specifications.height}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Car Winners Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
            Previous Winners of This Car Model
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carWinners.map((winner) => (
              <Card key={winner.id} className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                <div className="flex items-center space-x-4 p-6">
                  <img 
                    src={winner.image} 
                    alt={winner.car}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">{winner.name}</h4>
                    <p className="text-yellow-400 font-semibold">{winner.car}</p>
                    <p className="text-white/70">{winner.location}</p>
                    <p className="text-white/60 text-sm">{winner.date}</p>
                  </div>
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
              </Card>
            ))}
          </div>
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

      <Footer />
    </div>
  );
};

export default CarDetail;
