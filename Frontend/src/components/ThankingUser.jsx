import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankingUser = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
        <div className="mb-6">
          <CheckCircle className="mx-auto text-green-500" size={80} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <h2 className="text-xl text-gray-600 mb-6">Your feedback has been submitted</h2>
        
        <p className="text-gray-700 mb-8">
          We appreciate you taking the time to share your experience with us. 
          Your feedback helps us improve our service for everyone.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <p className="font-medium text-gray-800 mb-1">We hope you enjoyed your ride!</p>
          <p className="text-gray-600">Looking forward to serving you again soon.</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <span className="text-amber-500 text-xl">★</span>
            </div>
            <span className="text-sm text-gray-600">Top Rated</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <span className="text-green-500 text-xl">♥</span>
            </div>
            <span className="text-sm text-gray-600">Reliable</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-blue-500 text-xl">✓</span>
            </div>
            <span className="text-sm text-gray-600">Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankingUser;