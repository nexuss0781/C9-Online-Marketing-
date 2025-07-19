import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        {/* C9 Loading Circle */}
        <div className="relative mb-8">
          <div className="c9-loading-circle mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold c9-text-gradient">C9</div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-xl text-muted-foreground c9-pulse">
          Loading your marketplace...
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

