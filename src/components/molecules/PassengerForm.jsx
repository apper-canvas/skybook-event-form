import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const PassengerForm = ({ passengerCount, onSubmit }) => {
  const [passengers, setPassengers] = useState(
    Array.from({ length: passengerCount }, (_, index) => ({
      id: index + 1,
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Indian",
      passportNumber: "",
      email: index === 0 ? "" : "", // Only first passenger needs email
      phone: index === 0 ? "" : ""  // Only first passenger needs phone
    }))
  );

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    alternatePhone: ""
  });

  const handlePassengerChange = (index, field, value) => {
    setPassengers(prev => prev.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ passengers, contactInfo });
  };

  const titles = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" }
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Contact Information */}
<Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <ApperIcon name="Mail" className="w-5 h-5 mr-2" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
            required
          />
        </div>
      </Card>

      {/* Passenger Details */}
      {passengers.map((passenger, index) => (
<Card key={passenger.id} className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <ApperIcon name="User" className="w-5 h-5 mr-2" />
            Passenger {index + 1}
            {index === 0 && <span className="ml-2 text-sm font-normal text-gray-400">(Primary)</span>}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              label="Title"
              value={passenger.title}
              onChange={(e) => handlePassengerChange(index, "title", e.target.value)}
              required
            >
              <option value="">Select Title</option>
              {titles.map(title => (
                <option key={title.value} value={title.value}>{title.label}</option>
              ))}
            </Select>
            
            <Input
              label="First Name"
              value={passenger.firstName}
              onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
              placeholder="John"
              required
            />
            
            <Input
              label="Last Name"
              value={passenger.lastName}
              onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
              placeholder="Doe"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Date of Birth"
              type="date"
              value={passenger.dateOfBirth}
              onChange={(e) => handlePassengerChange(index, "dateOfBirth", e.target.value)}
              required
            />
            
            <Select
              label="Gender"
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            
            <Select
              label="Nationality"
              value={passenger.nationality}
              onChange={(e) => handlePassengerChange(index, "nationality", e.target.value)}
              required
            >
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Passport Number"
              value={passenger.passportNumber}
              onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
              placeholder="A1234567"
              required
            />
          </div>
        </Card>
      ))}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Back
        </Button>
<Button type="submit" className="bg-gradient-to-r from-purple-600 to-cyan-500">
          <ApperIcon name="ArrowRight" className="w-4 h-4 mr-2" />
          Continue to Payment
        </Button>
      </div>
    </motion.form>
  );
};

export default PassengerForm;