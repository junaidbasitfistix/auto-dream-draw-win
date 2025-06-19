
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, DollarSign, Trophy, RefreshCw, Gift, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const RaffleDetail = () => {
  const { id } = useParams();
  
  // Mock raffle data - replace with actual API call
  const [raffle] = useState({
    id: 1,
    title: 'Win a BMW M3 Competition',
    car: 'BMW M3 2023',
    description: 'Experience the thrill of driving a BMW M3 Competition.',
    ticketPrice: 50,
    totalTickets: 1000,
    soldTickets: 750,
    endDate: '2024-07-15',
    status: 'Active',
    revenue: 37500,
    winner: null
  });

  // Mock ticket purchases data
  const [ticketPurchases] = useState([
    { id: 1, user: 'John Doe', email: 'john@example.com', tickets: 5, amount: 250, date: '2024-06-15', ticketNumbers: ['001', '002', '003', '004', '005'] },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', tickets: 3, amount: 150, date: '2024-06-14', ticketNumbers: ['006', '007', '008'] },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', tickets: 10, amount: 500, date: '2024-06-13', ticketNumbers: ['009', '010', '011', '012', '013', '014', '015', '016', '017', '018'] },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', tickets: 2, amount: 100, date: '2024-06-12', ticketNumbers: ['019', '020'] }
  ]);

  const [selectedWinner, setSelectedWinner] = useState<string>('');
  const [refundUser, setRefundUser] = useState<number | null>(null);

  const markAsCompleted = () => {
    console.log('Marking raffle as completed...');
    // Implement raffle completion logic
  };

  const selectWinner = () => {
    if (!selectedWinner) return;
    console.log('Selected winner:', selectedWinner);
    // Implement winner selection logic
  };

  const refundUserTickets = (userId: number) => {
    console.log('Refunding tickets for user:', userId);
    // Implement refund logic
    setRefundUser(null);
  };

  const generateRandomWinner = () => {
    const allTickets = ticketPurchases.flatMap(purchase => 
      purchase.ticketNumbers.map(ticket => ({
        ticketNumber: ticket,
        user: purchase.user,
        email: purchase.email
      }))
    );
    
    if (allTickets.length > 0) {
      const randomTicket = allTickets[Math.floor(Math.random() * allTickets.length)];
      setSelectedWinner(`${randomTicket.user} (${randomTicket.email}) - Ticket #${randomTicket.ticketNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{raffle.title}</h1>
              <p className="text-gray-600 mt-1">{raffle.car}</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/admin/raffles">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Raffles
                </Button>
              </Link>
              <Link to={`/admin/raffles/edit/${id}`}>
                <Button variant="outline">Edit Raffle</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{raffle.soldTickets}/{raffle.totalTickets}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${raffle.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${raffle.ticketPrice} per ticket
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge className={raffle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                {raffle.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Ends: {new Date(raffle.endDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ticketPurchases.length}</div>
              <p className="text-xs text-muted-foreground">
                Unique buyers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {raffle.status === 'Active' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Complete Raffle</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to mark this raffle as completed? This will stop ticket sales.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={markAsCompleted}>
                        Complete Raffle
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Gift className="h-4 w-4 mr-2" />
                    Select Winner
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Winner</DialogTitle>
                    <DialogDescription>
                      Choose a winner for this raffle. You can select manually or generate randomly.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Selected Winner:</label>
                      <input
                        type="text"
                        value={selectedWinner}
                        onChange={(e) => setSelectedWinner(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Enter winner details or use random selection"
                      />
                    </div>
                    <Button onClick={generateRandomWinner} variant="outline" className="w-full">
                      Generate Random Winner
                    </Button>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedWinner('')}>
                      Cancel
                    </Button>
                    <Button onClick={selectWinner} disabled={!selectedWinner}>
                      Confirm Winner
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Purchases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Ticket Numbers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">{purchase.user}</TableCell>
                    <TableCell>{purchase.email}</TableCell>
                    <TableCell>{purchase.tickets}</TableCell>
                    <TableCell>${purchase.amount}</TableCell>
                    <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {purchase.ticketNumbers.slice(0, 3).map(ticket => (
                          <Badge key={ticket} variant="outline" className="text-xs">
                            #{ticket}
                          </Badge>
                        ))}
                        {purchase.ticketNumbers.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{purchase.ticketNumbers.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-800">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Refund
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Refund Tickets</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to refund ${purchase.amount} to {purchase.user}? 
                              This will remove their {purchase.tickets} tickets from the raffle.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => refundUserTickets(purchase.id)}
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              Process Refund
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default RaffleDetail;
