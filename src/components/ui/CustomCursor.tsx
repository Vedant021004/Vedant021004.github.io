import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "inspect">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const inspectEl = target.closest("[data-cursor='INSPECT']");
      if (inspectEl) {
        setCursorType("inspect");
        return;
      }

      const viewEl = target.closest("[data-cursor='VIEW']");
      if (viewEl) {
        setCursorType("view");
        return;
      }

      const isInteractive = target.closest("button, a, input, [role='button']");
      if (isInteractive) {
        setCursorType("hover");
        return;
      }

      setCursorType("default");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isSpecial = cursorType === "view" || cursorType === "inspect";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[200] hidden md:flex items-center justify-center font-mono-tech select-none"
      animate={{
        x: mousePosition.x - (isSpecial ? 28 : cursorType === "hover" ? 14 : 4),
        y: mousePosition.y - (isSpecial ? 28 : cursorType === "hover" ? 14 : 4),
        width: isSpecial ? 56 : cursorType === "hover" ? 28 : 8,
        height: isSpecial ? 56 : cursorType === "hover" ? 28 : 8,
        backgroundColor: isSpecial 
          ? "rgba(124, 92, 255, 0.9)" 
          : cursorType === "hover" 
          ? "rgba(124, 92, 255, 0.25)" 
          : "rgba(255, 255, 255, 0.8)",
        borderColor: isSpecial ? "#7C5CFF" : cursorType === "hover" ? "#7C5CFF" : "transparent",
        borderRadius: "9999px",
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      style={{
        borderWidth: cursorType === "hover" || isSpecial ? "1px" : "0px",
        backdropFilter: isSpecial ? "blur(4px)" : "none",
      }}
    >
      {cursorType === "view" && (
        <span className="text-[9px] font-bold text-white tracking-widest uppercase">
          VIEW
        </span>
      )}
      {cursorType === "inspect" && (
        <span className="text-[8px] font-bold text-white tracking-widest uppercase">
          INSPECT
        </span>
      )}
    </motion.div>
  );
};
