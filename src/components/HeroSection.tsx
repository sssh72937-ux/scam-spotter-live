import { Shield, Phone, Globe, TrendingUp } from "lucide-react";
import { ThreatScanner } from "./ThreatScanner";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20 animate-pulse-glow">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Protect Yourself from
            <span className="text-transparent bg-gradient-primary bg-clip-text"> Scams</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time protection against fake calls, fraudulent websites, and online scams. 
            Stay safe with our advanced threat detection system.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-security-safe">50K+</div>
              <div className="text-sm text-muted-foreground">Scams Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-security-info">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Protection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-security-warning">99.9%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
            </div>
          </div>
        </div>
        
        {/* Threat Scanner */}
        <div className="max-w-2xl mx-auto">
          <ThreatScanner />
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-border shadow-card">
            <Phone className="h-10 w-10 text-security-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Fake Call Detection</h3>
            <p className="text-muted-foreground">Identify suspicious phone numbers and known scam callers</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-border shadow-card">
            <Globe className="h-10 w-10 text-security-danger mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Website Verification</h3>
            <p className="text-muted-foreground">Check URLs for phishing attempts and malicious content</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-card rounded-xl border border-border shadow-card">
            <TrendingUp className="h-10 w-10 text-security-info mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Alerts</h3>
            <p className="text-muted-foreground">Get instant notifications about emerging threats</p>
          </div>
        </div>
      </div>
    </section>
  );
};