import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const BookingSummary = ({ flight, passengers, contactInfo, onConfirmBooking, onBack }) => {
  const formatTime = (timeString) => {
    return format(new Date(timeString), "HH:mm");
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStopsText = (stops) => {
    if (stops === 0) return "Non-stop";
    if (stops === 1) return "1 Stop";
    return `${stops} Stops`;
  };

  const basePrice = flight.price;
  const taxes = Math.round(basePrice * 0.18);
  const fees = 199;
  const totalPrice = (basePrice + taxes + fees) * passengers.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flight Details */}
        <div className="lg:col-span-2 space-y-6">
<Card className="p-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Plane" className="w-5 h-5 mr-2" />
              Flight Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
<div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="Plane" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{flight.airline}</h4>
                    <p className="text-sm text-gray-400">{flight.flightNumber}</p>
                  </div>
                </div>
                <Badge variant="primary">{flight.class}</Badge>
              </div>

<div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{formatTime(flight.departureTime)}</p>
                    <p className="text-sm text-gray-300">{flight.origin}</p>
                    <p className="text-xs text-gray-400">{formatDate(flight.departureTime)}</p>
                  </div>
                  
                  <div className="flex-1 relative mx-8">
                    <div className="flex items-center justify-center">
                      <div className="w-full h-px bg-gray-300"></div>
                      <div className="absolute bg-gray-50 px-2">
                        <ApperIcon name="Plane" className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="text-center mt-1">
                      <p className="text-xs text-gray-500">{formatDuration(flight.duration)}</p>
                      <p className="text-xs text-gray-500">{getStopsText(flight.stops)}</p>
                    </div>
                  </div>
                  
<div className="text-center">
                    <p className="text-2xl font-bold text-white">{formatTime(flight.arrivalTime)}</p>
                    <p className="text-sm text-gray-300">{flight.destination}</p>
                    <p className="text-xs text-gray-400">{formatDate(flight.arrivalTime)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Passenger Details */}
<Card className="p-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Users" className="w-5 h-5 mr-2" />
              Passenger Details
            </h3>
            
            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {passenger.gender} • {passenger.nationality}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Passenger {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
<Card className="p-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Mail" className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{contactInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{contactInfo.phone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
<Card className="p-6 sticky top-6 bg-gray-800 border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ApperIcon name="Receipt" className="w-5 h-5 mr-2" />
              Price Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price × {passengers.length}</span>
                <span className="font-medium">₹{(basePrice * passengers.length).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium">₹{(taxes * passengers.length).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Booking Fee</span>
                <span className="font-medium">₹{fees}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
<span className="text-2xl font-bold text-cyan-400">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
<Button
                onClick={onConfirmBooking}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white py-3"
              >
                <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                Confirm & Pay
              </Button>
              
              <Button
                variant="outline"
                onClick={onBack}
                className="w-full"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                Back to Details
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Secure payment with SSL encryption</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSummary;