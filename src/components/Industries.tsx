import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Truck, Leaf, Factory, Cpu, Building2, Warehouse, 
  Zap, Bird, Shield, FileText, Recycle, Heart, Pill, Utensils, Coffee
} from "lucide-react";

const industryData = [
  { name: "Automotive", icon: Truck, count: 3 },
  { name: "E-Mobility", icon: Zap, count: 2 },
  { name: "Food Processing", icon: Utensils, count: 2 },
  { name: "Renewable Energy", icon: Leaf, count: 2 },
  { name: "Construction", icon: Building2, count: 6 },
  { name: "Smart Technology", icon: Cpu, count: 3 },
  { name: "Logistics", icon: Warehouse, count: 1 },
  { name: "Manufacturing", icon: Factory, count: 5 },
  { name: "Poultry & Dairy", icon: Bird, count: 2 },
  { name: "Cyber Security", icon: Shield, count: 1 },
  { name: "Paper Industry", icon: FileText, count: 1 },
  { name: "Recycling", icon: Recycle, count: 1 },
  { name: "Wellness", icon: Heart, count: 2 },
  { name: "Pharma", icon: Pill, count: 1 },
];

export const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-orange font-semibold tracking-wider uppercase text-sm">
            Industry Sectors
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">
            Diverse Industries,
            <span className="text-orange"> One Platform</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            We organize B2B trade exhibitions across 15+ industry sectors, 
            each selected for their growth potential and market demands.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {industryData.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="group"
            >
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-center hover:bg-primary-foreground/10 hover:border-orange/30 transition-all duration-300 cursor-pointer h-full">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-primary-foreground text-sm mb-1">
                  {industry.name}
                </h3>
                <p className="text-primary-foreground/50 text-xs">
                  {industry.count} {industry.count === 1 ? "Event" : "Events"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00di0yaDR2MnptMC02di00aC00djRoNHptLTYgNmgtNHYtMmg0djJ6bS02LTZ2LTRoLTR2NGg0em0tNiA2aC00di0yaDR2MnptMC02di00aC00djRoNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Want to Exhibit at Our Events?
            </h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join 1,500+ exhibitors who have showcased their products and services 
              at our trade exhibitions. Get direct access to qualified buyers and decision-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Become an Exhibitor
              </a>
              <a
                href="#events"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                View All Events
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
