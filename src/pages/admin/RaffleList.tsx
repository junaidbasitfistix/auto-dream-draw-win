
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Trophy, DollarSign, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RaffleList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRaffle, setNewRaffle] = useState({
    title: '',
    carId: '',
    description: '',
    ticketPrice: '',
    totalTickets: '',
    endDate: '',
    status: 'draft'
  });

  // Mock raffles data
  const raffles = [
    {
      id: 1,
      title: 'Win a BMW M3 Competition',
      car: 'BMW M3 2023',
      ticketPrice: 50,
      totalTickets: 1000,
      soldTickets: 750,
      revenue: 37500,
      endDate: '2024-07-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Ferrari F8 Tributo Giveaway',
      car: 'Ferrari F8 2023',
      ticketPrice: 100,
      totalTickets: 500,
      soldTickets: 320,
      revenue: 32000,
      endDate: '2024-08-20',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Porsche 911 Dream Car',
      car: 'Porsche 911 2024',
      ticketPrice: 75,
      totalTickets: 800,
      soldTickets: 800,
      revenue: 60000,
      endDate: '2024-06-10',
      status: 'Completed'
    }
  ];

  const totalRaffles = raffles.length;
  const activeRaffles = raffles.filter(r => r.status === 'Active').length;
  const totalRevenue = raffles.reduce((sum, r) => sum + r.revenue, 0);

  const handleAddRaffle = () => {
    console.log('Adding new raffle:', newRaffle);
    setIsAddDialogOpen(false);
    setNewRaffle({
      title: '',
      carId: '',
      description: '',
      ticketPrice: '',
      totalTickets: '',
      endDate: '',
      status: 'draft'
    });
  };

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Raffle Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Raffle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Raffle</DialogTitle>
              <DialogDescription>
                Add a new car raffle to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Raffle Title</Label>
                <Input
                  id="title"
                  value={newRaffle.title}
                  onChange={(e) => setNewRaffle({...newRaffle, title: e.target.value})}
                  placeholder="Enter raffle title"
                />
              </div>
              <div>
                <Label htmlFor="carId">Select Car</Label>
                <Select value={newRaffle.carId} onValueChange={(value) => setNewRaffle({...newRaffle, carId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">BMW M3 2023</SelectItem>
                    <SelectItem value="2">Ferrari F8 2023</SelectItem>
                    <SelectItem value="3">Porsche 911 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRaffle.description}
                  onChange={(e) => setNewRaffle({...newRaffle, description: e.target.value})}
                  placeholder="Enter raffle description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
                  <Input
                    id="ticketPrice"
                    type="number"
                    value={newRaffle.ticketPrice}
                    onChange={(e) => setNewRaffle({...newRaffle, ticketPrice: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="totalTickets">Total Tickets</Label>
                  <Input
                    id="totalTickets"
                    type="number"
                    value={newRaffle.totalTickets}
                    onChange={(e) => setNewRaffle({...newRaffle, totalTickets: e.target.value})}
                    placeholder="1000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newRaffle.endDate}
                  onChange={(e) => setNewRaffle({...newRaffle, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newRaffle.status} onValueChange={(value) => setNewRaffle({...newRaffle, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRaffle}>
                Create Raffle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raffles</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRaffles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Raffles</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRaffles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Raffles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Raffles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Car</TableHead>
                <TableHead>Ticket Price</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raffles.map((raffle) => (
                <TableRow key={raffle.id}>
                  <TableCell className="font-medium">{raffle.title}</TableCell>
                  <TableCell>{raffle.car}</TableCell>
                  <TableCell>${raffle.ticketPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {raffle.soldTickets}/{raffle.totalTickets}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${raffle.revenue.toLocaleString()}</TableCell>
                  <TableCell>{new Date(raffle.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={raffle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      {raffle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/admin/raffles/detail/${raffle.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/admin/raffles/edit/${raffle.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaffleList;
