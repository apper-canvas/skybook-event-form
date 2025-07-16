import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "flights") {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Loading</h3>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;