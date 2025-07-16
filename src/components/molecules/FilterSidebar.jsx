import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 50000]);
  const [selectedAirlines, setSelectedAirlines] = useState(filters.airlines || []);
  const [selectedStops, setSelectedStops] = useState(filters.stops || []);
  const [selectedTimes, setSelectedTimes] = useState(filters.departureTime || []);

  const airlines = [
    { id: "indigo", name: "IndiGo", count: 45 },
    { id: "airindia", name: "Air India", count: 32 },
    { id: "spicejet", name: "SpiceJet", count: 28 },
    { id: "vistara", name: "Vistara", count: 24 },
    { id: "goair", name: "GoAir", count: 18 },
    { id: "airasia", name: "AirAsia", count: 15 }
  ];

  const stopOptions = [
    { value: "0", label: "Non-stop", count: 42 },
    { value: "1", label: "1 Stop", count: 38 },
    { value: "2", label: "2+ Stops", count: 15 }
  ];

  const timeSlots = [
    { value: "early-morning", label: "Early Morning", time: "12 AM - 6 AM", count: 12 },
    { value: "morning", label: "Morning", time: "6 AM - 12 PM", count: 35 },
    { value: "afternoon", label: "Afternoon", time: "12 PM - 6 PM", count: 28 },
    { value: "evening", label: "Evening", time: "6 PM - 12 AM", count: 22 }
  ];

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleAirlineToggle = (airlineId) => {
    const newSelection = selectedAirlines.includes(airlineId)
      ? selectedAirlines.filter(id => id !== airlineId)
      : [...selectedAirlines, airlineId];
    
    setSelectedAirlines(newSelection);
    onFiltersChange({ ...filters, airlines: newSelection });
  };

  const handleStopToggle = (stopValue) => {
    const newSelection = selectedStops.includes(stopValue)
      ? selectedStops.filter(s => s !== stopValue)
      : [...selectedStops, stopValue];
    
    setSelectedStops(newSelection);
    onFiltersChange({ ...filters, stops: newSelection });
  };

  const handleTimeToggle = (timeValue) => {
    const newSelection = selectedTimes.includes(timeValue)
      ? selectedTimes.filter(t => t !== timeValue)
      : [...selectedTimes, timeValue];
    
    setSelectedTimes(newSelection);
    onFiltersChange({ ...filters, departureTime: newSelection });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedAirlines([]);
    setSelectedStops([]);
    setSelectedTimes([]);
    onClearFilters();
  };

  const activeFiltersCount = selectedAirlines.length + selectedStops.length + selectedTimes.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
<Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <ApperIcon name="Filter" className="w-5 h-5 mr-2" />
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="primary">{activeFiltersCount}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs text-gray-300 hover:text-white"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Price Range */}
<div className="mb-6">
          <h4 className="font-medium text-white mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
<div className="flex justify-between text-sm text-gray-300">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-6">
          <h4 className="font-medium text-white mb-3">Airlines</h4>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label key={airline.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline.id)}
                  onChange={() => handleAirlineToggle(airline.id)}
className="w-4 h-4 text-purple-500 border-gray-500 rounded focus:ring-purple-500 bg-gray-700"
                />
                <span className="flex-1 text-sm text-gray-300">{airline.name}</span>
                <span className="text-xs text-gray-500">({airline.count})</span>
              </label>
            ))}
          </div>
        </div>

{/* Stops */}
        <div className="mb-6">
          <h4 className="font-medium text-white mb-3">Stops</h4>
          <div className="space-y-2">
            {stopOptions.map((stop) => (
              <label key={stop.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedStops.includes(stop.value)}
onChange={() => handleStopToggle(stop.value)}
                  className="w-4 h-4 text-purple-500 border-gray-500 rounded focus:ring-purple-500 bg-gray-700"
                />
                <span className="flex-1 text-sm text-gray-300">{stop.label}</span>
                <span className="text-xs text-gray-500">({stop.count})</span>
              </label>
            ))}
          </div>
        </div>

{/* Departure Time */}
        <div>
          <h4 className="font-medium text-white mb-3">Departure Time</h4>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <label key={slot.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTimes.includes(slot.value)}
onChange={() => handleTimeToggle(slot.value)}
                  className="w-4 h-4 text-purple-500 border-gray-500 rounded focus:ring-purple-500 bg-gray-700"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-300">{slot.label}</div>
                  <div className="text-xs text-gray-500">{slot.time}</div>
                </div>
                <span className="text-xs text-gray-500">({slot.count})</span>
              </label>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FilterSidebar;