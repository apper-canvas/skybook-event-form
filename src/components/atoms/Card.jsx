import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  gradient = false,
  hover = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
className={cn(
        "bg-gray-800 rounded-lg shadow-md border border-gray-700 transition-all duration-300",
        gradient && "bg-gradient-to-br from-gray-800 to-gray-900",
        hover && "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;