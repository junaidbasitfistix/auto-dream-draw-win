
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const orderSummary = {
    items: [
      { name: "2024 Lamborghini Huracán", tickets: 3, price: 75 },
      { name: "2024 Porsche 911 Turbo S", tickets: 2, price: 40 }
    ],
    subtotal: 115,
    processingFee: 2.99,
    total: 117.99
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Processing",
      description: "Your payment is being processed. Please wait...",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Your raffle entries have been confirmed. Good luck!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center space-x-2">
              <ArrowLeft className="w-6 h-6 text-white" />
              <span className="text-white">Back to Cart</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">RaffleCars</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Enter your payment details to complete your purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName" className="text-white">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-white">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Billing Address</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress" className="text-white">Address</Label>
                        <Input
                          id="billingAddress"
                          name="billingAddress"
                          value={paymentData.billingAddress}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="123 Main Street"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-white">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={paymentData.city}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode" className="text-white">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={paymentData.zipCode}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Payment - ${orderSummary.total}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-black/20 border-white/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                  <CardDescription className="text-white/60">
                    Review your final order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/60 text-sm">{item.tickets} tickets</p>
                      </div>
                      <p className="text-white font-semibold">${item.price}</p>
                    </div>
                  ))}
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-white">
                      <span>Subtotal:</span>
                      <span>${orderSummary.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Processing Fee:</span>
                      <span>${orderSummary.processingFee}</span>
                    </div>
                    <div className="flex justify-between text-white text-lg font-bold border-t border-white/10 pt-2">
                      <span>Total:</span>
                      <span>${orderSummary.total}</span>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-white/60 text-xs mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
