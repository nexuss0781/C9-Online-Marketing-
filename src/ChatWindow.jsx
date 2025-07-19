import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video,
  MoreVertical,
  User,
  MessageCircle
} from 'lucide-react';

const ChatWindow = ({ currentUser }) => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Sample messages for demonstration
  useEffect(() => {
    const sampleMessages = [
      {
        id: 1,
        sender: sellerId,
        content: "Hi! I see you're interested in my iPhone 14 Pro. It's in excellent condition!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'received'
      },
      {
        id: 2,
        sender: currentUser.fullName,
        content: "Hello! Yes, I'm very interested. Can you tell me more about the battery health?",
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        type: 'sent'
      },
      {
        id: 3,
        sender: sellerId,
        content: "The battery health is at 95%. I've only had it for 6 months and always used a case and screen protector.",
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        type: 'received'
      },
      {
        id: 4,
        sender: currentUser.fullName,
        content: "That sounds great! Would you be willing to meet somewhere public for the exchange?",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'sent'
      },
      {
        id: 5,
        sender: sellerId,
        content: "Absolutely! How about the Starbucks on Main Street? I'm available this weekend.",
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        type: 'received'
      }
    ];
    setMessages(sampleMessages);
  }, [sellerId, currentUser.fullName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser.fullName,
      content: message,
      timestamp: new Date().toISOString(),
      type: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Let me get back to you on that.",
        "That sounds good to me!",
        "I'll check and let you know.",
        "Perfect! Looking forward to it.",
        "Sure, that works for me."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: Date.now() + 1,
        sender: sellerId,
        content: randomResponse,
        timestamp: new Date().toISOString(),
        type: 'received'
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">{sellerId}</h2>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Card className="h-full bg-card border-border flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with {sellerId}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Container */}
            <div className="flex-1 c9-chat-container p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-xs lg:max-w-md">
                    <div
                      className={`c9-message-bubble ${
                        msg.type === 'sent' ? 'c9-message-sent' : 'c9-message-received'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-input border-border"
                />
                <Button type="submit" className="c9-button-glow">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto w-full px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("Is this item still available?")}
          >
            Is this still available?
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("Can we meet to complete the transaction?")}
          >
            Let's meet up
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("Would you consider a lower price?")}
          >
            Negotiate price
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMessage("Thank you for the quick response!")}
          >
            Thank you
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

