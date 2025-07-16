import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { bookingService } from "@/services/api/bookingService";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      setBookings(prev => prev.map(booking => 
        booking.Id === bookingId 
          ? { ...booking, status: "cancelled" }
          : booking
      ));
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  const formatTime = (timeString) => {
    return format(new Date(timeString), "HH:mm");
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "success";
      case "cancelled": return "error";
      case "pending": return "warning";
      default: return "default";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const filterOptions = [
    { value: "all", label: "All Bookings", count: bookings.length },
    { value: "confirmed", label: "Confirmed", count: bookings.filter(b => b.status === "confirmed").length },
    { value: "cancelled", label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length },
    { value: "pending", label: "Pending", count: bookings.filter(b => b.status === "pending").length }
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error title="Failed to Load Bookings" message={error} onRetry={loadBookings} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-secondary to-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-blue-100 text-lg">
              Manage your flight bookings and travel history
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === option.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {option.label}
                <span className="ml-2 text-xs opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Empty
            title="No bookings found"
            message="You haven't made any bookings yet. Start by searching for flights."
            actionText="Search Flights"
            onAction={() => window.location.href = "/"}
            icon="Calendar"
          />
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <ApperIcon name="Plane" className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Booking #{booking.bookingId}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Booked on {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">
                          ₹{booking.totalPrice.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.passengers.length} passenger{booking.passengers.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  {booking.flights.map((flight, flightIndex) => (
                    <div key={flightIndex} className="mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                              <ApperIcon name="Plane" className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{flight.airline}</p>
                              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{flight.class}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{formatTime(flight.departureTime)}</p>
                            <p className="text-sm text-gray-600">{flight.origin}</p>
                            <p className="text-xs text-gray-500">{formatDate(flight.departureTime)}</p>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="text-center">
                              <ApperIcon name="Plane" className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500">
                                {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{formatTime(flight.arrivalTime)}</p>
                            <p className="text-sm text-gray-600">{flight.destination}</p>
                            <p className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Passenger Details */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Passengers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {booking.passengers.map((passenger, passengerIndex) => (
                        <div key={passengerIndex} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                          <ApperIcon name="User" className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {passenger.title} {passenger.firstName} {passenger.lastName}
                            </p>
                            <p className="text-sm text-gray-600">{passenger.gender} • {passenger.nationality}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                    >
                      <ApperIcon name="Printer" className="w-4 h-4 mr-2" />
                      Print Ticket
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Downloading e-ticket...")}
                    >
                      <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    
                    {booking.status === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this booking?")) {
                            handleCancelBooking(booking.Id);
                          }
                        }}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <ApperIcon name="X" className="w-4 h-4 mr-2" />
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;