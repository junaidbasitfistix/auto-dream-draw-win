
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Car, DollarSign, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CarList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    value: '',
    description: '',
    engine: '',
    horsepower: '',
    transmission: '',
    fuelType: '',
    color: '',
    images: []
  });

  // Mock cars data
  const cars = [
    {
      id: 1,
      name: 'BMW M3 Competition',
      brand: 'BMW',
      model: 'M3',
      year: 2023,
      value: 85000,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      status: 'Available',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Ferrari F8 Tributo',
      brand: 'Ferrari',
      model: 'F8 Tributo',
      year: 2023,
      value: 280000,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      status: 'In Raffle',
      addedDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Porsche 911 Turbo S',
      brand: 'Porsche',
      model: '911 Turbo S',
      year: 2024,
      value: 220000,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      status: 'Won',
      addedDate: '2024-01-05'
    }
  ];

  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.status === 'Available').length;
  const totalValue = cars.reduce((sum, c) => sum + c.value, 0);

  const handleAddCar = () => {
    console.log('Adding new car:', newCar);
    setIsAddDialogOpen(false);
    setNewCar({
      name: '',
      brand: '',
      model: '',
      year: '',
      value: '',
      description: '',
      engine: '',
      horsepower: '',
      transmission: '',
      fuelType: '',
      color: '',
      images: []
    });
  };

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Car Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
              <DialogDescription>
                Add a new car to the inventory
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  value={newCar.name}
                  onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                  placeholder="2024 BMW M3 Competition"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={newCar.brand} onValueChange={(value) => setNewCar({...newCar, brand: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Ferrari">Ferrari</SelectItem>
                      <SelectItem value="Porsche">Porsche</SelectItem>
                      <SelectItem value="Lamborghini">Lamborghini</SelectItem>
                      <SelectItem value="McLaren">McLaren</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                      <SelectItem value="Audi">Audi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                    placeholder="M3 Competition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <Label htmlFor="value">Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCar.value}
                    onChange={(e) => setNewCar({...newCar, value: e.target.value})}
                    placeholder="85000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCar.description}
                  onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                  placeholder="Enter car description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="engine">Engine</Label>
                  <Input
                    id="engine"
                    value={newCar.engine}
                    onChange={(e) => setNewCar({...newCar, engine: e.target.value})}
                    placeholder="3.0L Twin-Turbo I6"
                  />
                </div>
                <div>
                  <Label htmlFor="horsepower">Horsepower</Label>
                  <Input
                    id="horsepower"
                    value={newCar.horsepower}
                    onChange={(e) => setNewCar({...newCar, horsepower: e.target.value})}
                    placeholder="503 HP"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select value={newCar.transmission} onValueChange={(value) => setNewCar({...newCar, transmission: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                      <SelectItem value="Dual-Clutch">Dual-Clutch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={newCar.fuelType} onValueChange={(value) => setNewCar({...newCar, fuelType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gasoline">Gasoline</SelectItem>
                      <SelectItem value="Premium Gasoline">Premium Gasoline</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={newCar.color}
                  onChange={(e) => setNewCar({...newCar, color: e.target.value})}
                  placeholder="Alpine White"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCar}>
                Add Car
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCars}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCars}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Cars Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cars</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Car Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>${car.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        car.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        car.status === 'In Raffle' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(car.addedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link to={`/admin/cars/edit/${car.id}`}>
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

export default CarList;
