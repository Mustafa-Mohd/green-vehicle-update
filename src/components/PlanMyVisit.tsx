import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, FileDown, Clock, MapPin, Car, Battery, Zap, Users, TrendingUp, Mail } from "lucide-react";
import { getAllExhibitors, getExhibitorsByCategory, getAllSessions, getSessionsByCategory, getAllDemos, getDemosByType } from "@/lib/dbService";
import { Exhibitor, Session, Demo } from "@/lib/types";

// Define types
type VisitPurpose = "learning" | "purchasing" | "networking" | "investment";
type InterestCategory = "two-wheeler" | "three-wheeler" | "four-wheeler" | "charging" | "battery";
type TimeAvailability = "half-day" | "full-day" | "multiple-days";

interface FormData {
  purpose: VisitPurpose[];
  interests: InterestCategory[];
  timeAvailability: TimeAvailability;
}

interface VisitPlan {
  summary: {
    purposes: VisitPurpose[];
    interests: InterestCategory[];
    timeAvailability: TimeAvailability;
  };
  exhibitors: Exhibitor[];
  sessions: Session[];
  demos: Demo[];
  route: Array<{
    id: string;
    boothNumber: string;
    location: string;
    estimatedTime: string;
  }>;
  suggestedSchedule: Array<{
    time: string;
    activity: string;
    location: string;
  }>;
  recommendations: Array<(Exhibitor & {
    reason: string;
    description?: string;
    highlights?: string[];
    website?: string;
    contact?: string;
  }) | (Exhibitor & {
    id: string;
    reason: string;
    description?: string;
    highlights?: string[];
    website?: string;
    contact?: string;
  })>;
}

const purposes: { value: VisitPurpose; label: string; icon: JSX.Element }[] = [
  { value: "learning", label: "Learning about EV technology", icon: <Zap className="w-4 h-4" /> },
  { value: "purchasing", label: "Purchasing vehicles/components", icon: <Car className="w-4 h-4" /> },
  { value: "networking", label: "Networking with industry professionals", icon: <Users className="w-4 h-4" /> },
  { value: "investment", label: "Investment opportunities", icon: <TrendingUp className="w-4 h-4" /> },
];

const interestCategories: { value: InterestCategory; label: string; icon: JSX.Element }[] = [
  { value: "two-wheeler", label: "Two-wheelers (2W)", icon: <Car className="w-4 h-4" /> },
  { value: "three-wheeler", label: "Three-wheelers (3W)", icon: <Car className="w-4 h-4" /> },
  { value: "four-wheeler", label: "Four-wheelers (4W)", icon: <Car className="w-4 h-4" /> },
  { value: "charging", label: "Charging Infrastructure", icon: <Zap className="w-4 h-4" /> },
  { value: "battery", label: "Battery Technology", icon: <Battery className="w-4 h-4" /> },
];

const timeAvailabilities: { value: TimeAvailability; label: string; icon: JSX.Element }[] = [
  { value: "half-day", label: "Half day (4 hours)", icon: <Clock className="w-4 h-4" /> },
  { value: "full-day", label: "Full day (8 hours)", icon: <Clock className="w-4 h-4" /> },
  { value: "multiple-days", label: "Multiple days (2+ days)", icon: <Clock className="w-4 h-4" /> },
];

// Mock data for recommendations
const mockExhibitors: Array<Exhibitor & {
  highlights?: string[];
  website?: string;
}> = [
  { 
    id: "1", 
    name: "EcoRide Motors", 
    category: "two-wheeler", 
    location: "Hall A", 
    boothNumber: "A-101", 
    estimatedTime: "30 min",
    description: "Leading manufacturer of electric scooters and bikes with cutting-edge battery technology.",
    contact: "info@ecoridemotors.com",
    technologies: ["Battery tech", "Smart connectivity"],
    highlights: ["Latest 2025 model launch", "Extended battery life", "Smart connectivity features"],
    website: "www.ecoridemotors.com"
  },
  { 
    id: "2", 
    name: "Urban Wheels", 
    category: "three-wheeler", 
    location: "Hall B", 
    boothNumber: "B-205", 
    estimatedTime: "45 min",
    description: "Specialized in electric rickshaws and delivery vehicles for urban transportation.",
    contact: "sales@urbanwheels.com",
    technologies: ["Commercial EVs", "Delivery systems"],
    highlights: ["Commercial fleet discounts", "Fast charging capability", "Government incentives"],
    website: "www.urbanwheels.com"
  },
  { 
    id: "3", 
    name: "Future Auto", 
    category: "four-wheeler", 
    location: "Hall C", 
    boothNumber: "C-301", 
    estimatedTime: "60 min",
    description: "Premium electric SUVs and sedans with autonomous driving capabilities.",
    contact: "info@futureauto.com",
    technologies: ["Autonomous driving", "Luxury interiors"],
    highlights: ["Luxury interior options", "Advanced safety features", "AI-powered assistance"],
    website: "www.futureauto.com"
  },
  { 
    id: "4", 
    name: "ChargeTech Solutions", 
    category: "charging", 
    location: "Hall D", 
    boothNumber: "D-401", 
    estimatedTime: "30 min",
    description: "Innovative fast-charging stations and infrastructure for EV networks.",
    contact: "contact@chargetech.com",
    technologies: ["Fast charging", "Solar integration"],
    highlights: ["Ultra-fast charging (0-80% in 15 mins)", "Solar powered stations", "Network management software"],
    website: "www.chargetech.com"
  },
  { 
    id: "5", 
    name: "PowerCells Inc", 
    category: "battery", 
    location: "Hall E", 
    boothNumber: "E-501", 
    estimatedTime: "45 min",
    description: "Next-generation lithium-ion batteries with enhanced energy density.",
    contact: "info@powercells.com",
    technologies: ["Lithium-ion", "Thermal management"],
    highlights: ["Longevity improvement", "Temperature control tech", "Recycling program"],
    website: "www.powercells.com"
  },
  { 
    id: "6", 
    name: "Green Mobility", 
    category: "four-wheeler", 
    location: "Hall A", 
    boothNumber: "A-105", 
    estimatedTime: "40 min",
    description: "Affordable electric cars targeting mass market adoption.",
    contact: "hello@greenmobility.com",
    technologies: ["Cost-effective", "Mass production"],
    highlights: ["Budget-friendly models", "Comprehensive warranty", "Nationwide service centers"],
    website: "www.greenmobility.com"
  },
  { 
    id: "7", 
    name: "Battery Innovations", 
    category: "battery", 
    location: "Hall B", 
    boothNumber: "B-201", 
    estimatedTime: "35 min",
    description: "Solid-state battery technology for next-gen EVs.",
    contact: "contact@batteryinnovations.com",
    technologies: ["Solid-state", "High energy density"],
    highlights: ["Safety improvements", "Energy density boost", "Faster charging"],
    website: "www.batteryinnovations.com"
  },
  { 
    id: "8", 
    name: "EV Charging Systems", 
    category: "charging", 
    location: "Hall C", 
    boothNumber: "C-305", 
    estimatedTime: "25 min",
    description: "Wireless charging solutions for electric vehicles.",
    contact: "support@evchargingsystems.com",
    technologies: ["Wireless charging", "Inductive coupling"],
    highlights: ["Contactless charging", "Integration with parking", "Smart payment options"],
    website: "www.evchargingsystems.com"
  },
  { 
    id: "9", 
    name: "Solar Charge Networks", 
    category: "charging", 
    location: "Hall D", 
    boothNumber: "D-405", 
    estimatedTime: "35 min",
    description: "Solar-powered EV charging stations for sustainable mobility.",
    contact: "info@solarcharge.com",
    technologies: ["Solar integration", "Grid independence"],
    highlights: ["Grid independence", "Carbon-neutral charging", "Modular installations"],
    website: "www.solarcharge.com"
  },
  { 
    id: "10", 
    name: "EcoBattery Recycling", 
    category: "battery", 
    location: "Hall E", 
    boothNumber: "E-505", 
    estimatedTime: "20 min",
    description: "End-of-life battery recycling services for EV manufacturers.",
    contact: "recycle@ecobattery.com",
    technologies: ["Recycling", "Material recovery"],
    highlights: ["95% material recovery", "Environmentally safe", "Supply chain partnerships"],
    website: "www.ecobatteryrecycling.com"
  },
];

const mockSessions: Array<{
  id: string;
  title: string;
  speaker: string;
  time: string;
  location: string;
  category: InterestCategory;
  duration: string;
  description?: string;
  attendees?: number;
}> = [
  { 
    id: "1", 
    title: "Future of Two-Wheeler EVs", 
    speaker: "Dr. Rajesh Kumar", 
    time: "10:00 AM", 
    location: "Conference Room A", 
    category: "two-wheeler", 
    duration: "45 min",
    description: "Exploring trends in electric motorcycles and scooters, market growth projections, and emerging technologies.",
    attendees: 85
  },
  { 
    id: "2", 
    title: "Battery Tech Innovations", 
    speaker: "Priya Sharma", 
    time: "11:30 AM", 
    location: "Conference Room B", 
    category: "battery", 
    duration: "60 min",
    description: "Deep dive into next-gen battery chemistries, energy density improvements, and safety measures.",
    attendees: 120
  },
  { 
    id: "3", 
    title: "Charging Infrastructure Trends", 
    speaker: "Amit Patel", 
    time: "1:00 PM", 
    location: "Conference Room C", 
    category: "charging", 
    duration: "45 min",
    description: "Analysis of global charging network expansion, government policies, and investment opportunities.",
    attendees: 95
  },
  { 
    id: "4", 
    title: "EV Market Investment Opportunities", 
    speaker: "Vikram Singh", 
    time: "2:30 PM", 
    location: "Conference Room A", 
    category: "charging", 
    duration: "60 min",
    description: "Identifying profitable sectors in the EV ecosystem and investment strategies.",
    attendees: 78
  },
  { 
    id: "5", 
    title: "Four-Wheeler EV Manufacturing", 
    speaker: "Sunita Reddy", 
    time: "4:00 PM", 
    location: "Conference Room B", 
    category: "four-wheeler", 
    duration: "45 min",
    description: "Manufacturing challenges, supply chain considerations, and production scaling strategies.",
    attendees: 65
  },
  { 
    id: "6", 
    title: "Autonomous Driving in EVs", 
    speaker: "Dr. Anil Mehta", 
    time: "10:30 AM", 
    location: "Conference Room D", 
    category: "four-wheeler", 
    duration: "50 min",
    description: "Integration of AI and autonomous driving technologies in electric vehicles.",
    attendees: 110
  },
  { 
    id: "7", 
    title: "Sustainable Battery Materials", 
    speaker: "Prof. Kavita Joshi", 
    time: "3:00 PM", 
    location: "Conference Room E", 
    category: "battery", 
    duration: "55 min",
    description: "Research on eco-friendly battery materials and reducing environmental impact.",
    attendees: 72
  },
  { 
    id: "8", 
    title: "EV Policy and Government Initiatives", 
    speaker: "Rajesh Gupta", 
    time: "11:00 AM", 
    location: "Main Stage", 
    category: "charging", 
    duration: "75 min",
    description: "Overview of government incentives, subsidies, and regulatory framework supporting EV adoption.",
    attendees: 200
  },
];

const mockDemos: Array<{
  id: string;
  name: string;
  type: InterestCategory;
  location: string;
  estimatedTime: string;
  description?: string;
  features?: string[];
}> = [
  { 
    id: "1", 
    name: "EcoRide Electric Scooter Test Ride", 
    type: "two-wheeler", 
    location: "Demo Area 1", 
    estimatedTime: "20 min",
    description: "Experience the smooth ride and responsive controls of our latest electric scooter model.",
    features: ["30 km range", "Regenerative braking", "App connectivity"]
  },
  { 
    id: "2", 
    name: "Urban Wheels Three-Wheeler Demo", 
    type: "three-wheeler", 
    location: "Demo Area 2", 
    estimatedTime: "25 min",
    description: "See the cargo capacity and maneuverability of our commercial electric rickshaw.",
    features: ["500 kg capacity", "All-weather roof", "Digital dashboard"]
  },
  { 
    id: "3", 
    name: "Future Auto Four-Wheeler Test Drive", 
    type: "four-wheeler", 
    location: "Demo Area 3", 
    estimatedTime: "30 min",
    description: "Take our premium electric SUV for a spin and experience luxury meets sustainability.",
    features: ["Autopilot mode", "Panoramic sunroof", "Premium sound system"]
  },
  { 
    id: "4", 
    name: "Fast Charging Station Experience", 
    type: "charging", 
    location: "Demo Area 4", 
    estimatedTime: "15 min",
    description: "Witness our ultra-fast charging technology in action and see how quickly you can charge an EV.",
    features: ["150kW power output", "Plug-and-charge", "Mobile app monitoring"]
  },
  { 
    id: "5", 
    name: "Battery Swap Technology Demo", 
    type: "battery", 
    location: "Demo Area 5", 
    estimatedTime: "20 min",
    description: "Experience our innovative battery swapping system that takes just 3 minutes.",
    features: ["3-minute swap time", "Universal compatibility", "Smart battery management"]
  },
  { 
    id: "6", 
    name: "Wireless Charging Demo", 
    type: "charging", 
    location: "Demo Area 6", 
    estimatedTime: "18 min",
    description: "See how our wireless charging pads can charge EVs without any cables.",
    features: ["Contactless charging", "Automatic alignment", "Weather resistant"]
  },
];

const mockRoute = [
  { id: "1", boothNumber: "A-101", location: "Hall A", estimatedTime: "30 min" },
  { id: "2", boothNumber: "B-205", location: "Hall B", estimatedTime: "45 min" },
  { id: "3", boothNumber: "C-301", location: "Hall C", estimatedTime: "60 min" },
  { id: "4", boothNumber: "D-401", location: "Hall D", estimatedTime: "30 min" },
];

export const PlanMyVisit = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    purpose: [],
    interests: [],
    timeAvailability: "half-day"
  });
  const [visitPlan, setVisitPlan] = useState<VisitPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  
  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      const exhibitorsResult = await getAllExhibitors();
      if (exhibitorsResult.data) setExhibitors(exhibitorsResult.data);
      
      const sessionsResult = await getAllSessions();
      if (sessionsResult.data) setSessions(sessionsResult.data);
      
      const demosResult = await getAllDemos();
      if (demosResult.data) setDemos(demosResult.data);
    };
    
    loadData();
  }, []);

  const handlePurposeChange = (value: VisitPurpose) => {
    setFormData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(value)
        ? prev.purpose.filter(p => p !== value)
        : [...prev.purpose, value]
    }));
  };

  const handleInterestChange = (value: InterestCategory) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }));
  };

  const handleTimeChange = (value: TimeAvailability) => {
    setFormData(prev => ({
      ...prev,
      timeAvailability: value
    }));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Filter recommendations based on user selections
    const filteredExhibitors = exhibitors.length > 0 
      ? exhibitors.filter(exhibitor => 
          formData.interests.includes(exhibitor.category)
        )
      : mockExhibitors.filter(mockExhibitor => 
          formData.interests.includes(mockExhibitor.category)
        );
    
    const filteredSessions = sessions.length > 0
      ? sessions.filter(session => 
          formData.interests.includes(session.category) || 
          (session.category === "charging" && formData.purpose.includes("investment" as VisitPurpose))
        )
      : mockSessions.filter(mockSession => 
          formData.interests.includes(mockSession.category) || 
          (mockSession.category === "charging" && formData.purpose.includes("investment" as VisitPurpose))
        );
    
    const filteredDemos = demos.length > 0
      ? demos.filter(demo => 
          formData.interests.includes(demo.type)
        )
      : mockDemos.filter(mockDemo => 
          formData.interests.includes(mockDemo.type)
        );
    
    // Create a simple route based on filtered exhibitors
    const route = filteredExhibitors.length > 0
      ? filteredExhibitors.map((exhibitor, index) => ({
          id: `route-${index}`,
          boothNumber: exhibitor.boothNumber,
          location: exhibitor.location,
          estimatedTime: exhibitor.estimatedTime
        }))
      : mockExhibitors.filter(mockExhibitor => 
          formData.interests.includes(mockExhibitor.category)
        ).map((exhibitor, index) => ({
          id: `route-mock-${index}`,
          boothNumber: exhibitor.boothNumber,
          location: exhibitor.location,
          estimatedTime: exhibitor.estimatedTime
        }));
    
    // Generate suggested schedule based on time availability
    const generateSuggestedSchedule = () => {
      const schedule = [];
      
      if (formData.timeAvailability === 'half-day') {
        schedule.push(
          { time: '10:00–12:00', activity: 'Visit 2W & 3W Pavilions', location: 'Halls A & B' },
          { time: '12:00–1:00', activity: 'Lunch Break', location: 'Food Court' },
          { time: '1:00–3:00', activity: 'Charging & Battery Zones', location: 'Halls C & D' }
        );
      } else {
        schedule.push(
          { time: '10:00–12:00', activity: '2W & 3W Pavilion', location: 'Halls A & B' },
          { time: '12:00–1:00', activity: 'Lunch Break', location: 'Food Court' },
          { time: '1:00–3:00', activity: 'Charging Infrastructure Zone', location: 'Hall C' },
          { time: '3:00–4:00', activity: 'Networking Lounge', location: 'Hall E' },
          { time: '4:00–6:00', activity: '4W Pavilion & Test Rides', location: 'Hall F' },
          { time: '5:30–6:00', activity: 'Panel: "Future of EV in India"', location: 'Main Stage' }
        );
      }
      
      return schedule;
    };
    
    const newVisitPlan = {
      summary: {
        purposes: formData.purpose,
        interests: formData.interests,
        timeAvailability: formData.timeAvailability
      },
      exhibitors: filteredExhibitors,
      sessions: filteredSessions,
      demos: filteredDemos,
      route: route,
      suggestedSchedule: generateSuggestedSchedule(),
      recommendations: filteredExhibitors.map(exhibitor => ({
        ...exhibitor,
        reason: `Matches your interest in ${exhibitor.category.replace('-', ' ')}`
      }))
    };
    
    setVisitPlan(newVisitPlan);
    setIsGenerating(false);
    setStep(2); // Move to results view
  };

  const resetForm = () => {
    setFormData({
      purpose: [],
      interests: [],
      timeAvailability: "half-day"
    });
    setVisitPlan(null);
    setStep(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    alert("PDF export functionality would be implemented here");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-teal">
            Plan My Visit
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Create a personalized itinerary for your EV Expo experience
          </p>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-8">
              {/* Purpose Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal" />
                  Purpose of Visit
                </h3>
                <p className="text-muted-foreground">
                  Select all that apply to your visit objectives
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {purposes.map((purpose) => (
                    <div 
                      key={purpose.value}
                      className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                        formData.purpose.includes(purpose.value) 
                          ? "border-teal bg-teal/5" 
                          : "hover:border-teal/50"
                      }`}
                      onClick={() => handlePurposeChange(purpose.value)}
                    >
                      <Checkbox
                        checked={formData.purpose.includes(purpose.value)}
                        onCheckedChange={() => handlePurposeChange(purpose.value)}
                        className="mt-0.5"
                      />
                      <div className="space-y-1 leading-none">
                        <Label className="font-medium flex items-center gap-2">
                          {purpose.icon}
                          {purpose.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Interest Categories */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Car className="w-5 h-5 text-teal" />
                  Interest Categories
                </h3>
                <p className="text-muted-foreground">
                  Select the categories you're interested in
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestCategories.map((category) => (
                    <div 
                      key={category.value}
                      className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                        formData.interests.includes(category.value) 
                          ? "border-teal bg-teal/5" 
                          : "hover:border-teal/50"
                      }`}
                      onClick={() => handleInterestChange(category.value)}
                    >
                      <Checkbox
                        checked={formData.interests.includes(category.value)}
                        onCheckedChange={() => handleInterestChange(category.value)}
                        className="mt-0.5"
                      />
                      <div className="space-y-1 leading-none">
                        <Label className="font-medium flex items-center gap-2">
                          {category.icon}
                          {category.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Time Availability */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal" />
                  Time Availability
                </h3>
                <p className="text-muted-foreground">
                  How much time do you have for the visit?
                </p>
                <RadioGroup 
                  value={formData.timeAvailability} 
                  onValueChange={(value: TimeAvailability) => handleTimeChange(value)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  {timeAvailabilities.map((option) => (
                    <div 
                      key={option.value}
                      className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
                        formData.timeAvailability === option.value 
                          ? "border-teal bg-teal/5" 
                          : "hover:border-teal/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center gap-2 w-full">
                        {option.icon}
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="pt-6 flex justify-center">
                <Button 
                  onClick={handleSubmit}
                  disabled={formData.purpose.length === 0 || formData.interests.length === 0}
                  className="bg-gradient-to-r from-teal to-emerald-500 hover:from-teal/90 hover:to-emerald-500/90 text-white px-8 py-6 text-lg"
                >
                  {isGenerating ? "Generating Plan..." : "Generate My Personalized Visit Plan"}
                </Button>
              </div>
            </div>
          ) : (
            visitPlan && (
              <div className="space-y-8">
                {/* Summary */}
                <Card className="bg-gradient-to-r from-teal/10 to-emerald-500/10 border-teal/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal" />
                      Your Personalized Visit Plan
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-2">Purpose</h4>
                        <div className="flex flex-wrap gap-2">
                          {visitPlan.summary.purposes.map(purpose => {
                            const purposeData = purposes.find(p => p.value === purpose);
                            return (
                              <Badge key={purpose} variant="secondary" className="bg-teal/20 border-teal/30 text-teal">
                                {purposeData?.icon}
                                <span className="ml-1">{purposeData?.label}</span>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {visitPlan.summary.interests.map(interest => {
                            const interestData = interestCategories.find(i => i.value === interest);
                            return (
                              <Badge key={interest} variant="secondary" className="bg-teal/20 border-teal/30 text-teal">
                                {interestData?.icon}
                                <span className="ml-1">{interestData?.label}</span>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-2">Time Available</h4>
                        <div>
                          <Badge variant="secondary" className="bg-teal/20 border-teal/30 text-teal">
                            {timeAvailabilities.find(t => t.value === visitPlan.summary.timeAvailability)?.icon}
                            <span className="ml-1">{timeAvailabilities.find(t => t.value === visitPlan.summary.timeAvailability)?.label}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print Plan
                      </Button>
                      <Button onClick={handleExportPdf} variant="outline" className="flex items-center gap-2">
                        <FileDown className="w-4 h-4" />
                        Export PDF
                      </Button>
                      <Button onClick={resetForm} variant="secondary">
                        Create New Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recommended Exhibitors */}
                <Card className="border-0 shadow-none bg-card/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Car className="w-6 h-6 text-teal" />
                      Recommended Exhibitors for You
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {visitPlan.recommendations.slice(0, 4).map((exhibitor, index) => (
                        <Card key={exhibitor.id} className="border-l-4 border-l-teal hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg">{exhibitor.name}</h4>
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="secondary" className="bg-teal/10 text-teal capitalize">
                                    {exhibitor.category.replace('-', ' ')}
                                  </Badge>
                                  <Badge variant="outline" className="text-muted-foreground">
                                    Booth {exhibitor.boothNumber} • {exhibitor.location}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 italic">
                                  {exhibitor.reason}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {exhibitor.description}
                                </p>
                                {exhibitor.highlights && exhibitor.highlights.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {exhibitor.highlights.slice(0, 3).map((highlight, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                                <Button variant="outline" size="sm">
                                  Add to My Plan
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {visitPlan.recommendations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No exhibitors match your selected interests
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Suggested Schedule */}
                <Card className="border-0 shadow-none bg-card/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Clock className="w-6 h-6 text-teal" />
                      Suggested Day Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {visitPlan.suggestedSchedule.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border/50">
                          <div className="bg-teal/10 text-teal rounded-lg w-16 h-16 flex flex-col items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold">{index + 1}</span>
                            <span className="text-xs text-center text-teal/70">{item.time}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.activity}</h4>
                            <p className="text-muted-foreground">{item.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for different sections */}
                <Tabs defaultValue="exhibitors" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="demos">Demos & Test Rides</TabsTrigger>
                    <TabsTrigger value="route">Optimized Route</TabsTrigger>
                    <TabsTrigger value="actions">Smart Actions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="exhibitors" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Car className="w-5 h-5 text-teal" />
                      Recommended Exhibitors
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {visitPlan.exhibitors.length > 0 ? (
                          visitPlan.exhibitors.map(exhibitor => (
                            <Card key={exhibitor.id} className="border-l-4 border-l-teal">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-lg">{exhibitor.name}</h4>
                                    <p className="text-muted-foreground">{exhibitor.location} - Booth {exhibitor.boothNumber}</p>
                                    <div className="flex items-center mt-2 gap-4">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {exhibitor.estimatedTime}
                                      </div>
                                      <Badge variant="secondary" className="bg-teal/10 text-teal capitalize">
                                        {exhibitor.category.replace("-", " ")}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                              No exhibitors match your selected interests
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="sessions" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-teal" />
                      Recommended Sessions
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {visitPlan.sessions.length > 0 ? (
                          visitPlan.sessions.map(session => (
                            <Card key={session.id} className="border-l-4 border-l-teal">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{session.title}</h4>
                                    <p className="text-muted-foreground">Speaker: {session.speaker}</p>
                                    <div className="flex items-center mt-2 gap-4">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {session.time} • {session.duration}
                                      </div>
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {session.location}
                                      </div>
                                      <Badge variant="secondary" className="bg-teal/10 text-teal capitalize">
                                        {session.category.replace("-", " ")}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                      {session.description}
                                    </p>
                                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                                      <Users className="w-4 h-4 mr-1" />
                                      {session.attendees} expected attendees
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                              No sessions match your selected interests
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="demos" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Car className="w-5 h-5 text-teal" />
                      Demo & Test Ride Opportunities
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {visitPlan.demos.length > 0 ? (
                          visitPlan.demos.map(demo => (
                            <Card key={demo.id} className="border-l-4 border-l-teal">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{demo.name}</h4>
                                    <p className="text-muted-foreground">{demo.location}</p>
                                    <div className="flex items-center mt-2 gap-4">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {demo.estimatedTime}
                                      </div>
                                      <Badge variant="secondary" className="bg-teal/10 text-teal capitalize">
                                        {demo.type.replace("-", " ")}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                      {demo.description}
                                    </p>
                                    {demo.features && demo.features.length > 0 && (
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        {demo.features.slice(0, 3).map((feature, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                              No demo opportunities match your selected interests
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="route" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal" />
                      Optimized Visit Route
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {visitPlan.route.length > 0 ? (
                          visitPlan.route.map((point, index) => (
                            <Card key={point.id} className="border-l-4 border-l-teal">
                              <CardContent className="p-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white font-bold mr-4">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">Booth {point.boothNumber}</h4>
                                    <p className="text-muted-foreground">{point.location}</p>
                                    <div className="flex items-center mt-2">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Estimated time: {point.estimatedTime}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                              No route points available
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="actions" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-teal" />
                      Smart Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <FileDown className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Save My Plan</h4>
                            <p className="text-sm text-muted-foreground">Save your personalized visit plan to your account</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Email My Itinerary</h4>
                            <p className="text-sm text-muted-foreground">Receive your plan via email for easy access</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <Car className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Book Test Ride</h4>
                            <p className="text-sm text-muted-foreground">Reserve your preferred test ride slots</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <FileDown className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Export as PDF</h4>
                            <p className="text-sm text-muted-foreground">Download your plan as a printable PDF</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Access on Mobile</h4>
                            <p className="text-sm text-muted-foreground">Scan QR code to access plan on your phone</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 border-dashed border-teal/30 hover:border-teal/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-teal" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Modify My Preferences</h4>
                            <p className="text-sm text-muted-foreground">Adjust your plan based on new interests</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-6 flex justify-center">
                  <Button onClick={resetForm} variant="outline">
                    Create Another Plan
                  </Button>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-container {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 1rem;
          }
          
          .print-card {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
};