import { Footer } from "@/components/Footer";
import { AboutOrganizer } from "@/components/AboutOrganizer";
import { GreenVehicleExpoHeader } from "@/components/GreenVehicleExpoHeader";

const AboutOrganizerPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <GreenVehicleExpoHeader />
      <main>
        <AboutOrganizer />
      </main>
      <Footer />
    </div>
  );
};

export default AboutOrganizerPage;