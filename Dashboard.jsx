import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  Plus, 
  User, 
  LogOut, 
  Filter,
  SortAsc,
  SortDesc,
  MessageCircle,
  Bell,
  ShoppingBag,
  Grid3X3,
  List
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Dashboard = ({ user, products, categories, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [showAllProducts, setShowAllProducts] = useState({});

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
        default:
          comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped = {};
    categories.forEach(category => {
      grouped[category] = filteredProducts.filter(p => p.category === category);
    });
    return grouped;
  }, [filteredProducts, categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleShowAll = (category) => {
    setShowAllProducts(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getDisplayedProducts = (category) => {
    const categoryProducts = productsByCategory[category] || [];
    if (showAllProducts[category] || selectedCategory !== 'All') {
      return categoryProducts;
    }
    return categoryProducts.slice(0, 10);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="text-2xl font-bold c9-text-gradient">
              C9
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products or sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              </Button>
              
              <Link to="/sell">
                <Button className="c9-button-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/chat/general')}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 c9-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.fullName}!
          </h1>
          <p className="text-muted-foreground">
            Discover amazing products from our community marketplace
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Filter */}
          <div className="c9-category-scroll">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => handleCategoryClick('All')}
              className="whitespace-nowrap"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryClick(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                  Date Added
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price')}>
                  Price
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  Name
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Products Display */}
        {selectedCategory === 'All' ? (
          // Category-wise display
          <div className="space-y-12">
            {categories.map(category => {
              const categoryProducts = getDisplayedProducts(category);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category} className="c9-slide-in">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{category}</h2>
                    {productsByCategory[category]?.length > 10 && (
                      <Button
                        variant="outline"
                        onClick={() => toggleShowAll(category)}
                      >
                        {showAllProducts[category] ? 'Show Less' : `Show All (${productsByCategory[category].length})`}
                      </Button>
                    )}
                  </div>
                  <div className={viewMode === 'grid' ? 'c9-product-grid' : 'space-y-4'}>
                    {categoryProducts.map(product => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Single category display
          <div className="c9-fade-in">
            <h2 className="text-2xl font-bold mb-6">{selectedCategory}</h2>
            <div className={viewMode === 'grid' ? 'c9-product-grid' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </div>
        )}

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Link to="/sell">
              <Button className="c9-button-glow">
                <Plus className="w-4 h-4 mr-2" />
                Be the first to sell in this category
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Card className="c9-card-hover bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">by {product.seller}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant={product.condition === 'new' ? 'default' : 'outline'}>
                  {product.condition}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${product.price}</div>
              <Link to={`/product/${product.id}`}>
                <Button size="sm" className="mt-2">View Details</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="c9-card-hover bg-card border-border overflow-hidden">
      <div className="aspect-square bg-muted flex items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
          <Badge variant={product.condition === 'new' ? 'default' : 'outline'} className="text-xs">
            {product.condition}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">by {product.seller}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          <Link to={`/product/${product.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;

