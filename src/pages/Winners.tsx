
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Trophy, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Winners = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const years = ['2024', '2023', '2022', '2021', '2020'];
  
  const winnersData = {
    '2024': [
      {
        id: 1,
        name: "Sarah M.",
        car: "Ferrari F8 Tributo",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
        location: "California, USA",
        date: "Dec 15, 2024",
        ticketNumber: "A-7892",
        totalEntries: 8500,
        value: "$280,000"
      },
      {
        id: 2,
        name: "Mike R.",
        car: "McLaren 720S",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        location: "Texas, USA",
        date: "Dec 10, 2024",
        ticketNumber: "B-3421",
        totalEntries: 6200,
        value: "$300,000"
      },
      {
        id: 3,
        name: "Jennifer L.",
        car: "Aston Martin DB11",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        location: "New York, USA",
        date: "Dec 5, 2024",
        ticketNumber: "C-9876",
        totalEntries: 4800,
        value: "$220,000"
      }
    ],
    '2023': [
      {
        id: 4,
        name: "David K.",
        car: "Lamborghini Aventador",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
        location: "Florida, USA",
        date: "Nov 20, 2023",
        ticketNumber: "D-1234",
        totalEntries: 9200,
        value: "$400,000"
      }
    ]
  };

  const currentWinners = winnersData[selectedYear as keyof typeof winnersData] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Past Winners</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Congratulations to all our lucky winners! See who has driven away with their dream cars.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          {/* Year Selection Sidebar */}
          <div className="lg:w-64">
            <Card className="bg-black/20 border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Year
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] px-6">
                  <div className="space-y-2 pb-4">
                    {years.map((year) => (
                      <Button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        variant={selectedYear === year ? "default" : "outline"}
                        className={`w-full justify-start ${
                          selectedYear === year 
                            ? 'bg-blue-600 text-white' 
                            : 'text-white border-white/20 bg-transparent hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{year}</span>
                          <Badge className="bg-white/20 text-white">
                            {winnersData[year as keyof typeof winnersData]?.length || 0}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Winners List */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedYear} Winners ({currentWinners.length})
              </h3>
              <p className="text-white/60">
                Total prize value distributed: ${currentWinners.reduce((sum, winner) => 
                  sum + parseInt(winner.value.replace(/[$,]/g, '')), 0
                ).toLocaleString()}
              </p>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {currentWinners.map((winner, index) => (
                  <Card key={winner.id} className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative">
                        <img 
                          src={winner.image} 
                          alt={winner.car}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <Badge className="bg-yellow-600 text-white">
                            #{index + 1} Winner
                          </Badge>
                          <Badge className="bg-green-600 text-white">
                            {winner.value}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-1">{winner.name}</h4>
                            <p className="text-blue-400 text-lg font-semibold">{winner.car}</p>
                          </div>
                          <Trophy className="w-8 h-8 text-yellow-400" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-white/80">
                            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                            {winner.location}
                          </div>
                          <div className="flex items-center text-white/80">
                            <Calendar className="w-4 h-4 mr-2 text-green-400" />
                            {winner.date}
                          </div>
                        </div>
                        
                        <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-white/60">Winning Ticket:</span>
                              <p className="text-yellow-400 font-mono font-bold text-lg">{winner.ticketNumber}</p>
                            </div>
                            <div>
                              <span className="text-white/60">Total Entries:</span>
                              <p className="text-white font-bold text-lg">{winner.totalEntries.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {currentWinners.length === 0 && (
                <Card className="bg-black/20 border-white/10 text-center py-12">
                  <CardContent>
                    <Trophy className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Winners Yet</h3>
                    <p className="text-white/60">No raffles were completed in {selectedYear}.</p>
                  </CardContent>
                </Card>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Winners;
