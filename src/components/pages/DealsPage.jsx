import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Mock deals data
      const mockDeals = [
        {
          Id: 1,
          title: "Early Bird Special",
          description: "Book 30 days in advance and save up to 40%",
          discount: "40% OFF",
          validUntil: "2024-02-28",
          destinations: ["Delhi", "Mumbai", "Bangalore"],
          originalPrice: 8999,
          discountedPrice: 5399,
          type: "early-bird",
          terms: "Valid on select routes. Limited time offer.",
          image: "🐦"
        },
        {
          Id: 2,
          title: "Weekend Getaway",
          description: "Perfect for short trips. Special weekend rates",
          discount: "25% OFF",
          validUntil: "2024-02-15",
          destinations: ["Goa", "Kerala", "Rajasthan"],
          originalPrice: 6999,
          discountedPrice: 5249,
          type: "weekend",
          terms: "Valid for weekend travel only.",
          image: "🏖️"
        },
        {
          Id: 3,
          title: "Student Discount",
          description: "Special rates for students with valid ID",
          discount: "30% OFF",
          validUntil: "2024-03-31",
          destinations: ["Chennai", "Kolkata", "Hyderabad"],
          originalPrice: 7499,
          discountedPrice: 5249,
          type: "student",
          terms: "Valid student ID required at check-in.",
          image: "🎓"
        },
        {
          Id: 4,
          title: "Flash Sale",
          description: "Limited time offer. Book now before it ends!",
          discount: "50% OFF",
          validUntil: "2024-01-20",
          destinations: ["Pune", "Ahmedabad", "Jaipur"],
          originalPrice: 9999,
          discountedPrice: 4999,
          type: "flash",
          terms: "Valid for next 48 hours only.",
          image: "⚡"
        },
        {
          Id: 5,
          title: "Group Booking",
          description: "Save more when you book for 4 or more passengers",
          discount: "35% OFF",
          validUntil: "2024-02-29",
          destinations: ["All Routes"],
          originalPrice: 7999,
          discountedPrice: 5199,
          type: "group",
          terms: "Minimum 4 passengers required.",
          image: "👥"
        },
        {
          Id: 6,
          title: "Business Class Upgrade",
          description: "Upgrade to business class at economy price",
          discount: "60% OFF",
          validUntil: "2024-02-10",
          destinations: ["International Routes"],
          originalPrice: 45999,
          discountedPrice: 18399,
          type: "upgrade",
          terms: "Valid on select international routes.",
          image: "✈️"
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeals(mockDeals);
      toast.success("Deals loaded successfully");
    } catch (err) {
      setError("Failed to load deals. Please try again.");
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    if (filter === "all") return true;
    return deal.type === filter;
  });

  const filterOptions = [
    { value: "all", label: "All Deals", count: deals.length },
    { value: "flash", label: "Flash Sales", count: deals.filter(d => d.type === "flash").length },
    { value: "early-bird", label: "Early Bird", count: deals.filter(d => d.type === "early-bird").length },
    { value: "weekend", label: "Weekend", count: deals.filter(d => d.type === "weekend").length },
    { value: "student", label: "Student", count: deals.filter(d => d.type === "student").length },
    { value: "group", label: "Group", count: deals.filter(d => d.type === "group").length },
    { value: "upgrade", label: "Upgrades", count: deals.filter(d => d.type === "upgrade").length }
  ];

  const getDiscountColor = (type) => {
    switch (type) {
      case "flash": return "error";
      case "early-bird": return "success";
      case "weekend": return "accent";
      case "student": return "primary";
      case "group": return "secondary";
      case "upgrade": return "warning";
      default: return "default";
    }
  };

  const handleBookDeal = (deal) => {
    toast.success(`Redirecting to booking for ${deal.title}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error title="Failed to Load Deals" message={error} onRetry={loadDeals} />;
  }

return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-purple-800 via-cyan-600 to-purple-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Flight Deals & Offers</h1>
            <p className="text-purple-100 text-lg">
              Exclusive discounts and special offers for your next journey
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
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                }`}
              >
                {option.label}
                <span className="ml-2 text-xs opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        {filteredDeals.length === 0 ? (
          <Empty
            title="No deals found"
            message="No deals match your selected filter. Try selecting a different category."
            actionText="View All Deals"
            onAction={() => setFilter("all")}
            icon="Tag"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal, index) => (
              <motion.div
                key={deal.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative p-6">
                    {/* Deal Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant={getDiscountColor(deal.type)} className="text-lg px-3 py-1">
                        {deal.discount}
                      </Badge>
                    </div>

                    {/* Deal Icon */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {deal.image}
                    </div>

                    {/* Deal Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {deal.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {deal.description}
                        </p>
                      </div>

                      {/* Destinations */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Valid for:</p>
                        <div className="flex flex-wrap gap-1">
                          {deal.destinations.map((destination, destIndex) => (
                            <Badge key={destIndex} variant="outline" className="text-xs">
                              {destination}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg line-through text-gray-500">
                            ₹{deal.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold text-accent">
                            ₹{deal.discountedPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-success">
                          You save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                        </p>
                      </div>

                      {/* Validity */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ApperIcon name="Clock" className="w-4 h-4" />
                        <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                      </div>

                      {/* Terms */}
                      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium mb-1">Terms & Conditions:</p>
                        <p>{deal.terms}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="px-6 pb-6">
<Button
                      onClick={() => handleBookDeal(deal)}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300"
                    >
                      <ApperIcon name="Tag" className="w-5 h-5 mr-2" />
                      Book This Deal
                    </Button>
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

export default DealsPage;