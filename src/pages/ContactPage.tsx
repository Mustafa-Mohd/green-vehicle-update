import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2 
    } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-teal/5 to-background">
          <div className="container text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Get In Touch
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Have questions or want to learn more? Reach out to us and we'll get back to you as soon as possible.
            </motion.p>
          </div>
        </section>

        {/* Contact Info & Map Section */}
        <section className="py-16">
          <div className="container">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-8 text-foreground">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-2xl border border-teal/20">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        NO:16-2-741/D/24, 2nd Floor, Fazilat Manzil, Beside TV Tower Malakpet, Hyderabad-500036 T. S. INDIA.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-2xl border border-teal/20">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone Numbers</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+917075566244">+91 7075566244</a><br />
                        <a href="tel:+918555912484">+91 8555912484</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-2xl border border-teal/20">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Addresses</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:greenvehicleexpo01@gmail.com">greenvehicleexpo01@gmail.com</a><br />
                        <a href="mailto:expo1@mediaday.co.in">expo1@mediaday.co.in</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-xl rounded-2xl border border-teal/20">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Map & Contact Form */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-8 text-foreground">Find Us</h2>
                
                {/* Map Placeholder */}
                <div className="relative rounded-2xl overflow-hidden mb-8 h-64 lg:h-96 border border-teal/20">
                  <div className="w-full h-full bg-gradient-to-br from-teal/20 to-emerald-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-teal mx-auto mb-4" />
                      <p className="text-lg font-semibold text-foreground">Location Map</p>
                      <p className="text-muted-foreground">Interactive map showing our office location</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>
                
                {/* Contact Form */}
                <div>
                  <ContactForm />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;