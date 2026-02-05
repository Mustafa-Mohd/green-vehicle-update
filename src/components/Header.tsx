import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/UserProfile";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Industries", href: "#industries" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Show user profile avatar only on green vehicle expo page
  const showUserProfile = location.pathname.includes('green-vehicle-expo');

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-primary/95 backdrop-blur-md" />
      <div className="container relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary-foreground font-bold text-lg leading-tight">MEDIA DAY</span>
                <span className="text-orange text-xs font-medium tracking-wider">MARKETING</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-primary-foreground/80 hover:text-orange transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {showUserProfile ? (
              <UserProfile />
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:text-orange hover:bg-primary-foreground/10"
                >
                  Exhibitor Login
                </Button>
                <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold btn-glow">
                  Exhibit With Us
                </Button>
              </>
            )}
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
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-orange py-3 px-4 rounded-lg hover:bg-primary-foreground/5 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-primary-foreground/10">
                {showUserProfile ? (
                  <div className="p-4">
                    <UserProfile />
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="text-primary-foreground justify-start">
                      Exhibitor Login
                    </Button>
                    <Button className="bg-gradient-primary">Exhibit With Us</Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
