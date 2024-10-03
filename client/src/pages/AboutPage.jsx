import React from 'react';
import { Construction } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-primarySupp flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">About Us</h1>
        <div className="flex justify-center mb-6">
          <Construction size={64} className="text-yellow-500 animate-bounce" />
        </div>
        <p className="text-xl text-gray-700 mb-6">
          We're working hard to bring you an amazing experience!
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">Our story is still being written.</p>
          <p className="text-gray-600">Check back soon for updates!</p>
        </div>
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-indigo-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">75% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;