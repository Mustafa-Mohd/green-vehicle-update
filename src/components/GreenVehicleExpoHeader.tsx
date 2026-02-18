import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/UserProfile";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/events/green-vehicle-expo" },
  { label: "About", href: "/events/green-vehicle-expo/about" },
  { label: "Calculator", href: "#calculator" },
  { label: "Exhibitors", href: "#exhibitors" },
  { label: "Sponsorship", href: "/events/green-vehicle-expo/sponsorship" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

export const GreenVehicleExpoHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Show user profile avatar only when logged in
  const showUserProfile = location.pathname.includes('green-vehicle-expo');

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Check if we are on the main page
      const isMainPage = location.pathname === '/events/green-vehicle-expo';

      if (!isMainPage) {
        // If not on main page, navigate to main page with hash
        navigate(`/events/green-vehicle-expo${href}`);
      } else {
        // If on main page, smooth scroll to element
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-teal/95 to-emerald-500/95 backdrop-blur-md" />
      <div className="container relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/events/green-vehicle-expo" className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img
                src="https://greenvehicleexpo.com/wp-content/uploads/2019/05/Green-Vehicle-Expo-2026-logo-with-date.png"
                alt="Green Vehicle Expo"
                className="h-12 object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="relative group text-white/90 hover:text-white transition-colors font-medium text-sm py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal to-emerald-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {showUserProfile ? (
              <UserProfile />
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="text-white hover:text-emerald-200 hover:bg-white/10 border-white/30"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
            <Button className="bg-gradient-to-r from-teal to-emerald-500 hover:opacity-90 text-white font-semibold btn-glow">
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 bottom-0 lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 overflow-y-auto z-40"
          >
            <nav className="container py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-800 hover:text-teal-600 hover:bg-gray-50 py-4 px-4 rounded-lg transition-colors font-medium text-lg text-left border-b border-gray-100 last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-6 mt-2">
                {showUserProfile ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <UserProfile />
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="ghost"
                      className="text-gray-800 justify-start h-12 text-lg hover:bg-gray-50"
                    >
                      <LogIn className="w-5 h-5 mr-3 text-teal-600" />
                      Login
                    </Button>
                  </>
                )}
                <Button className="bg-gradient-to-r from-teal to-emerald-500 text-white h-12 text-lg mt-2">Register Now</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};