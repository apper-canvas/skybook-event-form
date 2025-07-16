import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const FlightCard = ({ flight, onSelect, onViewDetails }) => {
  const formatTime = (timeString) => {
    return format(new Date(timeString), "HH:mm");
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getAirlineIcon = (airline) => {
    const icons = {
      "IndiGo": "Plane",
      "Air India": "Plane",
      "SpiceJet": "Plane",
      "Vistara": "Plane",
      "GoAir": "Plane",
      "AirAsia": "Plane"
    };
    return icons[airline] || "Plane";
  };

  const getStopsText = (stops) => {
    if (stops === 0) return "Non-stop";
    if (stops === 1) return "1 Stop";
    return `${stops} Stops`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group" hover>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon name={getAirlineIcon(flight.airline)} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>
          <Badge variant={flight.class === "economy" ? "default" : "primary"}>
            {flight.class.charAt(0).toUpperCase() + flight.class.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(flight.departureTime)}</p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
            </div>
            
            <div className="flex-1 relative">
              <div className="flex items-center justify-center">
                <div className="w-full h-px bg-gray-300"></div>
                <div className="absolute bg-white px-2">
                  <ApperIcon name="Plane" className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="text-center mt-1">
                <p className="text-xs text-gray-500">{formatDuration(flight.duration)}</p>
                <p className="text-xs text-gray-500">{getStopsText(flight.stops)}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(flight.arrivalTime)}</p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
            </div>
          </div>
          
          <div className="text-right ml-8">
            <p className="text-3xl font-bold text-accent">₹{flight.price.toLocaleString()}</p>
            <p className="text-sm text-gray-600">per person</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Users" className="w-4 h-4" />
              <span>{flight.availableSeats} seats left</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>{formatDuration(flight.duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(flight)}
              className="group-hover:border-primary group-hover:text-primary"
            >
              View Details
            </Button>
            <Button
              onClick={() => onSelect(flight)}
              className="bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent"
            >
              Select Flight
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FlightCard;