import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  useEffect(() => {
    if (!booking) {
      navigate("/");
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  const flight = booking.flights[0];
  
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

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6"
          >
            <ApperIcon name="CheckCircle" className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Your flight has been successfully booked
          </p>
          <p className="text-lg text-gray-400">
            Booking ID: <span className="font-semibold text-purple-400">{booking.bookingId}</span>
          </p>
        </motion.div>

        {/* Flight Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <ApperIcon name="Plane" className="w-6 h-6 mr-3" />
                Flight Details
              </h2>
              <Badge variant="success">Confirmed</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="Plane" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{flight.airline}</h3>
                    <p className="text-gray-600">{flight.flightNumber}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{formatTime(flight.departureTime)}</p>
                      <p className="text-sm text-gray-600 font-medium">{flight.origin}</p>
                      <p className="text-xs text-gray-500">{formatDate(flight.departureTime)}</p>
                    </div>
                    
                    <div className="flex-1 relative mx-6">
                      <div className="flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                        <div className="absolute bg-white p-2 rounded-full border-2 border-primary">
                          <ApperIcon name="Plane" className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <p className="text-sm text-gray-600 font-medium">{formatDuration(flight.duration)}</p>
                        <p className="text-xs text-gray-500">{getStopsText(flight.stops)}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{formatTime(flight.arrivalTime)}</p>
                      <p className="text-sm text-gray-600 font-medium">{flight.destination}</p>
                      <p className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{booking.passengers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium capitalize">{flight.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-accent">₹{booking.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="success">{booking.status}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Passenger Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Users" className="w-5 h-5 mr-2" />
              Passenger Details
            </h3>
            
            <div className="space-y-4">
              {booking.passengers.map((passenger, index) => (
                <div key={passenger.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {passenger.title} {passenger.firstName} {passenger.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {passenger.gender} • {passenger.nationality}
                    </p>
                  </div>
                  <Badge variant="outline">
                    Passenger {index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
<Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-cyan-500 hover:to-purple-600 px-8 py-3"
          >
            <ApperIcon name="Search" className="w-5 h-5 mr-2" />
            Book Another Flight
          </Button>
          
          <Button
            onClick={() => navigate("/bookings")}
            variant="outline"
            className="px-8 py-3"
          >
            <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
            View My Bookings
          </Button>
          
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="px-8 py-3"
          >
            <ApperIcon name="Printer" className="w-5 h-5 mr-2" />
            Print Ticket
          </Button>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Info" className="w-5 h-5 mr-2" />
              Important Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Check-in Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Online check-in opens 24 hours before departure</li>
                  <li>• Arrive at airport 2 hours before domestic flights</li>
                  <li>• Carry valid ID proof and booking confirmation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Email: {booking.contactEmail}</p>
                  <p>Phone: {booking.contactPhone}</p>
                  <p>Support: 1800-123-4567</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;