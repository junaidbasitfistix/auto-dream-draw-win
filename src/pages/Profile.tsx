
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, User, Settings, ShoppingCart, Trophy, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA 12345'
  });

  const orderHistory = [
    {
      id: 1,
      carName: "2024 Lamborghini Huracán",
      tickets: 5,
      amount: 125,
      date: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      carName: "2024 Porsche 911 Turbo S",
      tickets: 3,
      amount: 60,
      date: "2024-01-10",
      status: "Completed"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6 text-white" />
              <span className="text-white">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">My Profile</h1>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="text-white border-white/20"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-black/20 border-white/10">
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-blue-600">
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-white data-[state=active]:bg-blue-600">
                Order History
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-blue-600">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                    />
                  </div>
                  
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Order History
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    View your past raffle entries and current active tickets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold">{order.carName}</h3>
                          <Badge 
                            className={order.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/60">Tickets:</span>
                            <p className="text-white">{order.tickets}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Amount:</span>
                            <p className="text-white">${order.amount}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Date:</span>
                            <p className="text-white">{order.date}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Order ID:</span>
                            <p className="text-white">#{order.id.toString().padStart(6, '0')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your account preferences and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Email notifications</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">SMS notifications</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Marketing emails</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Security</h3>
                    <Button variant="outline" className="text-white border-white/20">
                      Change Password
                    </Button>
                    <Button variant="outline" className="text-white border-white/20">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Account Actions</h3>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
