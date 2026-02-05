export interface Event {
  id: string;
  name: string;
  url: string;
  logo?: string;
  industry: string;
  status: 'upcoming' | 'live' | 'past';
  date?: string;
  venue?: string;
}

export const events: Event[] = [
  {
    id: "truck-trailer",
    name: "Truck Trailer and Tyre Expo",
    url: "https://trucktrailerntyreexpo.com/",
    industry: "Automotive",
    status: "upcoming",
    date: "Jan 2026",
    venue: "Hyderabad"
  },
  {
    id: "green-vehicle",
    name: "Green Vehicle Expo",
    url: "https://greenvehicleexpo.com/",
    logo: "https://greenvehicleexpo.com/wp-content/uploads/2019/05/Green-Vehicle-Expo-2026-logo-with-date.png",
    industry: "E-Mobility",
    status: "upcoming",
    date: "Apr 2026",
    venue: "Mumbai"
  },
  {
    id: "auto-technika",
    name: "Auto Technika",
    url: "https://www.autotechnika.in/",
    industry: "Automotive",
    status: "upcoming",
    date: "2026",
    venue: "TBA"
  },
  {
    id: "dairy-expo",
    name: "Dairy Expo",
    url: "https://dairyexpo.in/",
    industry: "Dairy",
    status: "upcoming",
    date: "2026",
    venue: "Delhi"
  },
  {
    id: "food-expo",
    name: "Food Expo",
    url: "https://foodexpo.in/",
    industry: "Food Processing",
    status: "upcoming",
    date: "2026",
    venue: "Hyderabad"
  },
  {
    id: "bke-expo",
    name: "BKE Expo",
    url: "https://bkeexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "green-energy",
    name: "India Green Energy Expo",
    url: "https://indiagreenenergyexpo.com/",
    industry: "Renewable Energy",
    status: "upcoming",
    date: "2026",
    venue: "Hyderabad"
  },
  {
    id: "paint-coating",
    name: "Paint and Coating Expo",
    url: "https://paintandcoatingexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "poultry-expo",
    name: "Poultry Expo",
    url: "https://www.poultryindiaexpo.com/",
    industry: "Poultry",
    status: "upcoming",
    date: "2026",
    venue: "Hyderabad"
  },
  {
    id: "doors-windows",
    name: "Doors Windows and Facades Expo",
    url: "https://doorsandwindowsexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "warehouse-logistics",
    name: "Warehouse Logistics & Material Handling Expo",
    url: "https://wlmhexpo.com/",
    industry: "Logistics",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "tea-coffee",
    name: "India Tea and Coffee Expo",
    url: "https://itcexpo.in/",
    industry: "Food Processing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "plastech",
    name: "Plastech India Expo",
    url: "https://plastindiaexpo.com/",
    industry: "Manufacturing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "automation-robotics",
    name: "India Automation & Robotics Expo",
    url: "https://indiaautomationandroboticsexpo.com/",
    industry: "Smart Technology",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "smart-home",
    name: "Smart Home & Office Expo",
    url: "https://smarthomeandofficeexpo.com/",
    industry: "Smart Technology",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "cable-wire",
    name: "Cable And Wire Expo",
    url: "https://cableandwireexpo.com/",
    industry: "Manufacturing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "chemical-expo",
    name: "India Chemical Expo",
    url: "https://indiachemicalexpo.com/",
    industry: "Manufacturing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "paper-india",
    name: "Paper India Expo",
    url: "https://paperindiaexpo.com/",
    industry: "Paper Industry",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "salon-spa",
    name: "India Salon & Spa Expo",
    url: "https://indiasalonnspaexpo.com/",
    industry: "Wellness",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "cyber-security",
    name: "India Cyber Security Expo",
    url: "https://cybersecurityexpo.in/",
    industry: "Cyber Security",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "wastetech",
    name: "WasteTech India Expo",
    url: "https://wastetechindia.com/",
    industry: "Recycling",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "it-expo",
    name: "India Information Technology Expo",
    url: "https://iitex.in/",
    industry: "Smart Technology",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "fragrance",
    name: "India Fragrance Expo",
    url: "https://indiafragranceexpo.com/",
    industry: "Wellness",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "label-barcode",
    name: "Label & Barcode Expo",
    url: "https://labelnbarcodeexpo.com/",
    industry: "Manufacturing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "print-packaging",
    name: "Print & Packaging Expo",
    url: "https://printnpackagingexpo.com/",
    industry: "Manufacturing",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "pharma-expo",
    name: "Bharat Pharma Expo",
    url: "https://bharatpharmaexpo.com/",
    industry: "Pharma",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "wall-floor-ceiling",
    name: "Wall, Floor & Ceiling Expo",
    url: "https://wallfloorandceilingexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "building-materials",
    name: "Advanced Building Materials Expo",
    url: "https://advancedbuildingmaterialsexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  },
  {
    id: "interior-decor",
    name: "Interior and Decor Expo",
    url: "https://interiorndecorexpo.com/",
    industry: "Construction",
    status: "upcoming",
    date: "2026",
    venue: "Bangalore"
  }
];

export const industries = [
  "Automotive",
  "Food Processing",
  "Dairy",
  "Renewable Energy",
  "E-Mobility",
  "Logistics",
  "Construction",
  "Smart Technology",
  "Poultry",
  "Cyber Security",
  "Paper Industry",
  "Recycling",
  "Manufacturing",
  "Wellness",
  "Pharma"
];

export const testimonials = [
  {
    name: "Navneet Singh",
    role: "Aselor India & WAS Automotives - Poland",
    quote: "Excellent experience, we had a wonderful footfall. Excellent organization and it was more than what we expected."
  },
  {
    name: "Mr. Subankar Chaudary",
    role: "CEO, One Moto",
    quote: "It's a great show. People normally have a tendency to trust something when it is real. When an expo with such scale is displayed, people get the confidence."
  },
  {
    name: "Shri Nitin Gadkari",
    role: "Union Minister",
    quote: "This Expo will provide exhibitors with a high-quality trading platform to expand business and help conduct technology exchange."
  },
  {
    name: "Dr. C.N. Ashwathnarayan",
    role: "Minister of Electronics & IT, Karnataka",
    quote: "Media Day Marketing is doing a fantastic job of organizing exhibitions. It is really appreciable. This is the way forward."
  },
  {
    name: "Shri Bhagwant Khuba",
    role: "Hon Minister of New & Renewable Energy",
    quote: "I have seen electric two wheelers, three wheelers, four wheelers - people have done their best in displaying here."
  },
  {
    name: "Shri Vijay Rupani",
    role: "Former Chief Minister, Gujarat",
    quote: "This expo will be a boon for all the stakeholders of the Transportation and Logistics Industry."
  }
];

export const stats = [
  { label: "Exhibitions", value: "30+", suffix: "" },
  { label: "Exhibitors", value: "1,500", suffix: "+" },
  { label: "Visitors", value: "11,000", suffix: "+" },
  { label: "Years Experience", value: "10", suffix: "+" }
];
