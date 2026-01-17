import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Pill, User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'customer' | 'pharmacist') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<'customer' | 'pharmacist'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Digital Pharmacy System</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label>Login As</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'customer' ? 'default' : 'outline'}
                  onClick={() => setRole('customer')}
                  className="w-full"
                >
                  <User className="w-4 h-4 mr-2" />
                  Customer
                </Button>
                <Button
                  type="button"
                  variant={role === 'pharmacist' ? 'default' : 'outline'}
                  onClick={() => setRole('pharmacist')}
                  className="w-full"
                >
                  <Pill className="w-4 h-4 mr-2" />
                  Pharmacist
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Sign In
            </Button>

            <div className="text-sm text-center text-gray-600">
              Demo credentials: any email/password
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
