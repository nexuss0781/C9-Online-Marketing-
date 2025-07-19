import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  ShoppingBag,
  Edit,
  Trash2,
  LogOut,
  Settings,
  DollarSign
} from 'lucide-react';

const UserProfile = ({ user, products, onRemoveProduct, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const userProducts = products || [];
  const totalEarnings = userProducts.reduce((sum, product) => sum + product.price, 0);

  const handleRemoveProduct = (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      onRemoveProduct(productId);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Link to="/dashboard" className="text-2xl font-bold c9-text-gradient">
              C9
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="c9-fade-in">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{user.fullName}</h2>
                          <p className="text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{user.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Button className="mt-4">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6 text-center">
                      <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userProducts.length}</div>
                      <div className="text-muted-foreground">Products Listed</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">${totalEarnings}</div>
                      <div className="text-muted-foreground">Total Value</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Products</h2>
                <Link to="/sell">
                  <Button className="c9-button-glow">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>

              {userProducts.length === 0 ? (
                <Card className="bg-card border-border">
                  <CardContent className="p-12 text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No products listed</h3>
                    <p className="text-muted-foreground mb-4">
                      Start selling by listing your first product
                    </p>
                    <Link to="/sell">
                      <Button className="c9-button-glow">
                        List Your First Product
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProducts.map(product => (
                    <Card key={product.id} className="c9-card-hover bg-card border-border overflow-hidden">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                          <Badge variant={product.condition === 'new' ? 'default' : 'outline'} className="text-xs">
                            {product.condition}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{product.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">${product.price}</span>
                          <div className="flex space-x-2">
                            <Link to={`/product/${product.id}`}>
                              <Button size="sm" variant="outline">View</Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRemoveProduct(product.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {userProducts.slice(0, 5).map(product => (
                      <div key={product.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div>
                          <p className="font-medium">Listed "{product.name}"</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(product.dateAdded).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">Listed</Badge>
                      </div>
                    ))}
                    {userProducts.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        No recent activity
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Privacy Settings</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Language</span>
                      <Button variant="outline" size="sm">English</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Payment & Banking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Bank Account</span>
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Methods</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Balance</span>
                      <span className="font-bold">$0.00</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

