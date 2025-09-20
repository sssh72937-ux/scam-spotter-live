import { useState } from "react";
import { MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type MessageThreatLevel = "safe" | "warning" | "danger";

interface MessageScanResult {
  message: string;
  threatLevel: MessageThreatLevel;
  scamType: string;
  confidence: number;
  details: string[];
  recommendations: string[];
}

export const MessageScanner = () => {
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<MessageScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    setTimeout(() => {
      const scanResult = analyzeMessage(message);
      setResult(scanResult);
      setIsScanning(false);
      
      toast({
        title: "Analysis Complete",
        description: `${scanResult.threatLevel === "safe" ? "Message appears safe" : "Potential scam detected"}`,
        variant: scanResult.threatLevel === "safe" ? "default" : "destructive",
      });
    }, 1500);
  };

  const analyzeMessage = (text: string): MessageScanResult => {
    const lowerText = text.toLowerCase();
    
    // Loan scam patterns
    const loanScamPatterns = [
      "instant loan", "guaranteed approval", "no credit check", "urgent loan",
      "loan approved", "apply now", "low interest", "emergency funds"
    ];
    
    // Investment scam patterns
    const investmentScamPatterns = [
      "guaranteed returns", "risk-free investment", "double your money",
      "exclusive opportunity", "limited time offer", "high returns",
      "cryptocurrency investment", "trading bot", "forex trading"
    ];
    
    // General scam indicators
    const urgencyPatterns = [
      "urgent", "immediate", "expire today", "act now", "limited time",
      "last chance", "don't miss out", "hurry"
    ];
    
    const suspiciousPatterns = [
      "verify account", "suspended", "click here", "update details",
      "confirm identity", "security alert", "unusual activity"
    ];

    let threatLevel: MessageThreatLevel = "safe";
    let scamType = "None detected";
    let confidence = 0;
    let details: string[] = [];
    let recommendations: string[] = [];

    // Check for loan scams
    const loanMatches = loanScamPatterns.filter(pattern => lowerText.includes(pattern));
    if (loanMatches.length > 0) {
      threatLevel = "danger";
      scamType = "Loan Application Scam";
      confidence = Math.min(90, loanMatches.length * 30);
      details = [
        "Contains loan scam keywords",
        "Promises guaranteed approval",
        "May request upfront fees",
        "Targets desperate borrowers"
      ];
      recommendations = [
        "Never pay upfront fees for loans",
        "Verify lender with financial authorities",
        "Check official bank websites directly",
        "Report to cybercrime authorities"
      ];
    }
    
    // Check for investment scams
    const investmentMatches = investmentScamPatterns.filter(pattern => lowerText.includes(pattern));
    if (investmentMatches.length > 0) {
      threatLevel = "danger";
      scamType = "Investment/Trading Scam";
      confidence = Math.min(95, investmentMatches.length * 35);
      details = [
        "Promises unrealistic returns",
        "Uses high-pressure tactics",
        "May be a Ponzi scheme",
        "Targets inexperienced investors"
      ];
      recommendations = [
        "Research investment thoroughly",
        "Verify with financial regulators",
        "Never invest under pressure",
        "Consult licensed financial advisors"
      ];
    }
    
    // Check for urgency + suspicious patterns
    const urgencyMatches = urgencyPatterns.filter(pattern => lowerText.includes(pattern));
    const suspiciousMatches = suspiciousPatterns.filter(pattern => lowerText.includes(pattern));
    
    if (urgencyMatches.length > 0 && suspiciousMatches.length > 0) {
      if (threatLevel === "safe") {
        threatLevel = "warning";
        scamType = "Phishing/Social Engineering";
        confidence = Math.min(80, (urgencyMatches.length + suspiciousMatches.length) * 20);
        details = [
          "Creates false urgency",
          "Requests personal information",
          "May lead to identity theft",
          "Uses social engineering tactics"
        ];
        recommendations = [
          "Don't click any links",
          "Verify through official channels",
          "Don't share personal information",
          "Report as spam/phishing"
        ];
      }
    }

    return {
      message: text,
      threatLevel,
      scamType,
      confidence,
      details,
      recommendations
    };
  };

  const getThreatIcon = (level: MessageThreatLevel) => {
    switch (level) {
      case "safe":
        return <CheckCircle className="h-6 w-6 text-security-safe" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-security-warning" />;
      case "danger":
        return <XCircle className="h-6 w-6 text-security-danger" />;
    }
  };

  const getThreatColor = (level: MessageThreatLevel) => {
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
            <MessageSquare className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Message Scam Analyzer</h3>
          </div>
          
          <Textarea
            placeholder="Paste the suspicious message, SMS, or email content here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-gradient-primary"
          >
            {isScanning ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            <span className="ml-2">{isScanning ? "Analyzing..." : "Analyze Message"}</span>
          </Button>
        </div>
      </Card>

      {result && (
        <Card className={`p-6 border-2 ${getThreatColor(result.threatLevel)} animate-slide-in`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getThreatIcon(result.threatLevel)}
                <div>
                  <h3 className="font-semibold text-foreground">{result.scamType}</h3>
                  <p className="text-sm text-muted-foreground">Confidence: {result.confidence}%</p>
                </div>
              </div>
              <Badge variant="outline" className={getThreatColor(result.threatLevel)}>
                {result.threatLevel.toUpperCase()}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Threat Indicators:</h4>
                <ul className="space-y-1">
                  {result.details.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Recommendations:</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};