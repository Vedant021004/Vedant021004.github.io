import { Globe } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white px-6 md:px-10 py-8">
      <div className="max-w-[1600px] mx-auto border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Copyright */}
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Vedant Kapil © {currentYear}
        </p>

        {/* Right Side: Location / Globe */}
        <div className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer">
          <Globe className="w-5 h-5" />
          <span className="font-medium text-sm md:text-base uppercase tracking-wider">India</span>
        </div>
      </div>
    </footer>
  );
};
