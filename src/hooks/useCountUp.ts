import { useState, useEffect, useRef } from 'react';

export const useCountUp = (target: number, duration = 2000) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const start = performance.now();
        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          setValue(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer?.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer?.disconnect();
  }, [target, duration]);

  return { ref, value };
};
