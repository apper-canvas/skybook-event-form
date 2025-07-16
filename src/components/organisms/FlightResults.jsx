import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FlightCard from "@/components/molecules/FlightCard";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import { flightService } from "@/services/api/flightService";

const FlightResults = ({ searchCriteria, onFlightSelect }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    airlines: [],
    stops: [],
    departureTime: []
  });
  const [sortBy, setSortBy] = useState("price-low");

  useEffect(() => {
    if (searchCriteria) {
      searchFlights();
    }
  }, [searchCriteria]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [flights, filters, sortBy]);

  const searchFlights = async () => {
    setLoading(true);
    setError("");
    
    try {
      const results = await flightService.searchFlights(searchCriteria);
      setFlights(results);
      toast.success(`Found ${results.length} flights for your search`);
    } catch (err) {
      setError("Failed to search flights. Please try again.");
      toast.error("Failed to search flights");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...flights];

    // Apply price filter
    filtered = filtered.filter(flight => 
      flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1]
    );

    // Apply airline filter
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight => 
        filters.airlines.some(airline => 
          flight.airline.toLowerCase().includes(airline.toLowerCase())
        )
      );
    }

    // Apply stops filter
    if (filters.stops.length > 0) {
      filtered = filtered.filter(flight => 
        filters.stops.includes(flight.stops.toString())
      );
    }

    // Apply departure time filter
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter(flight => {
        const hour = new Date(flight.departureTime).getHours();
        return filters.departureTime.some(timeSlot => {
          switch (timeSlot) {
            case "early-morning": return hour >= 0 && hour < 6;
            case "morning": return hour >= 6 && hour < 12;
            case "afternoon": return hour >= 12 && hour < 18;
            case "evening": return hour >= 18 && hour < 24;
            default: return false;
          }
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "duration":
          return a.duration - b.duration;
        case "departure":
          return new Date(a.departureTime) - new Date(b.departureTime);
        case "arrival":
          return new Date(a.arrivalTime) - new Date(b.arrivalTime);
        default:
          return 0;
      }
    });

    setFilteredFlights(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 50000],
      airlines: [],
      stops: [],
      departureTime: []
    });
  };

  const handleFlightSelect = (flight) => {
    onFlightSelect(flight);
    toast.success(`Flight ${flight.flightNumber} selected`);
  };

  const handleViewDetails = (flight) => {
    toast.info(`Viewing details for flight ${flight.flightNumber}`);
  };

  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "duration", label: "Duration: Shortest First" },
    { value: "departure", label: "Departure: Earliest First" },
    { value: "arrival", label: "Arrival: Earliest First" }
  ];

  if (loading) {
    return <Loading type="flights" />;
  }

  if (error) {
    return <Error title="Search Failed" message={error} onRetry={searchFlights} />;
  }

  if (flights.length === 0 && !loading) {
    return (
      <Empty
        title="No flights found"
        message="We couldn't find any flights for your search criteria. Try adjusting your dates or destinations."
        actionText="Modify Search"
        icon="Plane"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {searchCriteria?.origin} → {searchCriteria?.destination}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredFlights.length} flights found
                {searchCriteria?.departureDate && (
                  <span className="ml-2">
                    • {new Date(searchCriteria.departureDate).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={searchFlights}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          {/* Flight Cards */}
          <div className="space-y-4">
            {filteredFlights.length === 0 ? (
              <Empty
                title="No flights match your filters"
                message="Try adjusting your filter criteria to see more results."
                actionText="Clear Filters"
                onAction={handleClearFilters}
                icon="Filter"
              />
            ) : (
              filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FlightCard
                    flight={flight}
                    onSelect={handleFlightSelect}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;