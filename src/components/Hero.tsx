import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Play, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CounterStat = ({ value, label, suffix = "", delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { formattedCount, startCounting } = useCountUp({
    end: value,
    duration: 2500,
    delay,
    suffix,
  });

  useEffect(() => {
    if (isInView) {
      startCounting();
    }
  }, [isInView, startCounting]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-sky mb-2"
      >
        {formattedCount}
      </motion.div>
      <div className="text-primary-foreground/70 text-sm font-medium">{label}</div>
    </div>
  );
};

const VIDEO_URL = "https://res.cloudinary.com/dhpfphivh/video/upload/v1770105630/K_Logo_Intro_Video_Generation_hm3x09.mp4";

export const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-sky/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-teal/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-light/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/10 backdrop-blur-md rounded-full border border-sky/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-sky-light" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Since 2015 • Hyderabad
            </span>
            <Calendar className="w-4 h-4 text-sky-light" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Connecting
            <span className="block text-transparent bg-clip-text bg-gradient-sky">Industries.</span>
            <span className="block">Creating Opportunities.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mb-8 leading-relaxed"
          >
            India's leading B2B trade expo organizer. We bring together manufacturers, suppliers, 
            distributors, and industry stakeholders across 15+ sectors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-lg px-8 h-14 shadow-glow group"
            >
              Explore Events
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={() => setIsVideoOpen(true)}
              className="bg-sky/20 border-2 border-sky text-primary-foreground hover:bg-sky/30 hover:border-sky-light font-semibold text-lg px-8 h-14 group backdrop-blur-md"
            >
              <Play className="mr-2 w-5 h-5 fill-sky-light text-sky-light" />
              Watch Showreel
            </Button>
          </motion.div>

          {/* Stats Row with Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-10 md:gap-16 mt-16 pt-8 border-t border-primary-foreground/15"
          >
            <CounterStat value={30} label="Trade Expos" suffix="+" delay={0} />
            <CounterStat value={1500} label="Exhibitors" suffix="+" delay={200} />
            <CounterStat value={11000} label="Visitors" suffix="+" delay={400} />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-sky/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-sky" />
        </motion.div>
      </motion.div>
    </section>

    {/* Video Modal */}
    <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 bg-navy border-sky/30 overflow-hidden">
        <button
          onClick={() => setIsVideoOpen(false)}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-navy/80 border border-sky/30 flex items-center justify-center text-primary-foreground hover:bg-sky/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="aspect-video w-full">
          <video
            autoPlay
            controls
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
