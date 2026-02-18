import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Filter,
  Car,
  Battery,
  Zap,
  Building,
  Navigation,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { motion } from "framer-motion";
import { getAllPavilions, getPavilionsByCategory, searchPavilions } from "@/lib/dbService";
import { Pavilion } from "@/lib/types";

// Define types
type PavilionCategory = "2w" | "battery" | "charging" | "startups" | "4w" | "3w";

interface Position {
  x: number;
  y: number;
}

const categories: { value: PavilionCategory; label: string; icon: JSX.Element; color: string }[] = [
  { value: "2w", label: "Two-Wheelers", icon: <Car className="w-4 h-4" />, color: "bg-blue-500" },
  { value: "3w", label: "Three-Wheelers", icon: <Car className="w-4 h-4" />, color: "bg-purple-500" },
  { value: "4w", label: "Four-Wheelers", icon: <Car className="w-4 h-4" />, color: "bg-indigo-500" },
  { value: "battery", label: "Battery Tech", icon: <Battery className="w-4 h-4" />, color: "bg-yellow-500" },
  { value: "charging", label: "Charging", icon: <Zap className="w-4 h-4" />, color: "bg-green-500" },
  { value: "startups", label: "Startups", icon: <Building className="w-4 h-4" />, color: "bg-pink-500" },
];

const MOCK_PAVILIONS: Pavilion[] = [
  { id: "A1", name: "Tesla Motors", category: "4w", status: "occupied", coordinates: { x: 30, y: 30 }, size: "large", description: "Leading electric vehicle manufacturer showcasing Model S, 3, X, Y.", contact: "contact@tesla.com", technologies: ["Autopilot", "Supercharging"] },
  { id: "A2", name: "Ola Electric", category: "2w", status: "occupied", coordinates: { x: 60, y: 30 }, size: "medium", description: "India's #1 E-Scooter manufacturer.", contact: "sales@olaelectric.com", technologies: ["Hypercharging", "MoveOS"] },
  { id: "B1", name: "Ather Energy", category: "2w", status: "occupied", coordinates: { x: 45, y: 45 }, size: "medium", description: "Intelligent electric scooters.", contact: "info@ather.com", technologies: ["450X", "Fast Charging"] },
  { id: "B2", name: "Exide Industries", category: "battery", status: "occupied", coordinates: { x: 30, y: 60 }, size: "large", description: "Advanced battery solutions for EVs.", contact: "export@exide.com", technologies: ["Li-ion", "Battery Swapping"] },
  { id: "C1", name: "Tata Power", category: "charging", status: "occupied", coordinates: { x: 70, y: 60 }, size: "medium", description: "Largest EV charging network in India.", contact: "evcharging@tatapower.com", technologies: ["EZ Charge", "Fast Chargers"] },
  { id: "C2", name: "Mahindra Electric", category: "4w", status: "occupied", coordinates: { x: 50, y: 20 }, size: "large", description: "Pioneers of electric mobility in India.", contact: "support@mahindra.com", technologies: ["BE.05", "XUV400"] },
  { id: "D1", name: "Kinetic Green", category: "3w", status: "occupied", coordinates: { x: 20, y: 45 }, size: "medium", description: "Electric three-wheelers for last mile connectivity.", contact: "sales@kinetic.com", technologies: ["E-Rickshaw", "Loader"] },
  { id: "E1", name: "Bolt.Earth", category: "startups", status: "occupied", coordinates: { x: 80, y: 40 }, size: "small", description: "Smart EV charging infrastructure operating system.", contact: "hello@bolt.earth", technologies: ["OS", "IoT"] },
  { id: "E2", name: "Log9 Materials", category: "battery", status: "occupied", coordinates: { x: 60, y: 75 }, size: "small", description: "Advanced battery technology startup.", contact: "contact@log9.com", technologies: ["Rapid Charging", "Graphene"] },
];

export const InteractiveExpoMap = () => {
  // State for pavilions data
  const [pavilions, setPavilions] = useState<Pavilion[]>([]);
  const [loading, setLoading] = useState(true);

  // Load pavilions from database or mock
  useEffect(() => {
    const loadPavilions = async () => {
      setLoading(true);
      try {
        const result = await getAllPavilions();
        if (result.data && result.data.length > 0) {
          setPavilions(result.data);
        } else {
          // Fallback to mock data if DB is empty or fails
          console.log("Using mock data for map");
          setPavilions(MOCK_PAVILIONS as unknown as Pavilion[]);
        }
      } catch (e) {
        console.log("Error loading pavilions, using mock data", e);
        setPavilions(MOCK_PAVILIONS as unknown as Pavilion[]);
      } finally {
        setLoading(false);
      }
    };

    loadPavilions();
  }, []);

  const [activeTab, setActiveTab] = useState<"2d" | "3d">("2d");
  const [selectedCategory, setSelectedCategory] = useState<PavilionCategory | "all">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPavilion, setSelectedPavilion] = useState<Pavilion | null>(null);
  const [mapPosition, setMapPosition] = useState<Position>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [navigationMode, setNavigationMode] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Pavilion | null>(null);
  const [endPoint, setEndPoint] = useState<Pavilion | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  // Filter pavilions based on category and search term
  const filteredPavilions = pavilions.filter(pavilion => {
    const matchesCategory = selectedCategory === "all" || pavilion.category === selectedCategory;
    const matchesSearch = pavilion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pavilion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pavilion.technologies && pavilion.technologies.some(tech =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    return matchesCategory && matchesSearch;
  });

  // Handle pavilion click
  const handlePavilionClick = (pavilion: Pavilion) => {
    setSelectedPavilion(pavilion);

    if (navigationMode) {
      if (!startPoint) {
        setStartPoint(pavilion);
      } else if (!endPoint) {
        setEndPoint(pavilion);
      }
    }
  };

  // Reset navigation
  const resetNavigation = () => {
    setStartPoint(null);
    setEndPoint(null);
    setNavigationMode(false);
  };

  // Calculate distance between two pavilions (for navigation)
  const calculateDistance = (a: Pavilion, b: Pavilion) => {
    const dx = a.coordinates.x - b.coordinates.x;
    const dy = a.coordinates.y - b.coordinates.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle map drag (simplified for demo)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button

    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...mapPosition };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setMapPosition({
        x: startPos.x + dx,
        y: startPos.y + dy
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Zoom in/out functions
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const resetView = () => {
    setMapPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  // Get category color
  const getCategoryColor = (category: PavilionCategory) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : "bg-gray-500";
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Controls Panel */}
        <div className="w-full lg:w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal" />
                Expo Floor Map
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search exhibitor or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Category
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      variant={selectedCategory === cat.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`${selectedCategory === cat.value ? cat.color : ""}`}
                    >
                      {cat.icon}
                      <span className="ml-1">{cat.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Navigation Mode */}
              <div>
                <h3 className="font-medium mb-2">Navigation</h3>
                <div className="flex gap-2">
                  <Button
                    variant={navigationMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNavigationMode(!navigationMode)}
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate Me
                  </Button>
                  {navigationMode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetNavigation}
                    >
                      Reset
                    </Button>
                  )}
                </div>
                {navigationMode && startPoint && !endPoint && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Select destination pavilion
                  </p>
                )}
                {navigationMode && startPoint && endPoint && (
                  <div className="mt-2 p-2 bg-teal/10 rounded-md">
                    <p className="text-sm font-medium">Route:</p>
                    <p className="text-sm">
                      From: {startPoint.name} → To: {endPoint.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Distance: {calculateDistance(startPoint, endPoint).toFixed(2)} units
                    </p>
                  </div>
                )}
              </div>

              {/* View Controls */}
              <div>
                <h3 className="font-medium mb-2">View Controls</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetView}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Pavilion Info */}
          {selectedPavilion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(selectedPavilion.category)}`}></div>
                    {selectedPavilion.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{selectedPavilion.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPavilion.technologies?.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Contact:</span> {selectedPavilion.contact}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{categories.find(c => c.value === selectedPavilion.category)?.label}</Badge>
                      <Badge variant="outline">{selectedPavilion.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Map Area */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "2d" | "3d")}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="2d">2D Map</TabsTrigger>
              <TabsTrigger value="3d">3D View</TabsTrigger>
            </TabsList>

            <TabsContent value="2d" className="relative">
              <div
                ref={mapRef}
                className="relative w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-teal/10 to-emerald-500/10 rounded-lg border border-teal/30 overflow-hidden"
                onMouseDown={handleMouseDown}
              >
                {/* Grid background */}
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"></div>

                {/* Main halls */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-card/50 border border-dashed border-teal/30 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-medium">Main Exhibition Hall</span>
                </div>

                {/* Pavilions */}
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
                      <p className="mt-2 text-muted-foreground">Loading pavilions...</p>
                    </div>
                  </div>
                ) : (
                  filteredPavilions.map((pavilion) => {
                    const sizeClasses = {
                      small: "w-8 h-8",
                      medium: "w-12 h-12",
                      large: "w-16 h-16"
                    };

                    return (
                      <motion.div
                        key={pavilion.id}
                        className={`absolute cursor-pointer rounded-lg flex items-center justify-center border-2 ${selectedPavilion?.id === pavilion.id
                          ? "border-teal shadow-lg scale-110 z-10"
                          : "border-border hover:border-teal hover:shadow-md"
                          } ${sizeClasses[pavilion.size]} ${getCategoryColor(pavilion.category)} ${pavilion.status === "occupied" ? "bg-opacity-90" : "bg-opacity-50"
                          }`}
                        style={{
                          left: `${pavilion.coordinates.x}%`,
                          top: `${pavilion.coordinates.y}%`,
                          transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                        }}
                        onClick={() => handlePavilionClick(pavilion)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={pavilion.name}
                      >
                        <span className="text-xs font-bold text-white">
                          {pavilion.id}
                        </span>
                      </motion.div>
                    );
                  })
                )}

                {/* Navigation Path (if active) */}
                {startPoint && endPoint && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <line
                      x1={`${startPoint.coordinates.x}%`}
                      y1={`${startPoint.coordinates.y}%`}
                      x2={`${endPoint.coordinates.x}%`}
                      y2={`${endPoint.coordinates.y}%`}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="8,8"
                    />
                    <circle
                      cx={`${startPoint.coordinates.x}%`}
                      cy={`${startPoint.coordinates.y}%`}
                      r="6"
                      fill="#ef4444"
                    />
                    <circle
                      cx={`${endPoint.coordinates.x}%`}
                      cy={`${endPoint.coordinates.y}%`}
                      r="6"
                      fill="#22c55e"
                    />
                  </svg>
                )}

                {/* Zoom level indicator */}
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg border">
                  <span className="text-sm">Zoom: {Math.round(zoomLevel * 100)}%</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="3d" className="relative">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-teal/30 overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border">
                    <Building className="w-16 h-16 mx-auto text-teal mb-4" />
                    <h3 className="text-xl font-bold mb-2">3D Expo View</h3>
                    <p className="text-muted-foreground mb-4">
                      Interactive 3D representation of the expo floor
                    </p>
                    <Button variant="outline" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <div key={cat.value} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${cat.color}`}></div>
                <span className="text-sm">{cat.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border border-dashed border-gray-400"></div>
              <span className="text-sm">Exhibition Hall</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};