import { BookOpen, Users, Shield, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EducationSection = () => {
  const educationTopics = [
    {
      icon: <AlertCircle className="h-8 w-8 text-security-danger" />,
      title: "Common Phone Scams",
      description: "Learn to identify and avoid fake IRS calls, tech support scams, and robocall fraud",
      tips: [
        "Never give personal info over unsolicited calls",
        "Government agencies don't call demanding immediate payment",
        "Hang up and call back using official numbers"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-security-warning" />,
      title: "Website Safety",
      description: "How to spot phishing websites and avoid online fraud",
      tips: [
        "Check for HTTPS and proper SSL certificates",
        "Verify URLs match official websites exactly",
        "Be suspicious of urgent payment requests"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-security-info" />,
      title: "Social Engineering",
      description: "Protect yourself from manipulation tactics used by scammers",
      tips: [
        "Be wary of high-pressure tactics",
        "Verify identity through independent channels",
        "Take time to think before acting"
      ]
    }
  ];

  const recentScamTrends = [
    "AI-generated voice cloning for family emergency scams",
    "Cryptocurrency investment fraud on social media",
    "Fake delivery notifications with malicious links",
    "Romance scams using stolen photos and identities"
  ];

  return (
    <section id="education" className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Educated, Stay Safe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Knowledge is your best defense against scams. Learn about the latest tactics and how to protect yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {educationTopics.map((topic, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-background/50 rounded-full mb-4">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{topic.title}</h3>
                <p className="text-muted-foreground">{topic.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Key Safety Tips:</h4>
                <ul className="space-y-2">
                  {topic.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-card border-border shadow-card">
            <div className="flex items-start space-x-4">
              <BookOpen className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-4">Latest Scam Trends</h3>
                <p className="text-muted-foreground mb-6">
                  Stay ahead of evolving threats with insights into the newest scam techniques being used worldwide.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {recentScamTrends.map((trend, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-background/30 rounded-lg">
                      <div className="w-2 h-2 bg-security-warning rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{trend}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="default" className="bg-gradient-primary">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Download Safety Guide
                  </Button>
                  <Button variant="outline">
                    Subscribe to Alerts
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};