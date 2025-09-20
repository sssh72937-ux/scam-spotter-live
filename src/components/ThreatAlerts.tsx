import { useState, useEffect } from "react";
import { AlertTriangle, Clock, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThreatAlert {
  id: string;
  type: "phone" | "website" | "email" | "sms" | "app" | "investment";
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  timestamp: Date;
  affectedUsers: number;
}

export const ThreatAlerts = () => {
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);

  useEffect(() => {
    // Simulate real-time alerts
    const mockAlerts: ThreatAlert[] = [
      {
        id: "1",
        type: "sms",
        title: "Fake Loan Approval Messages",
        description: "SMS messages claiming instant loan approval with suspicious links",
        severity: "high",
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        affectedUsers: 2156
      },
      {
        id: "2",
        type: "app",
        title: "Malicious Banking Apps",
        description: "Fake banking apps stealing login credentials on Play Store",
        severity: "high",
        timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
        affectedUsers: 1342
      },
      {
        id: "3",
        type: "investment",
        title: "Cryptocurrency Investment Scam",
        description: "Fake trading platforms promising guaranteed returns",
        severity: "high",
        timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
        affectedUsers: 987
      },
      {
        id: "4",
        type: "phone",
        title: "IRS Impersonation Scam",
        description: "Callers claiming to be from IRS demanding immediate payment",
        severity: "high",
        timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
        affectedUsers: 1247
      },
      {
        id: "5",
        type: "website",
        title: "Fake Banking Login Pages",
        description: "Phishing websites mimicking major bank login portals",
        severity: "high",
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        affectedUsers: 892
      },
      {
        id: "6",
        type: "sms",
        title: "Phishing SMS Campaign",
        description: "Messages claiming account suspension with malicious links",
        severity: "medium",
        timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
        affectedUsers: 3421
      },
      {
        id: "7",
        type: "investment",
        title: "Binary Options Scam",
        description: "Unregulated trading platforms targeting new investors",
        severity: "medium",
        timestamp: new Date(Date.now() - 42 * 60 * 1000), // 42 minutes ago
        affectedUsers: 654
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-security-danger border-security-danger/20 bg-security-danger/10";
      case "medium":
        return "text-security-warning border-security-warning/20 bg-security-warning/10";
      case "low":
        return "text-security-info border-security-info/20 bg-security-info/10";
      default:
        return "text-muted-foreground border-border bg-muted/10";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return "📞";
      case "website":
        return "🌐";
      case "email":
        return "📧";
      case "sms":
        return "💬";
      case "app":
        return "📱";
      case "investment":
        return "💰";
      default:
        return "⚠️";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <section id="alerts" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Real-Time Threat Alerts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest scam threats detected by our global monitoring system
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {alerts.map((alert, index) => (
            <Card 
              key={alert.id} 
              className="p-6 bg-gradient-card border-border shadow-card animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{alert.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{alert.affectedUsers.toLocaleString()} affected</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Trending</span>
                      </div>
                    </div>
                  </div>
                </div>
                <AlertTriangle className={`h-6 w-6 ${
                  alert.severity === "high" ? "text-security-danger" : 
                  alert.severity === "medium" ? "text-security-warning" : 
                  "text-security-info"
                } animate-pulse-glow`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Alerts updated every 30 seconds • Last update: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </section>
  );
};