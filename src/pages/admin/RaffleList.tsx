
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Edit, Trash2, Plus, Search, Users, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const RaffleList = () => {
  const [raffles, setRaffles] = useState([
    {
      id: 1,
      title: 'Win a BMW M3 Competition',
      car: 'BMW M3 2023',
      ticketPrice: 50,
      totalTickets: 1000,
      soldTickets: 750,
      endDate: '2024-07-15',
      status: 'Active',
      revenue: 37500
    },
    {
      id: 2,
      title: 'Mercedes C-Class AMG Raffle',
      car: 'Mercedes C-Class 2023',
      ticketPrice: 40,
      totalTickets: 800,
      soldTickets: 800,
      endDate: '2024-06-30',
      status: 'Completed',
      revenue: 32000
    },
    {
      id: 3,
      title: 'Audi A4 Dream Car Giveaway',
      car: 'Audi A4 2023',
      ticketPrice: 35,
      totalTickets: 1200,
      soldTickets: 400,
      endDate: '2024-08-01',
      status: 'Active',
      revenue: 14000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRaffles = raffles.filter(raffle =>
    raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    raffle.car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteRaffle = (id: number) => {
    setRaffles(raffles.filter(raffle => raffle.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Manage Raffles</h1>
            <div className="flex space-x-4">
              <Link to="/admin">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
              <Link to="/admin/raffles/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Raffle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                All Raffles ({filteredRaffles.length})
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search raffles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Raffle Title</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Ticket Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRaffles.map((raffle) => (
                  <TableRow key={raffle.id}>
                    <TableCell className="font-medium">{raffle.title}</TableCell>
                    <TableCell>{raffle.car}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{raffle.soldTickets}/{raffle.totalTickets}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        ${raffle.revenue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(raffle.endDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(raffle.status)}>
                        {raffle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/admin/raffles/detail/${raffle.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/raffles/edit/${raffle.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Raffle</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{raffle.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteRaffle(raffle.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

export default RaffleList;
