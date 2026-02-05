import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/UserProfile";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/events/green-vehicle-expo" },
  { label: "About", href: "/events/green-vehicle-expo/about" },
  { label: "Exhibitors", href: "#exhibitors" },
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
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-teal/90 to-emerald-500/90 backdrop-blur-md" />
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
                className="text-white/80 hover:text-emerald-200 transition-colors font-medium text-sm"
              >
                {item.label}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-white/80 hover:text-emerald-200 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-primary-foreground/10">
                {showUserProfile ? (
                  <div className="p-4">
                    <UserProfile />
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={() => navigate("/login")}
                      variant="ghost" 
                      className="text-white justify-start"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </>
                )}
                <Button className="bg-gradient-to-r from-teal to-emerald-500 text-white">Register Now</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};