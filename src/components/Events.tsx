import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, industries } from "@/lib/events";
import { useNavigate } from "react-router-dom";

const industryColors: Record<string, string> = {
  "Automotive": "bg-sky/10 text-sky-dark border-sky/30",
  "E-Mobility": "bg-teal/10 text-teal border-teal/30",
  "Food Processing": "bg-amber-500/10 text-amber-600 border-amber-300",
  "Dairy": "bg-sky-pale text-sky-dark border-sky/20",
  "Renewable Energy": "bg-emerald-500/10 text-emerald-600 border-emerald-300",
  "Logistics": "bg-indigo-500/10 text-indigo-600 border-indigo-300",
  "Construction": "bg-orange/10 text-orange-dark border-orange/30",
  "Smart Technology": "bg-violet-500/10 text-violet-600 border-violet-300",
  "Poultry": "bg-rose-500/10 text-rose-600 border-rose-300",
  "Cyber Security": "bg-red-500/10 text-red-600 border-red-300",
  "Paper Industry": "bg-yellow-500/10 text-yellow-600 border-yellow-300",
  "Recycling": "bg-teal/10 text-teal border-teal/30",
  "Manufacturing": "bg-slate-500/10 text-slate-600 border-slate-300",
  "Wellness": "bg-pink-500/10 text-pink-600 border-pink-300",
  "Pharma": "bg-purple-500/10 text-purple-600 border-purple-300",
};

export const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const filteredEvents = filter === "All" 
    ? events 
    : events.filter(e => e.industry === filter);

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 9);

  const handleEventClick = (event: typeof events[0], e: React.MouseEvent) => {
    // Check if this is Green Vehicle Expo - navigate internally
    if (event.id === "green-vehicle") {
      e.preventDefault();
      navigate("/events/green-vehicle-expo");
    }
    // Otherwise let the default link behavior happen
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-background via-sky-pale/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky/10 backdrop-blur-sm rounded-full border border-sky/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-sky" />
            <span className="text-sky-dark font-semibold tracking-wider uppercase text-sm">
              Our Events
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Explore Our
            <span className="text-transparent bg-clip-text bg-gradient-primary"> Trade Exhibitions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover our carefully curated B2B trade expos across diverse industry sectors, 
            designed to connect stakeholders and drive business growth.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setFilter("All")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "All"
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "bg-card text-muted-foreground hover:bg-sky/10 hover:text-sky-dark border border-border hover:border-sky/30"
            }`}
          >
            All Events
          </button>
          {industries.slice(0, 8).map((industry) => (
            <button
              key={industry}
              onClick={() => setFilter(industry)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === industry
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:bg-sky/10 hover:text-sky-dark border border-border hover:border-sky/30"
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Events Grid - 3D Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map((event, index) => (
            <motion.a
              key={event.id}
              href={event.id === "green-vehicle" ? undefined : event.url}
              onClick={(e) => handleEventClick(event, e)}
              target={event.id === "green-vehicle" ? undefined : "_blank"}
              rel={event.id === "green-vehicle" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + (index % 9) * 0.05 }}
              whileHover={{ 
                rotateX: -5, 
                rotateY: 5, 
                scale: 1.02,
                z: 50
              }}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              className="group relative cursor-pointer"
            >
              {/* 3D Card Container */}
              <div className="relative bg-gradient-to-br from-card via-card to-sky-pale/50 backdrop-blur-xl border border-sky/20 rounded-3xl p-6 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky/20 group-hover:border-sky/40 overflow-hidden">
                
                {/* Floating gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-sky/30 to-teal/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Card inner shadow for depth */}
                <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Event Logo if available */}
                  {event.logo && (
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={event.logo} 
                        alt={`${event.name} logo`}
                        className="h-16 object-contain"
                      />
                    </div>
                  )}

                  {/* Industry badge with glow */}
                  <div className="flex items-start justify-between mb-5">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold border backdrop-blur-sm shadow-sm ${industryColors[event.industry] || "bg-muted text-muted-foreground border-border"}`}>
                      {event.industry}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky/10 border border-sky/20 flex items-center justify-center group-hover:bg-sky/20 group-hover:border-sky/40 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 text-sky group-hover:text-sky-dark transition-colors" />
                    </div>
                  </div>

                  {/* Event title with 3D pop */}
                  <h3 
                    className="font-bold text-xl text-foreground mb-4 group-hover:text-sky-dark transition-colors leading-tight"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {event.name}
                  </h3>

                  {/* Event details with icons */}
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-5">
                    {event.date && (
                      <div className="flex items-center gap-2.5 bg-sky/5 rounded-lg px-3 py-2 border border-sky/10">
                        <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-sky" />
                        </div>
                        <span className="font-medium">{event.date}</span>
                      </div>
                    )}
                    {event.venue && (
                      <div className="flex items-center gap-2.5 bg-teal/5 rounded-lg px-3 py-2 border border-teal/10">
                        <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-teal" />
                        </div>
                        <span className="font-medium">{event.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button with 3D effect */}
                  <div 
                    className="pt-4 border-t border-sky/10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sky font-bold text-sm group-hover:text-sky-dark transition-colors">
                        Visit Website
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky to-teal flex items-center justify-center shadow-lg shadow-sky/30 group-hover:shadow-xl group-hover:shadow-sky/40 transition-all duration-300 group-hover:scale-110">
                        <ArrowRight className="w-4 h-4 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Show More Button */}
        {filteredEvents.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 shadow-glow"
            >
              {showAll ? "Show Less" : `View All ${filteredEvents.length} Events`}
              <ArrowRight className={`ml-2 w-5 h-5 transition-transform ${showAll ? "rotate-90" : ""}`} />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
