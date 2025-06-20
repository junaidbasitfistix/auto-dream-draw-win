
import { Link } from 'react-router-dom';
import { Car, Trophy, Users, ShoppingCart, Plus, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Mock data - replace with real data from your backend
  const stats = {
    totalCars: 25,
    activeRaffles: 8,
    totalUsers: 1234,
    totalRevenue: 45600,
    thisMonthRevenue: 12800,
    pendingPayouts: 8900,
    completedRaffles: 15
  };

  const recentActivity = [
    { id: 1, action: 'New car added: BMW M3', time: '2 hours ago', type: 'car' },
    { id: 2, action: 'Raffle completed: Mercedes C-Class', time: '4 hours ago', type: 'raffle' },
    { id: 3, action: 'User purchased 5 tickets', time: '6 hours ago', type: 'ticket' },
    { id: 4, action: 'Winner selected for Audi A4', time: '1 day ago', type: 'winner' }
  ];

  const quickActions = [
    { title: 'Add New Car', icon: Car, path: '/admin/cars/new', color: 'bg-blue-600' },
    { title: 'Create Raffle', icon: Trophy, path: '/admin/raffles/new', color: 'bg-green-600' },
    { title: 'Manage Cars', icon: Car, path: '/admin/cars', color: 'bg-purple-600' },
    { title: 'Manage Raffles', icon: Trophy, path: '/admin/raffles', color: 'bg-orange-600' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your car raffles.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Raffles</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRaffles}</div>
            <p className="text-xs text-blue-600">
              {stats.completedRaffles} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +89 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">
              ${stats.thisMonthRevenue.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue breakdown for current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ticket Sales</span>
                <span className="font-semibold">${stats.thisMonthRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Payouts</span>
                <span className="font-semibold text-orange-600">-${stats.pendingPayouts.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Net Revenue</span>
                  <span className="font-bold text-green-600">
                    ${(stats.thisMonthRevenue - stats.pendingPayouts).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path}>
                  <Button 
                    variant="outline" 
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="text-xs text-center">{action.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'car' ? 'bg-blue-500' :
                    activity.type === 'raffle' ? 'bg-green-500' :
                    activity.type === 'ticket' ? 'bg-purple-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm">{activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
