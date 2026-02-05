import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  delay = 0,
  suffix = "",
  prefix = "",
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isStarted, setIsStarted] = useState(false);
  const rafRef = useRef<number | null>(null);

  const startCounting = () => {
    if (isStarted) return;
    setIsStarted(true);

    const startTime = performance.now() + delay;
    const endValue = end;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (endValue - start) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const formattedCount = `${prefix}${count.toLocaleString()}${suffix}`;

  return { count, formattedCount, startCounting };
};
