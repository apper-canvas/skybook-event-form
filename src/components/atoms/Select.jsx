import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  children, 
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white",
          error && "border-error focus:ring-error",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;