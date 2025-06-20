
import { useState } from 'react';
import { Trophy, Upload, FileText, Image, Video, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WinnerManagement = () => {
  const [selectedWinner, setSelectedWinner] = useState<any>(null);
  const [winnerData, setWinnerData] = useState({
    deliveryImages: [],
    deliveryVideos: [],
    testimonial: '',
    deliveryDate: '',
    location: '',
    rating: 5,
    additionalNotes: ''
  });

  // Mock winners data
  const winners = [
    {
      id: 1,
      name: "Sarah M.",
      email: "sarah@example.com",
      car: "Ferrari F8 Tributo",
      raffleName: "Win a Ferrari F8 Tributo",
      ticketNumber: "A-7892",
      dateWon: "2024-12-15",
      status: "completed",
      value: "$280,000",
      hasDetails: true
    },
    {
      id: 2,
      name: "Mike R.",
      email: "mike@example.com",
      car: "McLaren 720S",
      raffleName: "Win a McLaren 720S",
      ticketNumber: "B-3421",
      dateWon: "2024-12-10",
      status: "pending-delivery",
      value: "$300,000",
      hasDetails: false
    },
    {
      id: 3,
      name: "Jennifer L.",
      email: "jennifer@example.com",
      car: "Aston Martin DB11",
      raffleName: "Win an Aston Martin DB11",
      ticketNumber: "C-9876",
      dateWon: "2024-12-05",
      status: "completed",
      value: "$220,000",
      hasDetails: true
    }
  ];

  const handleSaveWinnerDetails = () => {
    console.log('Saving winner details:', winnerData);
    // Implement save logic
    setSelectedWinner(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white shadow-sm border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
                Winner Management
              </h1>
              <p className="text-gray-600 mt-1">Manage winner details and delivery information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Winners Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>All Winners</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Winner</TableHead>
                  <TableHead>Car Won</TableHead>
                  <TableHead>Raffle</TableHead>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Date Won</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {winners.map((winner) => (
                  <TableRow key={winner.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{winner.name}</div>
                        <div className="text-sm text-gray-500">{winner.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{winner.car}</TableCell>
                    <TableCell>{winner.raffleName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {winner.ticketNumber}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(winner.dateWon).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={
                        winner.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {winner.status === 'completed' ? 'Completed' : 'Pending Delivery'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">{winner.value}</TableCell>
                    <TableCell>
                      {winner.hasDetails ? (
                        <Badge className="bg-blue-100 text-blue-800">Complete</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Missing</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedWinner(winner)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {winner.hasDetails ? 'Edit Details' : 'Add Details'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                              Winner Details - {winner.name}
                            </DialogTitle>
                            <DialogDescription>
                              Add delivery information, images, videos, and testimonials for {winner.car}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="deliveryDate">Delivery Date</Label>
                                <Input
                                  id="deliveryDate"
                                  type="date"
                                  value={winnerData.deliveryDate}
                                  onChange={(e) => setWinnerData({...winnerData, deliveryDate: e.target.value})}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="location">Delivery Location</Label>
                                <Input
                                  id="location"
                                  placeholder="City, State"
                                  value={winnerData.location}
                                  onChange={(e) => setWinnerData({...winnerData, location: e.target.value})}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="rating">Winner Rating (1-5 stars)</Label>
                                <div className="flex items-center space-x-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-6 h-6 cursor-pointer ${
                                        star <= winnerData.rating 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-gray-300'
                                      }`}
                                      onClick={() => setWinnerData({...winnerData, rating: star})}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Media Uploads */}
                            <div className="space-y-4">
                              <div>
                                <Label>Delivery Images</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                  <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                  <Button variant="outline" size="sm">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Images
                                  </Button>
                                  <p className="text-sm text-gray-500 mt-2">
                                    Upload photos of car delivery, handover ceremony, etc.
                                  </p>
                                </div>
                              </div>
                              
                              <div>
                                <Label>Delivery Videos</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                  <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                  <Button variant="outline" size="sm">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Videos
                                  </Button>
                                  <p className="text-sm text-gray-500 mt-2">
                                    Upload videos of delivery, winner reaction, etc.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Testimonial */}
                          <div className="mt-6">
                            <Label htmlFor="testimonial">Winner Testimonial</Label>
                            <Textarea
                              id="testimonial"
                              placeholder="Enter the winner's testimonial or feedback about their experience..."
                              rows={4}
                              value={winnerData.testimonial}
                              onChange={(e) => setWinnerData({...winnerData, testimonial: e.target.value})}
                            />
                          </div>
                          
                          {/* Additional Notes */}
                          <div className="mt-4">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Any additional information about the delivery or winner..."
                              rows={3}
                              value={winnerData.additionalNotes}
                              onChange={(e) => setWinnerData({...winnerData, additionalNotes: e.target.value})}
                            />
                          </div>
                          
                          <DialogFooter className="mt-6">
                            <Button variant="outline" onClick={() => setSelectedWinner(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSaveWinnerDetails} className="bg-blue-600 hover:bg-blue-700">
                              Save Winner Details
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinnerManagement;
