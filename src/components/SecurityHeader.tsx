import { Shield, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SecurityHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-xl font-bold text-foreground">ScamShield</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#scanner" className="text-muted-foreground hover:text-foreground transition-colors">
              Scanner
            </a>
            <a href="#alerts" className="text-muted-foreground hover:text-foreground transition-colors">
              Alerts
            </a>
            <a href="#education" className="text-muted-foreground hover:text-foreground transition-colors">
              Education
            </a>
            <a href="#report" className="text-muted-foreground hover:text-foreground transition-colors">
              Report
            </a>
          </nav>
          
          <Button variant="default" size="sm" className="bg-gradient-primary">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Scam
          </Button>
        </div>
      </div>
    </header>
  );
};