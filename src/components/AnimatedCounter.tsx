import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const formatValue = (value: string): { start: number; end: number; isNumeric: boolean; suffix: string } => {
  // Check if the value is numeric with optional suffix like "+", "GWh", etc.
  const numMatch = value.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (numMatch) {
    return {
      start: 0,
      end: parseFloat(numMatch[1]),
      isNumeric: true,
      suffix: numMatch[2] || ""
    };
  }
  
  // If not numeric, return as is
  return {
    start: 0,
    end: 0,
    isNumeric: false,
    suffix: value
  };
};

export const AnimatedCounter = ({ 
  value, 
  suffix = "", 
  duration = 2000, 
  className = "" 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const { start, end, isNumeric, suffix: parsedSuffix } = formatValue(value);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setCount(start);
      
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out function for smoother animation
        const easeOut = 1 - Math.pow(1 - progress, 2);
        const currentValue = start + (end - start) * easeOut;
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    } else if (!isInView) {
      // Reset when scrolled out of view
      setCount(start);
      setHasAnimated(false);
    }
  }, [isInView, hasAnimated, start, end, duration]);

  const displayValue = isNumeric 
    ? Math.floor(count).toLocaleString() + (parsedSuffix || suffix)
    : value;

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
};