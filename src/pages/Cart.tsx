
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      carName: "2024 Lamborghini Huracán",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      ticketPrice: 25,
      quantity: 3,
      total: 75
    },
    {
      id: 2,
      carName: "2024 Porsche 911 Turbo S",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ticketPrice: 20,
      quantity: 2,
      total: 40
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: Math.max(1, item.quantity + change),
            total: Math.max(1, item.quantity + change) * item.ticketPrice
          }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const getTotalTickets = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to payment page...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6 text-white" />
              <span className="text-white">Continue Shopping</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="outline" size="sm" className="text-white border-white/20">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="bg-black/20 border-white/10 text-center">
              <CardContent className="py-12">
                <p className="text-white/60 text-lg mb-4">Your cart is empty</p>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Raffles
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-black/20 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.carName}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{item.carName}</h3>
                          <p className="text-blue-400">${item.ticketPrice} per ticket</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-white border-white/20 w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-white font-bold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-white border-white/20 w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">${item.total}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="bg-black/20 border-white/10 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-white">Order Summary</CardTitle>
                    <CardDescription className="text-white/60">
                      Review your raffle entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-white">
                      <span>Total Tickets:</span>
                      <span className="font-semibold">{getTotalTickets()}</span>
                    </div>
                    
                    <div className="flex justify-between text-white">
                      <span>Subtotal:</span>
                      <span className="font-semibold">${getTotalAmount()}</span>
                    </div>
                    
                    <div className="flex justify-between text-white">
                      <span>Processing Fee:</span>
                      <span className="font-semibold">$2.99</span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-white text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${getTotalAmount() + 2.99}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                    
                    <p className="text-xs text-white/60 text-center">
                      Secure payment powered by Stripe
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
