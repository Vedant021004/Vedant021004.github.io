import { useRef } from "react";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      window.dispatchEvent(new Event("open_admin_auth"));
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2000);
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-[#050505] px-6 md:px-10 py-8 transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
        {/* Left Side: Copyright */}
        <div className="flex items-center gap-4">
          <p 
            onClick={handleSecretClick}
            className="text-gray-500 font-medium text-sm md:text-base select-none cursor-default"
          >
            Vedant Kapil © {currentYear}
          </p>
        </div>

        {/* Right Side: Location / Globe */}
        <div className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer">
          <Globe className="w-5 h-5" />
          <span className="font-medium text-sm md:text-base uppercase tracking-wider">India</span>
        </div>
      </div>
    </footer>
  );
};
