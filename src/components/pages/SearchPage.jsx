import { useState } from "react";
import { motion } from "framer-motion";
import SearchForm from "@/components/molecules/SearchForm";
import FlightResults from "@/components/organisms/FlightResults";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const SearchPage = ({ onFlightSelect }) => {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    setShowResults(true);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSearchCriteria(null);
  };

  const popularDestinations = [
    { city: "Mumbai", country: "India", price: "₹4,299", image: "🏙️" },
    { city: "Delhi", country: "India", price: "₹3,899", image: "🏛️" },
    { city: "Goa", country: "India", price: "₹5,499", image: "🏖️" },
    { city: "Bangalore", country: "India", price: "₹4,099", image: "🌆" },
    { city: "Chennai", country: "India", price: "₹3,799", image: "🏛️" },
    { city: "Kolkata", country: "India", price: "₹4,199", image: "🏛️" }
  ];

  const recentSearches = [
    { from: "Delhi", to: "Mumbai", date: "2024-01-15", price: "₹4,299" },
    { from: "Bangalore", to: "Chennai", date: "2024-01-20", price: "₹3,799" },
    { from: "Mumbai", to: "Goa", date: "2024-01-25", price: "₹5,499" }
  ];

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary via-secondary to-primary py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h1 className="text-2xl font-bold">
                  {searchCriteria?.origin} → {searchCriteria?.destination}
                </h1>
                <p className="text-blue-100 mt-1">
                  {searchCriteria?.departureDate ? new Date(searchCriteria.departureDate).toLocaleDateString() : ""}
                  {searchCriteria?.passengers && ` • ${searchCriteria.passengers} passenger${searchCriteria.passengers > 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={handleNewSearch}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center space-x-2"
              >
                <ApperIcon name="Search" className="w-4 h-4" />
                <span>New Search</span>
              </button>
            </div>
          </div>
        </div>
        
        <FlightResults 
          searchCriteria={searchCriteria} 
          onFlightSelect={onFlightSelect}
        />
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Find Your Perfect 
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Flight</span>
          </motion.h1>
<motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Compare prices, find deals, and book your next adventure with confidence
          </motion.p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

{/* Popular Destinations */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-gray-300">Discover trending destinations with great flight deals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {popularDestinations.map((destination, index) => (
              <Card
                key={destination.city}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                hover
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{destination.image}</div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-accent">{destination.price}</p>
                  </div>
</div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {destination.city}
                  </h3>
                  <p className="text-gray-300">{destination.country}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

{/* Recent Searches */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Recent Searches</h2>
            <p className="text-gray-300">Continue where you left off</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {recentSearches.map((search, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
                hover
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Clock" className="w-5 h-5 text-gray-400" />
<div>
                      <p className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        {search.from} → {search.to}
                      </p>
                      <p className="text-sm text-gray-400">{search.date}</p>
                    </div>
                  </div>
                  <p className="font-bold text-cyan-400">{search.price}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;