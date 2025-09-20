import { useState } from "react";
import { Search, Phone, Globe, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type ScanType = "url" | "phone";
type ThreatLevel = "safe" | "warning" | "danger";

interface ScanResult {
  input: string;
  type: ScanType;
  threatLevel: ThreatLevel;
  message: string;
  details: string[];
}

export const ThreatScanner = () => {
  const [input, setInput] = useState("");
  const [scanType, setScanType] = useState<ScanType>("url");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a URL or phone number to scan",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockResult = generateMockResult(input, scanType);
      setResult(mockResult);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete",
        description: `${mockResult.threatLevel === "safe" ? "No threats detected" : "Potential threat found"}`,
        variant: mockResult.threatLevel === "safe" ? "default" : "destructive",
      });
    }, 2000);
  };

  const generateMockResult = (input: string, type: ScanType): ScanResult => {
    // Mock threat detection logic
    const suspiciousPatterns = ["bank", "lottery", "winner", "urgent", "verify", "suspended"];
    const isSuspicious = suspiciousPatterns.some(pattern => 
      input.toLowerCase().includes(pattern)
    );

    if (isSuspicious) {
      return {
        input,
        type,
        threatLevel: "danger",
        message: "High Risk - Potential Scam Detected",
        details: [
          "Matches known phishing patterns",
          "Domain registered recently",
          "Reports from other users",
          "Suspicious redirect behavior"
        ]
      };
    }

    const isWarning = Math.random() > 0.7;
    
    if (isWarning) {
      return {
        input,
        type,
        threatLevel: "warning",
        message: "Medium Risk - Exercise Caution",
        details: [
          "Limited reputation data",
          "Some user reports",
          "Recently registered domain"
        ]
      };
    }

    return {
      input,
      type,
      threatLevel: "safe",
      message: "Low Risk - Appears Safe",
      details: [
        "Clean reputation",
        "No reports found",
        "Verified SSL certificate",
        "Established online presence"
      ]
    };
  };

  const getThreatIcon = (level: ThreatLevel) => {
    switch (level) {
      case "safe":
        return <CheckCircle className="h-6 w-6 text-security-safe" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-security-warning" />;
      case "danger":
        return <XCircle className="h-6 w-6 text-security-danger" />;
    }
  };

  const getThreatColor = (level: ThreatLevel) => {
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
          <div className="flex justify-center space-x-4">
            <Button
              variant={scanType === "url" ? "default" : "outline"}
              onClick={() => setScanType("url")}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>Website URL</span>
            </Button>
            <Button
              variant={scanType === "phone" ? "default" : "outline"}
              onClick={() => setScanType("phone")}
              className="flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Button>
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder={scanType === "url" ? "Enter website URL (e.g., https://example.com)" : "Enter phone number (e.g., +1-234-567-8900)"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2">{isScanning ? "Scanning..." : "Scan"}</span>
            </Button>
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
                  <h3 className="font-semibold text-foreground">{result.message}</h3>
                  <p className="text-sm text-muted-foreground">{result.input}</p>
                </div>
              </div>
              <Badge variant="outline" className={getThreatColor(result.threatLevel)}>
                {result.threatLevel.toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Analysis Details:</h4>
              <ul className="space-y-1">
                {result.details.map((detail, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.threatLevel === "danger" && (
              <div className="bg-security-danger/10 border border-security-danger/20 rounded-lg p-3">
                <p className="text-sm text-security-danger font-medium">
                  ⚠️ Warning: This appears to be a potential scam. Do not provide personal information or click any links.
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};