import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchForm from "@/components/molecules/SearchForm";
import FlightResults from "@/components/organisms/FlightResults";
import FlightCard from "@/components/molecules/FlightCard";
import FlightStatusWidget from "@/components/molecules/FlightStatusWidget";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { flightService } from "@/services/api/flightService";

const FlightsPage = ({ onFlightSelect, onSearch }) => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [allFlights, setAllFlights] = useState([]);
  const [featuredFlights, setFeaturedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flightStatus, setFlightStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusFlightNumber, setStatusFlightNumber] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allFlights, filterBy, sortBy]);

  const loadFlights = async () => {
    try {
      setLoading(true);
      setError("");
      const flights = await flightService.getAllFlights();
      setAllFlights(flights);
      
      // Set featured flights (lowest prices per route)
      const routeMap = new Map();
      flights.forEach(flight => {
        const route = `${flight.origin}-${flight.destination}`;
        if (!routeMap.has(route) || flight.price < routeMap.get(route).price) {
          routeMap.set(route, flight);
        }
      });
      setFeaturedFlights(Array.from(routeMap.values()).slice(0, 6));
      
      toast.success(`Loaded ${flights.length} flights`);
    } catch (err) {
      setError("Failed to load flights. Please try again.");
      toast.error("Failed to load flights");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allFlights];

    // Apply filter
    if (filterBy !== "all") {
      switch (filterBy) {
        case "economy":
          filtered = filtered.filter(flight => flight.class === "economy");
          break;
        case "business":
          filtered = filtered.filter(flight => flight.class === "business");
          break;
        case "non-stop":
          filtered = filtered.filter(flight => flight.stops === 0);
          break;
        case "morning":
          filtered = filtered.filter(flight => {
            const hour = new Date(flight.departureTime).getHours();
            return hour >= 6 && hour < 12;
          });
          break;
        case "cheap":
          filtered = filtered.filter(flight => flight.price < 4000);
          break;
      }
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
        case "airline":
          return a.airline.localeCompare(b.airline);
        default:
          return 0;
      }
    });

    setFeaturedFlights(filtered.slice(0, 6));
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    setShowResults(true);
    onSearch && onSearch(criteria);
  };

  const handleFlightSelect = (flight) => {
    onFlightSelect(flight);
    navigate('/booking');
    toast.success(`Flight ${flight.flightNumber} selected for booking`);
  };

  const handleViewDetails = (flight) => {
    toast.info(`Viewing details for flight ${flight.flightNumber}`);
  };

  const handleCheckStatus = async () => {
    if (!statusFlightNumber.trim()) {
      toast.warning("Please enter a flight number");
      return;
    }

    try {
      setStatusLoading(true);
      const status = await flightService.getFlightStatus(statusFlightNumber.toUpperCase());
      setFlightStatus(status);
      toast.success("Flight status updated");
    } catch (err) {
      toast.error("Failed to get flight status");
    } finally {
      setStatusLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "on-time": return "success";
      case "delayed": return "warning";
      case "cancelled": return "destructive";
      case "boarding": return "primary";
      case "departed": return "secondary";
      case "arrived": return "success";
      default: return "default";
    }
  };

  const filterOptions = [
    { value: "all", label: "All Flights" },
    { value: "economy", label: "Economy Class" },
    { value: "business", label: "Business Class" },
    { value: "non-stop", label: "Non-stop Only" },
    { value: "morning", label: "Morning Departures" },
    { value: "cheap", label: "Under ₹4,000" }
  ];

  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "duration", label: "Duration: Shortest First" },
    { value: "departure", label: "Departure Time" },
    { value: "airline", label: "Airline Name" }
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
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </div>
          </div>
        </div>
        
        <FlightResults 
          searchCriteria={searchCriteria} 
          onFlightSelect={handleFlightSelect}
        />
      </div>
    );
  }

  if (loading) {
    return <Loading type="flights" />;
  }

  if (error) {
    return <Error title="Loading Failed" message={error} onRetry={loadFlights} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Explore 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Flights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the best flight deals and book your next journey
            </p>
          </motion.div>

          {/* Quick Search */}
          <div className="max-w-4xl mx-auto mb-16">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Flight Status Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flight Status</h3>
                <p className="text-gray-600">Check real-time status of any flight</p>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <Input
                  placeholder="Enter flight number (e.g., 6E-2345)"
                  value={statusFlightNumber}
                  onChange={(e) => setStatusFlightNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCheckStatus()}
                  className="flex-1"
                />
                <Button
                  onClick={handleCheckStatus}
                  disabled={statusLoading}
                  className="px-6"
                >
                  {statusLoading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Search" className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {flightStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{flightStatus.flightNumber}</h4>
                    <Badge variant={getStatusBadgeVariant(flightStatus.status)}>
                      {flightStatus.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Gate</p>
                      <p className="font-medium">{flightStatus.gate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Terminal</p>
                      <p className="font-medium">{flightStatus.terminal}</p>
                    </div>
                    {flightStatus.delayMinutes > 0 && (
                      <div>
                        <p className="text-gray-500">Delay</p>
                        <p className="font-medium text-warning">{flightStatus.delayMinutes} min</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Featured Flights */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Flights</h2>
              <p className="text-gray-600">Best deals and popular routes</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
              <Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full sm:w-48"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {featuredFlights.map((flight, index) => (
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
            ))}
          </motion.div>

          {featuredFlights.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Plane" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or check back later</p>
              <Button onClick={() => setFilterBy("all")}>Clear Filters</Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => handleSearch({ origin: "", destination: "", departureDate: "", passengers: 1, class: "economy", tripType: "round-trip" })}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
            >
              <ApperIcon name="Search" className="w-5 h-5 mr-2" />
              Search All Flights
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white"
          >
            <div>
              <p className="text-4xl font-bold mb-2">{allFlights.length}</p>
              <p className="text-blue-100">Available Flights</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{new Set(allFlights.map(f => f.airline)).size}</p>
              <p className="text-blue-100">Airlines</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{new Set(allFlights.map(f => f.origin)).size}</p>
              <p className="text-blue-100">Destinations</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">₹{Math.min(...allFlights.map(f => f.price)).toLocaleString()}</p>
              <p className="text-blue-100">Lowest Price</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;