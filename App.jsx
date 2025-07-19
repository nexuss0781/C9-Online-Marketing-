import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';
import SellProduct from './components/SellProduct';
import UserProfile from './components/UserProfile';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Automotive'
  ]);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Check authentication status
  useEffect(() => {
    const user = localStorage.getItem('c9_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  // Load products
  useEffect(() => {
    const savedProducts = localStorage.getItem('c9_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with sample products
      const sampleProducts = [
        {
          id: 1,
          name: 'iPhone 14 Pro',
          price: 999,
          category: 'Electronics',
          condition: 'new',
          image: '/api/placeholder/300/300',
          seller: 'John Doe',
          location: 'New York',
          phone: '+1234567890',
          dateAdded: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Nike Air Max',
          price: 120,
          category: 'Fashion',
          condition: 'used',
          image: '/api/placeholder/300/300',
          seller: 'Jane Smith',
          location: 'Los Angeles',
          phone: '+1234567891',
          dateAdded: new Date().toISOString()
        },
        {
          id: 3,
          name: 'MacBook Pro',
          price: 1299,
          category: 'Electronics',
          condition: 'new',
          image: '/api/placeholder/300/300',
          seller: 'Mike Johnson',
          location: 'Chicago',
          phone: '+1234567892',
          dateAdded: new Date().toISOString()
        },
        {
          id: 4,
          name: 'Gaming Chair',
          price: 250,
          category: 'Home & Garden',
          condition: 'used',
          image: '/api/placeholder/300/300',
          seller: 'Sarah Wilson',
          location: 'Miami',
          phone: '+1234567893',
          dateAdded: new Date().toISOString()
        },
        {
          id: 5,
          name: 'Wireless Headphones',
          price: 199,
          category: 'Electronics',
          condition: 'new',
          image: '/api/placeholder/300/300',
          seller: 'David Brown',
          location: 'Seattle',
          phone: '+1234567894',
          dateAdded: new Date().toISOString()
        },
        {
          id: 6,
          name: 'Designer Handbag',
          price: 450,
          category: 'Fashion',
          condition: 'used',
          image: '/api/placeholder/300/300',
          seller: 'Emily Davis',
          location: 'Boston',
          phone: '+1234567895',
          dateAdded: new Date().toISOString()
        }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('c9_products', JSON.stringify(sampleProducts));
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('c9_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('c9_user');
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      seller: currentUser.fullName,
      phone: currentUser.phone,
      dateAdded: new Date().toISOString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('c9_products', JSON.stringify(updatedProducts));
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('c9_products', JSON.stringify(updatedProducts));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <LandingPage />
            } 
          />
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <AuthPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard 
                user={currentUser}
                products={products}
                categories={categories}
                onLogout={handleLogout}
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              isAuthenticated ? 
              <ProductDetail 
                products={products}
                currentUser={currentUser}
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/sell" 
            element={
              isAuthenticated ? 
              <SellProduct 
                categories={categories}
                onAddProduct={addProduct}
                user={currentUser}
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <UserProfile 
                user={currentUser}
                products={products.filter(p => p.seller === currentUser?.fullName)}
                onRemoveProduct={removeProduct}
                onLogout={handleLogout}
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/chat/:sellerId" 
            element={
              isAuthenticated ? 
              <ChatWindow 
                currentUser={currentUser}
              /> : 
              <Navigate to="/" replace />
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

