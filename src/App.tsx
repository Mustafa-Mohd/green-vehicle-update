import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GreenVehicleExpo from "./pages/GreenVehicleExpo";
import AboutOrganizerPage from "./pages/AboutOrganizerPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";

import SponsorshipPage from "./pages/SponsorshipPage";
import ScrollToTop from "./components/ScrollToTop";
import { ChatBot } from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ChatBot />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events/green-vehicle-expo" element={<GreenVehicleExpo />} />
          <Route path="/events/green-vehicle-expo/about" element={<AboutOrganizerPage />} />
          <Route path="/events/green-vehicle-expo/sponsorship" element={<SponsorshipPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
