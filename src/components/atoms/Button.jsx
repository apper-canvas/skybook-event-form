import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    accent: "bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent text-white shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-success text-white shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-error to-red-600 hover:from-red-600 hover:to-error text-white shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;