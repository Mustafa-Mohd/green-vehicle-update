import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Calendar, MapPin, Users, Award, Zap, Battery, Car, ChevronDown, Info, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/components/YouTubeVideo";
import { PlanMyVisit } from "@/components/PlanMyVisit";
import { InteractiveExpoMap } from "@/components/InteractiveExpoMap";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { GreenVehicleExpoHeader } from "@/components/GreenVehicleExpoHeader";
import { StallBookingForm } from "@/components/StallBookingForm";
import { ContactForm } from "@/components/ContactForm";
import { EVCalculator } from "@/components/EVCalculator";
import { VantaSection } from "@/components/VantaSection";
import { useNavigate } from "react-router-dom";

const TypeWriter = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isInView]);

  return (
    <span ref={ref} className="inline">
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-teal">|</span>
      )}
    </span>
  );
};

const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const stats = [
  { icon: Users, value: "500+", label: "Exhibitors Expected" },
  { icon: Award, value: "50+", label: "Industry Speakers" },
  { icon: Car, value: "200+", label: "EV Models Showcase" },
  { icon: Battery, value: "158 GWh", label: "Battery Capacity by 2030" },
];

const highlights = [
  {
    title: "Electric 2 Wheelers",
    description: "10 Lakh e-2 Wheelers target under FAME-II scheme",
    icon: Zap,
  },
  {
    title: "Electric 3 Wheelers",
    description: "5 Lakh e-3 Wheelers to revolutionize last-mile connectivity",
    icon: Battery,
  },
  {
    title: "Electric Buses",
    description: "7000 e-Buses for sustainable public transportation",
    icon: Car,
  },
  {
    title: "Electric Cars",
    description: "55,000 e-4 Wheeler Passenger Cars including Strong Hybrid",
    icon: Award,
  },
];

const GreenVehicleExpo = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <GreenVehicleExpoHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://greenvehicleexpo.com/wp-content/uploads/2021/12/about_bg.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-teal/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="https://greenvehicleexpo.com/wp-content/uploads/2019/05/Green-Vehicle-Expo-2026-logo-with-date.png"
              alt="Green Vehicle Expo 2026"
              className="h-24 md:h-48 mx-auto drop-shadow-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 px-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-emerald-400 to-teal">
              The Future Is
            </span>
            <br />
            <span className="text-foreground">Electric Vehicle</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 bg-teal/10 backdrop-blur-sm px-5 py-3 rounded-full border border-teal/30">
              <Calendar className="w-5 h-5 text-teal" />
              <span className="font-semibold">April 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-teal/10 backdrop-blur-sm px-5 py-3 rounded-full border border-teal/30">
              <MapPin className="w-5 h-5 text-teal" />
              <span className="font-semibold">Mumbai, India</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-gradient-to-r from-teal to-emerald-500 hover:opacity-90 text-white font-bold px-8 shadow-lg shadow-teal/30">
              Register as Exhibitor
            </Button>
            <Button size="lg" variant="outline" className="border-teal/50 hover:bg-teal/10 font-bold px-8">
              Visitor Registration
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-teal" />
        </motion.div>
      </section>

      {/* Vanta Animation Section */}
      <VantaSection />

      {/* YouTube Video Section */}
      <div className="py-20 container">
        <YouTubeVideo videoId="O_QTf1SWp-8" className="max-w-4xl mx-auto shadow-xl" />
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background to-teal/5">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center p-6 bg-card/50 backdrop-blur-xl rounded-3xl border border-teal/20 shadow-lg hover:shadow-teal/20 transition-all duration-500"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-teal mb-2">
                  <AnimatedCounter value={stat.value} duration={2000} />
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section with Typing Effect */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-emerald-500/5" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <ParallaxSection offset={30}>
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-teal/20 to-emerald-500/20 rounded-3xl blur-2xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img
                    src="https://cdn.growthjockey.com/blogs/future-of-ev-in-the-global-market--trends-and-growth-predictions-blog-feature-image.jpeg"
                    alt="The Future Is Electric Vehicle"
                    style={{ width: '100%' }}
                    className="relative rounded-3xl shadow-2xl border border-teal/20 object-cover h-[300px] md:h-[500px]"
                  />

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-gradient-to-br from-teal to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-2xl font-bold">₹15 Lakh Crores</div>
                    <div className="text-sm opacity-90">Investment by 2030</div>
                  </motion.div>
                </div>
              </ParallaxSection>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30"
              >
                <Zap className="w-4 h-4 text-teal" />
                <span className="text-teal font-semibold text-sm uppercase tracking-wider">About The Expo</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                  The Future Is Electric Vehicle
                </span>
              </h2>

              <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
                <p>
                  <TypeWriter
                    text="The Indian Automobile sector can be said to be broadly divided into 79% of Two Wheelers, 4% of 3 Wheelers, 12% of economy cars, 2% of High end cars and rest forming other vehicle segments."
                    speed={20}
                  />
                </p>
                <p className="text-foreground/80">
                  The Growing prices of Fossil fuels and an increased awareness of Environment protection has led the world including India to adopt Green Vehicle Technology.
                </p>
                <p className="text-foreground/80">
                  The Phase-II of FAME Scheme has an outlay of <span className="text-teal font-semibold">₹10,000 crore</span> for a period of 3 years from 1st April 2019. 86% of the fund has been allocated for creating a demand of XEVs.
                </p>
                <p className="text-foreground/80">
                  This opens up investment opportunities of about <span className="text-teal font-semibold">₹15 Lakh Crores by 2030</span> and an annual battery capacity requirement of <span className="text-teal font-semibold">158 GWh</span>. The sales of electric vehicles are expected to grow from half million in FY2020 to <span className="text-teal font-semibold">100 million by 2030</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-teal/5 via-background to-background relative overflow-hidden">
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent w-full"
              style={{ top: `${20 + i * 20}%` }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30 mb-6">
              <Battery className="w-4 h-4 text-teal" />
              <span className="text-teal font-semibold text-sm uppercase tracking-wider">FAME-II Targets</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Driving India's EV Revolution
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-card via-card to-teal/5 backdrop-blur-xl border border-teal/20 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden h-full">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 mb-6 bg-gradient-to-br from-teal to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-teal transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EV Calculator Section */}
      <section id="calculator" className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-teal/5 -skew-y-3 transform origin-top-left scale-110"></div>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30 mb-6">
              <Zap className="w-4 h-4 text-teal" />
              <span className="text-teal font-semibold text-sm uppercase tracking-wider">Go Electric</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Calculate Your Savings
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover how much you can save by switching to an electric vehicle today.
            </p>
          </div>
          <EVCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#020617' }}>
        {/* Darker, richer background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#052322] to-[#020617] -z-10" />

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-30 -z-10">
          <motion.div
            className="absolute w-96 h-96 bg-teal-500/20 rounded-full -top-48 -left-48 blur-3xl"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full -bottom-36 -right-36 blur-3xl"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white mb-16"
          >
            {/* Mock Stats Bar */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {[
                { label: "Anticipated Visitors", value: "50,000+" },
                { label: "Exhibitors", value: "300+" },
                { label: "Product Launches", value: "50+" },
                { label: "Media Partners", value: "40+" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-2">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
              <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">Join the Green Mobility Revolution</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
              Be Part of India's Most Significant<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 inline-block">
                Electric Vehicle & Future Expo
              </span>
            </h2>
            <p className="text-xl text-slate-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              This isn't just an exhibition; it's a catalyst for the EV ecosystem. Connect with manufacturers, charging infrastructure providers, and policy makers in a high-octane B2B environment designed for growth.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20 text-left">
              {[
                {
                  icon: Users,
                  title: "Strategic Networking",
                  desc: "Engage with serious B2B buyers, distributors, and fleet owners actively seeking green solutions."
                },
                {
                  icon: Award,
                  title: "Brand Authority",
                  desc: "Position your brand as a leader alongside industry giants like LOG9, BNC Motors, and government bodies."
                },
                {
                  icon: Zap,
                  title: "Direct Market Entry",
                  desc: "The perfect venue to showcase your R&D breakthroughs to an audience ready for adoption."
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl transition-all duration-300 shadow-2xl shadow-black/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-400/30">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-white">{benefit.title}</h4>
                  <p className="text-slate-300 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8 justify-center">
                  <div className="h-px bg-white/20 flex-1"></div>
                  <h3 className="text-2xl font-bold text-center text-white">Book Your Premium Stall</h3>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
                <StallBookingForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plan My Visit Section */}
      <section id="schedule" className="py-20 bg-gradient-to-b from-teal/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30 mb-6">
              <MapPin className="w-4 h-4 text-teal" />
              <span className="text-teal font-semibold text-sm uppercase tracking-wider">Plan Your Visit</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Optimize Your Expo Experience
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Get a personalized itinerary tailored to your interests and goals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PlanMyVisit />
          </div>
        </div>
      </section>

      {/* Interactive Expo Map Section */}
      <section id="exhibitors" className="py-20 bg-gradient-to-b from-background to-teal/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30 mb-6">
              <MapPin className="w-4 h-4 text-teal" />
              <span className="text-teal font-semibold text-sm uppercase tracking-wider">Expo Map</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Interactive Expo Floor Map
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Navigate the exhibition with our interactive map
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <InteractiveExpoMap />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-background to-teal/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full border border-teal/30 mb-6">
              <Mail className="w-4 h-4 text-teal" />
              <span className="text-teal font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Contact Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Have questions about the expo? Reach out to our team
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container text-center">
          <img
            src="https://greenvehicleexpo.com/wp-content/uploads/2019/05/Green-Vehicle-Expo-2026-logo-with-date.png"
            alt="Green Vehicle Expo"
            className="h-16 mx-auto mb-6 opacity-80"
          />
          <p className="text-muted-foreground">
            Organized by <span className="text-teal font-semibold">Mediaday Marketing Pvt. Ltd.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2026 Green Vehicle Expo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GreenVehicleExpo;
