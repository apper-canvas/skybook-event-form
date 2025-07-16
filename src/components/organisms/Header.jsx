import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Search", href: "/", icon: "Search" },
    { name: "My Bookings", href: "/bookings", icon: "Calendar" },
    { name: "Deals", href: "/deals", icon: "Tag" },
    { name: "Support", href: "/support", icon: "HelpCircle" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Plane" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkyBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100",
                  isActive(item.href) 
                    ? "text-primary bg-blue-50" 
                    : "text-gray-700 hover:text-primary"
                )}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
              EN
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="IndianRupee" className="w-4 h-4 mr-2" />
              INR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    isActive(item.href) 
                      ? "text-primary bg-blue-50" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-4 px-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                  EN
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ApperIcon name="IndianRupee" className="w-4 h-4 mr-2" />
                  INR
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;