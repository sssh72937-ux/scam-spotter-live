import { useState } from "react";
import { Smartphone, Shield, AlertTriangle, CheckCircle, XCircle, Download, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type APKThreatLevel = "safe" | "warning" | "danger";

interface APKScanResult {
  appName: string;
  packageName: string;
  threatLevel: APKThreatLevel;
  riskScore: number;
  permissions: string[];
  threats: string[];
  recommendations: string[];
}

export const APKAnalyzer = () => {
  const [appInput, setAppInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<APKScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!appInput.trim()) {
      toast({
        title: "App Name Required",
        description: "Please enter an app name or package name",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    setTimeout(() => {
      const scanResult = analyzeAPK(appInput);
      setResult(scanResult);
      setIsScanning(false);
      
      toast({
        title: "Analysis Complete",
        description: `Risk level: ${scanResult.threatLevel}`,
        variant: scanResult.threatLevel === "safe" ? "default" : "destructive",
      });
    }, 2000);
  };

  const analyzeAPK = (input: string): APKScanResult => {
    const lowerInput = input.toLowerCase();
    
    // Fake app patterns
    const fakeAppPatterns = [
      "bank", "crypto", "wallet", "payment", "loan", "trading",
      "whatsapp", "telegram", "instagram", "facebook", "youtube"
    ];
    
    // Suspicious package patterns
    const suspiciousPackages = [
      "com.fake", "com.temp", "com.test", "app.clone", "fake.app"
    ];
    
    let threatLevel: APKThreatLevel = "safe";
    let riskScore = 10;
    let permissions: string[] = [];
    let threats: string[] = [];
    let recommendations: string[] = [];

    // Check for fake app indicators
    const fakeMatches = fakeAppPatterns.filter(pattern => lowerInput.includes(pattern));
    const suspiciousMatches = suspiciousPackages.filter(pattern => lowerInput.includes(pattern));

    if (fakeMatches.length > 0 || suspiciousMatches.length > 0) {
      threatLevel = "danger";
      riskScore = 85 + Math.random() * 10;
      
      permissions = [
        "READ_SMS",
        "RECEIVE_SMS", 
        "READ_CONTACTS",
        "CAMERA",
        "RECORD_AUDIO",
        "READ_PHONE_STATE",
        "ACCESS_FINE_LOCATION",
        "WRITE_EXTERNAL_STORAGE",
        "SYSTEM_ALERT_WINDOW",
        "DEVICE_ADMIN"
      ];
      
      threats = [
        "Requests excessive permissions",
        "Can access SMS and contacts",
        "May steal banking credentials",
        "Potential keylogger functionality",
        "Can make unauthorized calls",
        "Collects location data",
        "May install additional malware"
      ];
      
      recommendations = [
        "DO NOT INSTALL this app",
        "Download only from official app stores",
        "Verify app developer credentials",
        "Check app reviews and ratings",
        "Use official banking apps only",
        "Report to Google/Apple security"
      ];
    } else if (Math.random() > 0.6) {
      threatLevel = "warning";
      riskScore = 35 + Math.random() * 30;
      
      permissions = [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "READ_EXTERNAL_STORAGE",
        "CAMERA",
        "ACCESS_COARSE_LOCATION"
      ];
      
      threats = [
        "Unknown developer",
        "Limited app reviews",
        "Requests camera permissions",
        "May collect usage data",
        "No official verification"
      ];
      
      recommendations = [
        "Proceed with caution",
        "Review app permissions carefully",
        "Check developer reputation",
        "Consider alternatives from known developers",
        "Monitor app behavior after installation"
      ];
    } else {
      riskScore = 5 + Math.random() * 15;
      permissions = [
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ];
      
      threats = [];
      recommendations = [
        "App appears safe to install",
        "Standard permissions requested",
        "From verified developer"
      ];
    }

    return {
      appName: input,
      packageName: `com.${lowerInput.replace(/\s+/g, '').slice(0, 10)}.app`,
      threatLevel,
      riskScore: Math.round(riskScore),
      permissions,
      threats,
      recommendations
    };
  };

  const getThreatIcon = (level: APKThreatLevel) => {
    switch (level) {
      case "safe":
        return <CheckCircle className="h-6 w-6 text-security-safe" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-security-warning" />;
      case "danger":
        return <XCircle className="h-6 w-6 text-security-danger" />;
    }
  };

  const getThreatColor = (level: APKThreatLevel) => {
    switch (level) {
      case "safe":
        return "text-security-safe border-security-safe/20 bg-security-safe/10";
      case "warning":
        return "text-security-warning border-security-warning/20 bg-security-warning/10";
      case "danger":
        return "text-security-danger border-security-danger/20 bg-security-danger/10";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">APK Security Analyzer</h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Enter app name (e.g., WhatsApp, Banking App)"
              value={appInput}
              onChange={(e) => setAppInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleScan()}
              className="flex-1"
            />
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-gradient-primary"
            >
              {isScanning ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              <span className="ml-2">{isScanning ? "Analyzing..." : "Analyze"}</span>
            </Button>
          </div>
          
          <div className="bg-security-info/10 border border-security-info/20 rounded-lg p-3">
            <p className="text-sm text-security-info">
              ⚠️ Always download apps from official stores (Google Play, Apple App Store) to avoid malware.
            </p>
          </div>
        </div>
      </Card>

      {result && (
        <Card className={`p-6 border-2 ${getThreatColor(result.threatLevel)} animate-slide-in`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getThreatIcon(result.threatLevel)}
                <div>
                  <h3 className="font-semibold text-foreground">{result.appName}</h3>
                  <p className="text-sm text-muted-foreground">{result.packageName}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className={getThreatColor(result.threatLevel)}>
                  {result.threatLevel.toUpperCase()}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">Risk: {result.riskScore}%</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Permissions:</h4>
                <div className="max-h-32 overflow-y-auto">
                  {result.permissions.map((permission, index) => (
                    <div key={index} className="text-xs text-muted-foreground bg-muted/20 rounded px-2 py-1 mb-1">
                      {permission}
                    </div>
                  ))}
                </div>
              </div>

              {result.threats.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Security Risks:</h4>
                  <ul className="space-y-1 max-h-32 overflow-y-auto">
                    {result.threats.map((threat, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <div className="w-1 h-1 bg-security-danger rounded-full mt-2 flex-shrink-0" />
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Recommendations:</h4>
                <ul className="space-y-1 max-h-32 overflow-y-auto">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {result.threatLevel === "danger" && (
              <div className="bg-security-danger/10 border border-security-danger/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Ban className="h-5 w-5 text-security-danger" />
                  <p className="text-sm text-security-danger font-medium">
                    HIGH RISK: This app shows signs of malicious behavior. Do not install!
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};