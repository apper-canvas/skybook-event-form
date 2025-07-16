import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search criteria or explore different options.", 
  actionText = "Start New Search",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name={icon} className="w-10 h-10 text-secondary" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onAction && (
          <Button
            onClick={onAction}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary transform hover:scale-105 transition-all duration-300"
          >
            <ApperIcon name="Search" className="w-4 h-4" />
            <span>{actionText}</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;