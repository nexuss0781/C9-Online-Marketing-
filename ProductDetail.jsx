import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Calendar,
  ShoppingBag,
  User
} from 'lucide-react';

const ProductDetail = ({ products, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setCartAdded(true);
    setShowContactInfo(true);
    
    // Simulate notification to seller
    setTimeout(() => {
      alert(`Notification sent to ${product.seller}! They will respond soon.`);
    }, 1000);
  };

  const handleContactSeller = () => {
    navigate(`/chat/${product.seller}`);
  };

  const isOwnProduct = product.seller === currentUser?.fullName;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Link to="/dashboard" className="text-2xl font-bold c9-text-gradient">
              C9
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="c9-fade-in">
            <Card className="overflow-hidden bg-card border-border">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <ShoppingBag className="w-32 h-32 text-muted-foreground" />
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6 c9-slide-in">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant={product.condition === 'new' ? 'default' : 'outline'}>
                  {product.condition}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="text-4xl font-bold text-primary mb-6">
                ${product.price}
              </div>
            </div>

            {/* Seller Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium">{product.seller}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {product.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Listed {new Date(product.dateAdded).toLocaleDateString()}
                </div>
                {showContactInfo && (
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {product.phone}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {!isOwnProduct && (
              <div className="space-y-4">
                {!cartAdded ? (
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full c9-button-glow text-lg py-6"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <Alert className="border-green-500">
                    <AlertDescription className="text-green-500">
                      ✓ Interest sent to seller! They will contact you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {showContactInfo && (
                  <Button 
                    onClick={handleContactSeller}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Seller
                  </Button>
                )}
              </div>
            )}

            {isOwnProduct && (
              <Alert>
                <AlertDescription>
                  This is your own product listing.
                </AlertDescription>
              </Alert>
            )}

            {/* Product Description */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Condition:</span>
                    <span className="capitalize">{product.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{product.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed:</span>
                    <span>{new Date(product.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="c9-card-hover bg-card border-border overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">${relatedProduct.price}</span>
                      <Link to={`/product/${relatedProduct.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;

