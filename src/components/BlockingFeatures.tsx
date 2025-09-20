import { useState } from "react";
import { Shield, Ban, Phone, Smartphone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export const BlockingFeatures = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [blockedNumbers, setBlockedNumbers] = useState<string[]>([
    "+1-800-SCAM-123",
    "+1-555-FAKE-456", 
    "+91-9876543210"
  ]);
  const { toast } = useToast();

  const handleBlockNumber = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to block",
        variant: "destructive",
      });
      return;
    }

    if (blockedNumbers.includes(phoneNumber)) {
      toast({
        title: "Already Blocked",
        description: "This number is already in your blocked list",
        variant: "destructive",
      });
      return;
    }

    setBlockedNumbers([...blockedNumbers, phoneNumber]);
    setPhoneNumber("");
    
    toast({
      title: "Number Blocked",
      description: "Phone number added to block list successfully",
    });
  };

  const handleUnblock = (number: string) => {
    setBlockedNumbers(blockedNumbers.filter(n => n !== number));
    toast({
      title: "Number Unblocked",
      description: "Phone number removed from block list",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Ban className="h-6 w-6 text-security-danger" />
            <h3 className="text-lg font-semibold text-foreground">Auto-Block Controls</h3>
          </div>
          
          <div className="bg-security-warning/10 border border-security-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-security-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-security-warning mb-2">Backend Integration Required</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  To enable real auto-blocking of calls and messages, this app needs backend functionality through Supabase integration.
                </p>
                <p className="text-sm text-muted-foreground">
                  Current features show the interface for managing blocked numbers, but actual call/SMS blocking requires:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Database to store blocked numbers</li>
                  <li>• Edge functions for real-time threat detection</li>
                  <li>• Mobile app permissions (for device-level blocking)</li>
                  <li>• Integration with telecom APIs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Enter phone number to block (e.g., +1-234-567-8900)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleBlockNumber()}
              className="flex-1"
            />
            <Button
              onClick={handleBlockNumber}
              className="bg-security-danger hover:bg-security-danger/80"
            >
              <Ban className="h-4 w-4 mr-2" />
              Block
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium text-foreground">Blocked Numbers</h4>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              {blockedNumbers.length} blocked
            </Badge>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {blockedNumbers.map((number, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <span className="text-sm font-mono text-foreground">{number}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUnblock(number)}
                  className="text-xs"
                >
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-medium text-foreground">APK Auto-Protection</h4>
          </div>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Real-time APK Scanning</p>
                <p className="text-xs text-muted-foreground">Scan apps before installation</p>
              </div>
              <Badge variant="outline" className="text-security-safe">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-block Malicious Apps</p>
                <p className="text-xs text-muted-foreground">Prevent installation of known threats</p>
              </div>
              <Badge variant="outline" className="text-security-safe">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Source Verification</p>
                <p className="text-xs text-muted-foreground">Only allow official app stores</p>
              </div>
              <Badge variant="outline" className="text-security-safe">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};