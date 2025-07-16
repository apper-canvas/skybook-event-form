import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: ""
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully! We'll get back to you soon.");
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: ""
    });
  };

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: "contact", label: "Contact Us", icon: "MessageCircle" },
    { id: "faq", label: "FAQ", icon: "HelpCircle" },
    { id: "policies", label: "Policies", icon: "FileText" }
  ];

  const faqs = [
    {
      category: "Booking",
      questions: [
        {
          question: "How can I book a flight?",
          answer: "You can book a flight by using our search form on the homepage. Enter your departure and destination cities, select your travel dates, choose the number of passengers, and click 'Search Flights'."
        },
        {
          question: "Can I modify my booking after confirmation?",
          answer: "Yes, you can modify your booking within 24 hours of booking without any charges. After that, modification charges may apply depending on the airline's policy."
        },
        {
          question: "How do I cancel my booking?",
          answer: "You can cancel your booking from the 'My Bookings' page. Click on the booking you want to cancel and select 'Cancel Booking'. Refund will be processed according to the airline's cancellation policy."
        }
      ]
    },
    {
      category: "Payment",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, net banking, UPI, and digital wallets like Paytm, PhonePe, and Google Pay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure."
        },
        {
          question: "When will I be charged?",
          answer: "Your payment will be processed immediately after you confirm your booking. You will receive a confirmation email with your booking details."
        }
      ]
    },
    {
      category: "Travel",
      questions: [
        {
          question: "What documents do I need for travel?",
          answer: "For domestic flights, you need a valid government-issued photo ID. For international flights, you need a passport and visa (if required)."
        },
        {
          question: "How early should I reach the airport?",
          answer: "We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights."
        },
        {
          question: "Can I select my seat?",
          answer: "Yes, you can select your seat during booking or later through the airline's website. Some airlines may charge for seat selection."
        }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: "Phone",
      title: "Phone Support",
      description: "24/7 customer support",
      contact: "1800-123-4567",
      action: "Call Now"
    },
    {
      icon: "Mail",
      title: "Email Support",
      description: "We'll respond within 24 hours",
      contact: "support@skybook.com",
      action: "Send Email"
    },
    {
      icon: "MessageCircle",
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: "MapPin",
      title: "Office Address",
      description: "Visit us at our office",
      contact: "123 Business Center, New Delhi",
      action: "Get Directions"
    }
  ];

  const policies = [
    {
      title: "Cancellation Policy",
      icon: "X",
      content: "Free cancellation within 24 hours of booking. After that, cancellation charges apply based on airline policy. Refunds are processed within 7-10 business days."
    },
    {
      title: "Refund Policy",
      icon: "RefreshCw",
      content: "Refunds are processed according to airline terms. Full refunds for cancellations within 24 hours. Partial refunds may apply for later cancellations."
    },
    {
      title: "Privacy Policy",
      icon: "Shield",
      content: "We protect your personal information and don't share it with third parties without consent. Data is encrypted and securely stored."
    },
    {
      title: "Terms of Service",
      icon: "FileText",
      content: "By using our service, you agree to our terms and conditions. Please read them carefully before booking."
    }
  ];

return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-purple-800 via-purple-600 to-cyan-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Support Center</h1>
            <p className="text-purple-100 text-lg">
              We're here to help you with any questions or concerns
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
<div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-700 text-purple-400 shadow-sm"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Us Tab */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={info.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                  <p className="font-medium text-gray-900 mb-4">{info.contact}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {info.action}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send us a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                  <Select
                    label="Category"
                    value={contactForm.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="cancellation">Cancellation</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </Select>
                </div>

                <Input
                  label="Subject"
                  value={contactForm.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your issue"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Please describe your issue in detail..."
                    required
                  />
                </div>

<Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-cyan-500 hover:to-purple-600 text-white px-8 py-3"
                >
                  <ApperIcon name="Send" className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {faqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ApperIcon name="HelpCircle" className="w-6 h-6 mr-3" />
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Policies Tab */}
        {activeTab === "policies" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {policies.map((policy, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={policy.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {policy.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;