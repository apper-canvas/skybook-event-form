import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchForm = ({ onSearch, className }) => {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy",
    tripType: "round-trip"
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const swapCities = () => {
    setSearchData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const popularCities = [
    "New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Goa"
  ];

  return (
    <motion.div
      className={cn("bg-white rounded-xl shadow-lg p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Flight</h2>
        <p className="text-gray-600">Find the best deals on flights worldwide</p>
      </div>

      <div className="mb-4">
        <div className="flex space-x-4">
          {["round-trip", "one-way", "multi-city"].map((type) => (
            <button
              key={type}
              onClick={() => handleInputChange("tripType", type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                searchData.tripType === type
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="From"
              placeholder="Departure city"
              value={searchData.origin}
              onChange={(e) => handleInputChange("origin", e.target.value)}
              list="origin-cities"
              className="pr-10"
            />
            <datalist id="origin-cities">
              {popularCities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
            <ApperIcon name="MapPin" className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              label="To"
              placeholder="Destination city"
              value={searchData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              list="destination-cities"
              className="pr-10"
            />
            <datalist id="destination-cities">
              {popularCities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
            <ApperIcon name="MapPin" className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
            
            <button
              type="button"
              onClick={swapCities}
              className="absolute -left-4 top-9 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
            >
              <ApperIcon name="ArrowLeftRight" className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Departure Date"
            type="date"
            value={searchData.departureDate}
            onChange={(e) => handleInputChange("departureDate", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
          
          {searchData.tripType === "round-trip" && (
            <Input
              label="Return Date"
              type="date"
              value={searchData.returnDate}
              onChange={(e) => handleInputChange("returnDate", e.target.value)}
              min={searchData.departureDate || new Date().toISOString().split("T")[0]}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Passengers"
            value={searchData.passengers}
            onChange={(e) => handleInputChange("passengers", parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>{num} Passenger{num > 1 ? "s" : ""}</option>
            ))}
          </Select>

          <Select
            label="Class"
            value={searchData.class}
            onChange={(e) => handleInputChange("class", e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <ApperIcon name="Search" className="w-5 h-5 mr-2" />
          Search Flights
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchForm;