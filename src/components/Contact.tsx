import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange font-semibold tracking-wider uppercase text-sm">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Let's Start a
              <span className="gradient-text"> Conversation</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Whether you're interested in exhibiting, visiting, or partnering with us, 
              we'd love to hear from you. Our team is ready to help you make the most 
              of our trade exhibitions.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-secondary rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <a href="mailto:info@mediaday.co.in" className="text-orange hover:underline">
                    info@mediaday.co.in
                  </a>
                  <br />
                  <a href="mailto:expo@mediaday.co.in" className="text-muted-foreground hover:text-orange">
                    expo@mediaday.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-secondary rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                  <a href="tel:+919341473494" className="text-orange hover:underline">
                    +91-93414 73494
                  </a>
                  <br />
                  <a href="tel:+919342185915" className="text-muted-foreground hover:text-orange">
                    +91-93421 85915
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-secondary rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-muted-foreground mb-4 font-medium">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/trucktrailer.tyre.3" },
                  { icon: Instagram, href: "https://www.instagram.com/mdmhyderabad/" },
                  { icon: Twitter, href: "https://twitter.com/MDMHyderabad" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/media-day-marketing-2a80271aa" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-orange hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Send us a Message
              </h3>
              <p className="text-muted-foreground mb-8">
                Fill out the form and we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="John Doe"
                      className="h-12 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Company
                    </label>
                    <Input
                      placeholder="Your Company"
                      className="h-12 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="john@company.com"
                      className="h-12 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="h-12 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Inquiry Type
                  </label>
                  <select className="w-full h-12 px-3 bg-secondary border border-border rounded-lg text-foreground">
                    <option value="">Select an option</option>
                    <option value="exhibitor">Exhibitor Inquiry</option>
                    <option value="visitor">Visitor Registration</option>
                    <option value="sponsor">Sponsorship Opportunity</option>
                    <option value="media">Media Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    required
                    placeholder="Tell us about your requirements..."
                    className="min-h-[120px] bg-secondary border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold h-14 text-lg btn-glow"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
