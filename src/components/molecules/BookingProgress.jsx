import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BookingProgress = ({ currentStep, steps }) => {
  const defaultSteps = [
    { id: 1, title: "Search", icon: "Search" },
    { id: 2, title: "Select", icon: "Plane" },
    { id: 3, title: "Details", icon: "User" },
    { id: 4, title: "Payment", icon: "CreditCard" },
    { id: 5, title: "Confirmation", icon: "CheckCircle" }
  ];

  const progressSteps = steps || defaultSteps;

  return (
<div className="bg-gray-800 border-b border-gray-700 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {progressSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center">
                <motion.div
                  className={cn(
"w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-purple-600 text-white"
                      : "border-gray-500 text-gray-500"
                  )}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {currentStep > step.id ? (
                    <ApperIcon name="Check" className="w-5 h-5" />
                  ) : (
                    <ApperIcon name={step.icon} className="w-5 h-5" />
                  )}
                </motion.div>
                <div className="ml-3">
<p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-purple-400" : "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {index < progressSteps.length - 1 && (
                <motion.div
                  className="flex-1 h-0.5 mx-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className={cn(
"h-full transition-all duration-300",
                    currentStep > step.id
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-gray-600"
                  )}></div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;