import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Globe, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Strategic Events",
    description: "Carefully curated exhibitions in high-growth sectors with excellent market potential."
  },
  {
    icon: Users,
    title: "Industry Connect",
    description: "Bridging manufacturers, suppliers, distributors, OEMs and industry stakeholders."
  },
  {
    icon: Globe,
    title: "Pan-India Presence",
    description: "Events across major cities including Hyderabad, Bangalore, Mumbai, and Delhi."
  },
  {
    icon: Award,
    title: "20+ Years Expertise",
    description: "Management team with extensive hands-on experience in B2B event organization."
  }
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange font-semibold tracking-wider uppercase text-sm">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
                India's Premier B2B
                <span className="block gradient-text">Trade Expo Organizer</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Media Day Marketing is a Hyderabad-based leading B2B event organizing firm 
                with a management team of marketing professionals having over 20 years of 
                hands-on experience. We specialize in handling successful events across 
                various high-growth sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our events aim to connect stakeholders, including manufacturers, suppliers, 
                distributors, OEMs, and members of the allied industry. We provide a meeting 
                platform for the international community and Indian stakeholders to establish 
                business communication and fulfill their demands.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-5 bg-card rounded-xl border border-border hover:border-orange/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/5 rounded-full blur-2xl" />
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-primary-foreground mb-8">
                  Our Impact in Numbers
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "30+", label: "Trade Exhibitions" },
                    { value: "1,500+", label: "Total Exhibitors" },
                    { value: "11,000+", label: "Visitors Annually" },
                    { value: "15+", label: "Industry Sectors" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center p-4"
                    >
                      <div className="text-4xl md:text-5xl font-bold text-orange mb-2">
                        {stat.value}
                      </div>
                      <div className="text-primary-foreground/70 text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-primary-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-primary flex items-center justify-center text-primary-foreground text-xs font-bold"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-primary-foreground font-medium">Trusted Partners</p>
                      <p className="text-primary-foreground/60 text-sm">
                        Government, Associations & Chambers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
