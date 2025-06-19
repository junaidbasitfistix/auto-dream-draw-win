
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending reset email
    setIsSubmitted(true);
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
            <Car className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">RaffleCars</h1>
          </Link>
          <p className="text-white/60 mt-2">Reset your password</p>
        </div>

        <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">
              {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
            </CardTitle>
            <CardDescription className="text-white/60">
              {isSubmitted 
                ? 'We sent a password reset link to your email address.'
                : 'Enter your email address and we\'ll send you a link to reset your password.'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full text-white border-white/20"
                >
                  Try Different Email
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/signin" className="inline-flex items-center text-blue-400 hover:underline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
