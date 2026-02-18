import { motion } from "framer-motion";
import { GreenVehicleExpoHeader } from "@/components/GreenVehicleExpoHeader";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone, User, Award, Crown, Star, Shield, Badge, Droplets, Ticket } from "lucide-react";

interface SponsorTier {
    title: string;
    price: string;
    icon: any;
    color: string;
    boothSpace?: string;
    benefits: string[];
    popular?: boolean;
}


// Helper component for Silver icon since Lucide might not have 'Silver'
const MedalIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
);

const sponsorshipTiers: SponsorTier[] = [
    {
        title: "Title Sponsor",
        price: "₹30 Lacs + GST",
        icon: Crown,
        color: "from-yellow-400 to-amber-600",
        boothSpace: "200 sqm (Central Prime Location)",
        benefits: [
            "Sponsor’s Name highlighted in event name (e.g., ABC Limited presents EXPO NAME)",
            "Sponsor’s CEO on Dias at Inaugural function",
            "Logo as 'Title Sponsor' in all publicity materials, website, social media, VIP invitations",
            "Cover page of Exhibitor directory (softcopy)",
            "Inside front cover advertisement in Exhibition Directory",
            "Two Sponsor’s Hoardings in the Exhibition (10ft x 10ft)",
            "4 standees of the Sponsor at the Exhibition",
            "Literature distribution at registration desk & VIP Lounge",
            "Announcement in Press release / Newsletters"
        ],
        popular: true
    },
    {
        title: "Event Partner",
        price: "₹25 Lacs + GST",
        icon: User,
        color: "from-blue-500 to-indigo-600",
        boothSpace: "160 sqm (Premium High-Traffic Zone)",
        benefits: [
            "Logo as 'Event Partner' on all printed literature, publicity campaign, website, etc.",
            "2 standees of the Sponsor at the Exhibition",
            "Literature distribution at registration desk & VIP Lounge",
            "One page advertisement in Exhibition Directory",
            "Highlighted as 'Event Partner' in post-show report and website"
        ]
    },
    {
        title: "Platinum Sponsor",
        price: "₹20 Lacs + GST",
        icon: Star,
        color: "from-slate-300 to-slate-500",
        boothSpace: "120 sqm",
        benefits: [
            "Logo as 'Platinum Sponsor' on website, printed literature, publicity campaign",
            "Branding in invitation tickets",
            "Logo as 'Platinum Sponsor' on on-site signages and backdrop",
            "One page advertisement in Exhibition Directory",
            "Highlighted as 'Platinum Sponsor' in post-show report"
        ]
    },
    {
        title: "Diamond Sponsor",
        price: "₹15 Lacs + GST",
        icon: Shield,
        color: "from-cyan-300 to-blue-500",
        boothSpace: "100 sqm",
        benefits: [
            "Logo as 'Diamond Sponsor' on website, printed literature, etc.",
            "Logo as 'Diamond Sponsor' on on-site signages and backdrop",
            "One page advertisement in Exhibition Directory",
            "Highlighted as 'Diamond Sponsor' in post-show report"
        ]
    },
    {
        title: "Gold Sponsor",
        price: "₹10 Lacs + GST",
        icon: Award,
        color: "from-yellow-300 to-yellow-500",
        boothSpace: "72 sqm",
        benefits: [
            "Logo as 'Gold Sponsor' on printed literature, website, VIP invitations",
            "Branding in invitation tickets",
            "Logo as 'Gold Sponsor' on on-site signages and backdrop",
            "One page advertisement in Exhibition Directory",
            "Highlighted as 'Gold Sponsor' in post-show report"
        ]
    },
    {
        title: "Silver Sponsor",
        price: "₹7 Lacs + GST",
        icon: MedalIcon, // Using a placeholder, defining below
        color: "from-gray-300 to-gray-400",
        boothSpace: "50 sqm",
        benefits: [
            "Logo as 'Silver Sponsor' on printed literature, website, etc.",
            "Branding in invitation tickets",
            "Logo as 'Silver Sponsor' on on-site signages and backdrop",
            "One page advertisement in Exhibition Directory",
            "Highlighted as 'Silver Sponsor' in post-show report"
        ]
    },
    {
        title: "Lanyard Sponsor",
        price: "₹7.5 Lacs + GST",
        icon: Badge,
        color: "from-pink-500 to-rose-600",
        benefits: [
            "Name and logo on the lanyard for high brand visibility",
            "Branding on website as Lanyard sponsor with link to company home page",
            "Logo in print material and advertisement material",
            "One page advertisement in Show Directory",
            "Special Mention in Post show report"
        ]
    },
    {
        title: "Exhibitor Badge Sponsor",
        price: "₹3 Lacs + GST",
        icon: Ticket,
        color: "from-orange-400 to-red-500",
        boothSpace: "09 sqm",
        benefits: [
            "Logo on front side, company profile & contact on back side of badge",
            "Exclusive branding as badge partner on literature & website",
            "Mention as logo partner on website",
            "Special mailer invitation to visit sponsor's stall",
            "One page advertisement in Exhibitor directory",
            "Exclusive campaign on social media"
        ]
    },
    {
        title: "Water Bottle Sponsor",
        price: "₹3 Lacs + GST",
        icon: Droplets,
        color: "from-sky-400 to-blue-500",
        boothSpace: "09 sqm",
        benefits: [
            "Logo as 'Water Bottle Sponsor' on website, literature, etc.",
            "Branding in invitation tickets",
            "Logo as 'Water Sponsor' on on-site signages",
            "One page advertisement in e-Exhibition Directory",
            "Highlighted as 'Water Sponsor' in post-show report",
            "500 ml water bottles delivered to all exhibitors with sponsor's branding"
        ]
    }
];


const SponsorshipPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <GreenVehicleExpoHeader />

            {/* Hero Section */}
            <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 to-slate-900/80 z-0" />
                <div className="absolute inset-0 bg-[url('https://greenvehicleexpo.com/wp-content/uploads/2021/12/about_bg.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />

                <div className="container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-6xl font-bold mb-6 px-4"
                    >
                        Sponsorship <span className="text-teal-400">Opportunities</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Your participation as a sponsor will ensure your brand visibility among the stake holders in the industry and will help you in creating a Global Image and better market penetration.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-20 container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-slate-100"
                >
                    <h3 className="text-2xl font-bold mb-4 text-center text-slate-800">Interested in Sponsoring?</h3>
                    <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
                        MDM offers a variety of sponsorship opportunities tailored to suit your needs. Our team is happy to discuss any new proposals you may wish to put forward.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-center">
                            <h4 className="font-semibold text-slate-900 mb-1">Contact Person</h4>
                            <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg">
                                <User className="w-5 h-5" /> Mr. Kashif Raza
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-slate-300"></div>
                        <div className="text-center">
                            <h4 className="font-semibold text-slate-900 mb-1">Direct Line</h4>
                            <a href="tel:+919342185915" className="flex items-center justify-center gap-2 text-primary hover:underline font-bold text-lg">
                                <Phone className="w-5 h-5" /> +91 93421 85915
                            </a>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-slate-300"></div>
                        <div className="text-center">
                            <h4 className="font-semibold text-slate-900 mb-1">Email Us</h4>
                            <a href="mailto:team@mediaday.co.in" className="flex items-center justify-center gap-2 text-primary hover:underline font-bold text-lg">
                                <Mail className="w-5 h-5" /> team@mediaday.co.in
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Sponsorship Tiers Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {sponsorshipTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className={`relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col ${tier.popular ? 'ring-2 ring-amber-400' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Featured
                                </div>
                            )}

                            {/* Card Header */}
                            <div className={`p-6 bg-gradient-to-r ${tier.color} text-white`}>
                                <tier.icon className="w-10 h-10 mb-4 opacity-90" />
                                <h3 className="text-2xl font-bold">{tier.title}</h3>
                                <div className="text-3xl font-extrabold mt-2 tracking-tight">
                                    {tier.price}
                                </div>
                                {tier.boothSpace && (
                                    <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded text-sm font-medium backdrop-blur-sm">
                                        Booth: {tier.boothSpace}
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-grow">
                                <h4 className="font-semibold text-slate-900 mb-4 border-b pb-2">Key Benefits</h4>
                                <ul className="space-y-3">
                                    {tier.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Card Footer */}
                            <div className="p-6 pt-0 mt-auto">
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6">
                                    Inquire Now
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Ending Animation Section */}
            <section className="py-16 md:py-20 bg-slate-900 text-white overflow-hidden relative">
                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Boost Your Brand?</h2>
                        <p className="text-xl text-slate-300 mb-8">Join us in shaping the future of electric mobility.</p>
                        <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 h-14 text-lg rounded-full shadow-lg shadow-teal-500/20">
                            Contact Sponsorship Team
                        </Button>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                />
            </section>

            <footer className="py-12 bg-white border-t border-slate-200">
                <div className="container text-center">
                    <p className="text-slate-500">
                        © 2026 Green Vehicle Expo. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default SponsorshipPage;
