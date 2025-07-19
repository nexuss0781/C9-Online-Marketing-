import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    username: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    phone: '',
    password: ''
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!signUpData.fullName || !signUpData.username || !signUpData.phone || 
        !signUpData.email || !signUpData.address || !signUpData.password) {
      setError('All fields are required');
      return;
    }

    if (signUpData.password.length > 6) {
      setError('Password must be maximum 6 digits');
      return;
    }

    if (!/^\d+$/.test(signUpData.password)) {
      setError('Password must contain only digits');
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('c9_users') || '[]');
    if (existingUsers.find(user => user.phone === signUpData.phone)) {
      setError('Phone number already registered');
      return;
    }

    if (existingUsers.find(user => user.username === signUpData.username)) {
      setError('Username already taken');
      return;
    }

    // Save user
    const newUser = {
      ...signUpData,
      id: Date.now(),
      joinDate: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('c9_users', JSON.stringify(existingUsers));

    setSuccess('Account created successfully! Logging you in...');
    
    // Auto login after signup
    setTimeout(() => {
      onLogin(newUser);
      navigate('/dashboard');
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!loginData.phone || !loginData.password) {
      setError('Phone number and password are required');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('c9_users') || '[]');
    const user = existingUsers.find(u => u.phone === loginData.phone && u.password === loginData.password);

    if (!user) {
      setError('Invalid phone number or password');
      return;
    }

    onLogin(user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 c9-gradient-bg">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="c9-glass-effect c9-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold c9-text-gradient">C9</CardTitle>
            <CardDescription>Join the future of e-commerce</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">Phone Number</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={loginData.phone}
                      onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter 6-digit password"
                        maxLength={6}
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="bg-input border-border pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full c9-button-glow">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({...signUpData, phone: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, State"
                      value={signUpData.address}
                      onChange={(e) => setSignUpData({...signUpData, address: e.target.value})}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password (6 digits max)</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="123456"
                        maxLength={6}
                        pattern="[0-9]*"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value.replace(/\D/g, '')})}
                        className="bg-input border-border pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full c9-button-glow">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mt-4 border-destructive">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mt-4 border-green-500">
                <AlertDescription className="text-green-500">{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

