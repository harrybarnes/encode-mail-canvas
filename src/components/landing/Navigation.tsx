import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-xl font-bold text-gray-900">InboxIntel</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Docs
          </a>
          <Link to="/auth?mode=signin" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Login
          </Link>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
            <Link to="/auth?mode=signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
