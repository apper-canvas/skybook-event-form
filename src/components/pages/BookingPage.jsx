import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookingProgress from "@/components/molecules/BookingProgress";
import PassengerForm from "@/components/molecules/PassengerForm";
import BookingSummary from "@/components/organisms/BookingSummary";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { bookingService } from "@/services/api/bookingService";

const BookingPage = ({ selectedFlight, searchCriteria }) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [bookingData, setBookingData] = useState({
    passengers: [],
    contactInfo: {}
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePassengerSubmit = (data) => {
    setBookingData(data);
    setCurrentStep(4);
    toast.success("Passenger details saved successfully");
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    
    try {
      const booking = {
        flights: [selectedFlight],
        passengers: bookingData.passengers,
        contactEmail: bookingData.contactInfo.email,
        contactPhone: bookingData.contactInfo.phone,
        totalPrice: calculateTotalPrice(),
        status: "confirmed",
        bookingDate: new Date().toISOString()
      };

      const result = await bookingService.createBooking(booking);
      
      toast.success("Booking confirmed successfully!");
      navigate("/confirmation", { state: { booking: result } });
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedFlight.price;
    const taxes = Math.round(basePrice * 0.18);
    const fees = 199;
    return (basePrice + taxes + fees) * bookingData.passengers.length;
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  if (!selectedFlight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flight Selected</h2>
          <p className="text-gray-600 mb-6">Please select a flight to continue with booking.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Back to Search
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BookingProgress currentStep={currentStep} />
      
      <div className="py-8">
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Passenger Details</h1>
              <p className="text-gray-600">Please provide passenger information for your booking</p>
            </div>
            
            <PassengerForm
              passengerCount={searchCriteria?.passengers || 1}
              onSubmit={handlePassengerSubmit}
            />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto px-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Payment</h1>
              <p className="text-gray-600">Review your booking details and confirm payment</p>
            </div>
            
            <BookingSummary
              flight={selectedFlight}
              passengers={bookingData.passengers}
              contactInfo={bookingData.contactInfo}
              onConfirmBooking={handleConfirmBooking}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;