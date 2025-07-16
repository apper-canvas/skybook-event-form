import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ title = "Something went wrong", message = "We encountered an error while loading your data.", onRetry }) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;