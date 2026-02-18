import { ArrowUp, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Exhibitor Profile", href: "#exhibitor" },
  { label: "Visitor Registration", href: "#visitor" },
  { label: "Terms and conditions", href: "#terms" },
];

const eventCategories = [
  "Automotive Expos",
  "Green Energy Expos",
  "Food & Dairy Expos",
  "Construction Expos",
  "Technology Expos",
  "Manufacturing Expos",
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-primary-foreground/10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-primary-foreground font-bold text-lg leading-tight">MEDIA DAY</span>
                <span className="text-orange text-xs font-medium tracking-wider">MARKETING</span>
              </div>
            </a>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              India's leading B2B trade expo organizer connecting industries,
              creating opportunities, and driving business growth since 2015.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/60 hover:bg-orange hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-6">Event Categories</h4>
            <ul className="space-y-3">
              {eventCategories.map((category) => (
                <li key={category}>
                  <a
                    href="#events"
                    className="text-primary-foreground/60 hover:text-orange transition-colors text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-semibold mb-6">Head Office</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-primary-foreground/80">
                  NO:16-2-741/D/24, 2nd Floor, Fazilat Manzil, Beside TV Tower Malakpet, Hyderabad-500036 T. S. INDIA.
                </p>
              </div>
              <div>
                <p className="text-primary-foreground/40 mb-1">Get In Touch</p>
                <div className="space-y-2">
                  <p>
                    <a href="tel:+917075566244" className="text-primary-foreground/80 hover:text-orange">
                      +91 7075566244
                    </a>
                  </p>
                  <p>
                    <a href="tel:+918555912484" className="text-primary-foreground/80 hover:text-orange">
                      +91 8555912484
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <p className="text-primary-foreground/40 mb-1">Email</p>
                <div className="space-y-2">
                  <p>
                    <a href="mailto:greenvehicleexpo01@gmail.com" className="text-orange hover:underline">
                      greenvehicleexpo01@gmail.com
                    </a>
                  </p>
                  <p>
                    <a href="mailto:expo1@mediaday.co.in" className="text-orange hover:underline">
                      expo1@mediaday.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Media Day Marketing. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary-foreground/50 hover:text-orange text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-orange text-sm">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
