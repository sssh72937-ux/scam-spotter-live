import { SecurityHeader } from "@/components/SecurityHeader";
import { HeroSection } from "@/components/HeroSection";
import { ThreatScanner } from "@/components/ThreatScanner";
import { MessageScanner } from "@/components/MessageScanner";
import { APKAnalyzer } from "@/components/APKAnalyzer";
import { BlockingFeatures } from "@/components/BlockingFeatures";
import { ThreatAlerts } from "@/components/ThreatAlerts";
import { EducationSection } from "@/components/EducationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SecurityHeader />
      <main>
        <HeroSection />
        
        <section id="scanner" className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Threat Detection</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Comprehensive protection against URLs, phone numbers, messages, and malicious apps
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <ThreatScanner />
                <MessageScanner />
              </div>
              <div className="space-y-6">
                <APKAnalyzer />
                <BlockingFeatures />
              </div>
            </div>
          </div>
        </section>

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