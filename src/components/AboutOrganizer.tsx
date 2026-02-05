import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Globe, 
  Building2, 
  Award, 
  MapPin, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const galleryImages = [
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.55.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.51.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.53.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.54-1.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.53-1.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.50.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2021/12/gallery7.jpg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.54.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.52.jpeg",
  "https://greenvehicleexpo.com/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-14-at-13.00.49.jpeg",
];

const achievements = [
  { year: "2021", event: "6th Edition of Truck Trailer and Tyre Expo", location: "Coimbatore" },
  { year: "2020", event: "3rd Edition of Auto Technika", location: "Bangalore" },
  { year: "2019", event: "Green Vehicle Expo", location: "Hyderabad" },
  { year: "2018", event: "2nd Edition of Dairy Expo and Food Expo", location: "Hyderabad" },
];

export const AboutOrganizer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedGallery, setExpandedGallery] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-teal/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-teal/20 text-teal border-teal/30 mb-6">
              <Users className="w-4 h-4 mr-2" />
              About the Organizer
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">
                Media Day Marketing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting the automotive industry with innovative B2B platforms
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-teal" />
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Working with a Mission to Bring Together all the stakeholders in the Automobile sector onto one platform and create a B2B business environment that leads to mutual benefit of the stakeholders, Media Day Marketing (MDM) has come up with successful events like 6th edition of Truck Trailer and Tyre Expo, 3rd edition of Auto Technika, Green Vehicle Expo, 2nd edition of Dairy Expo and Food Expo. MDM will be stepping into the International Arena by organizing the International Overseas Edition of Truck Trailer and Tyre Expo in UAE and a similar event in Istanbul, Turkey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-teal" />
                  Global Reach & Impact
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The Rapid Globalization and the Make in India Concept promoted by the Government of India has opened the doors to Global Manufactures and Suppliers to Explore the market potential in India.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our Events have been connecting all the stake holders in the Indian Automobile sector including Manufacturers, Suppliers, Distributors, OEMs and Members of the Allied Industry and stand as a Meeting Platform between the International community and the Indian stake holders to meet each other and establish business communication to fulfill their demand.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-teal" />
                  Notable Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className="border-teal/20 bg-card/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{achievement.event}</h3>
                            <p className="text-muted-foreground">{achievement.location}</p>
                          </div>
                          <Badge variant="outline" className="bg-teal/10 border-teal/30 text-teal">
                            {achievement.year}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-teal" />
                  Government Partnerships
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  MDM has been closely working with Federation of Chambers and Commerce in Telangana and Karnataka in creating the right opportunities for the industry members through our events in Bangalore and Hyderabad.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Attracting Visitors from all the states as well as Globally, Our events have been visited by International business delegations such as Mr Kim Jun-Seong, the Governor of Yeonggwang, South Korea who was accompanied by his delegation comprising of Trade Representatives on a mission to know about the new technological trends and market development avenues in Indian Auto sector.
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="border-teal/20 bg-gradient-to-br from-teal/5 to-emerald-500/5">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://greenvehicleexpo.com/wp-content/uploads/2021/12/karnatka.png" 
                        alt="Karnataka Logo"
                        className="w-16 h-16 object-contain"
                      />
                      <div className="ml-4">
                        <h3 className="font-bold text-lg">Karnataka Partnership</h3>
                        <p className="text-sm text-muted-foreground">Government Collaboration</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Events have been supported by the Government of Karnataka with various minister inaugurations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border-teal/20 bg-card/50">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-teal" />
                      Recent Events
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm">Truck Trailer and Tyre Expo - Gujarat (CM Inauguration)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm">Auto Technika - Jaipur (Transport Minister)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm">Green Vehicle Expo - Inaugurated by HH Sri Sri Ravi Shankarji</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-background to-teal/5">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="bg-teal/20 text-teal border-teal/30 mb-6">
              Gallery
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-500">Highlights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Capturing memorable moments from our successful events
            </p>
          </div>

          {/* Featured Image Carousel */}
          <div className="relative mb-12">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img 
                src={galleryImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white">Event Highlight #{currentImageIndex + 1}</h3>
                <p className="text-white/80">Memorable moment from our events</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex 
                    ? "ring-4 ring-teal scale-105" 
                    : "hover:scale-105 hover:ring-2 hover:ring-teal/50"
                }`}
                onClick={() => goToImage(index)}
              >
                <img 
                  src={image}
                  alt={`Gallery thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* More Information Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Green Vehicle Expo Highlights</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Green Vehicle Expo was the hub of the Made in India and Make in India concept being promoted by the Government of India. It showcased the latest 2 wheelers, 3 Wheelers, Conversion Technology, Hybrid Vehicles, Electric Vehicle infrastructure, parts and allied industry. The event has featured product launch by companies like LOG9, BNC Motors launching their new range of electric vehicles which included different vehicles across EV segments like 2- Wheelers, 3- Wheelers & 4 Wheelers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-6">Partnerships & Support</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our effort to reach to the Indian Automotive Industry is supported by Reputed Organizations like Automobile Research Association of India (ARAI), International Centre for Automotive Technology (ICAT), (Indian Rubber Manufacturers Research Association (IRMRA) and other leading bodies. Ministry of Commerce & Industry And Civil Aviation Government of India, Government of Karnataka, All India Motor Transport Congress, Auto Dealers Association Bangalore, Karnataka Automobiles Parts & Allied Merchants Associations Bangalore, Karnataka Two Wheelers Workshop Owners & Technicians Associations Bangalore, Hubbali Automobile Dealers Association Hubbali, along with all major transport associations in the country have extended their support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};