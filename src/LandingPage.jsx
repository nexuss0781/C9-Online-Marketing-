import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  ShoppingBag, 
  MessageCircle, 
  Shield, 
  Zap, 
  Users, 
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Easy Trading",
      description: "Buy and sell products with just a few clicks. Our intuitive interface makes trading effortless."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Connect instantly with buyers and sellers through our integrated messaging system."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your transactions are protected with advanced security measures and fraud prevention."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with real-time updates and instant notifications."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join a thriving community of buyers and sellers from around the world."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Every product is verified and rated by our community for your peace of mind."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "C9 has revolutionized how I buy and sell online. The interface is beautiful and so easy to use!"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "The real-time chat feature is amazing. I can negotiate prices instantly with sellers."
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "I've sold over 50 items on C9. The platform is reliable and the community is fantastic."
    },
    {
      name: "David Thompson",
      rating: 5,
      comment: "Best marketplace I've ever used. Clean design, fast performance, and great features."
    }
  ];

  const socialIcons = [
    { icon: <Facebook className="w-6 h-6" />, name: "Facebook" },
    { icon: <Twitter className="w-6 h-6" />, name: "Twitter" },
    { icon: <Instagram className="w-6 h-6" />, name: "Instagram" },
    { icon: <Youtube className="w-6 h-6" />, name: "YouTube" },
    { icon: <Linkedin className="w-6 h-6" />, name: "LinkedIn" },
    { icon: <Github className="w-6 h-6" />, name: "GitHub" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/backgrounds/landing_bg.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 c9-hero-gradient"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="c9-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Welcome to <span className="c9-text-gradient">C9</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The modern marketplace where buyers and sellers connect seamlessly. 
              Experience the future of e-commerce with our beautiful, fast, and secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="c9-button-glow text-lg px-8 py-4">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 c9-slide-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="c9-text-gradient">C9</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the features that make C9 the most advanced and user-friendly marketplace platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="c9-card-hover bg-card border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users who love C9
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="c9-card-hover bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href="#"
                className="p-3 bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 c9-card-hover"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold c9-text-gradient mb-4">C9</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The future of e-commerce is here. Join C9 and experience the most advanced marketplace platform.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 C9 Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

