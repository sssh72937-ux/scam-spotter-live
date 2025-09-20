import { SecurityHeader } from "@/components/SecurityHeader";
import { HeroSection } from "@/components/HeroSection";
import { ThreatAlerts } from "@/components/ThreatAlerts";
import { EducationSection } from "@/components/EducationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SecurityHeader />
      <main>
        <HeroSection />
        <ThreatAlerts />
        <EducationSection />
      </main>
      
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 ScamShield. Protecting users from online threats 24/7.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Report suspicious activity: report@scamshield.com | Emergency: 1-800-SCAM-HELP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;