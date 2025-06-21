import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, Play, Rocket, Mail, Users, Calendar, Settings, CheckCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignDashboard } from "@/components/campaign/CampaignDashboard";
import { EmailTemplateSection } from "@/components/campaign/EmailTemplateSection";
import { LeadListSection } from "@/components/campaign/LeadListSection";
import { CampaignScheduleSection } from "@/components/campaign/CampaignScheduleSection";
import { DeleteCampaignDialog } from "@/components/campaign/DeleteCampaignDialog";

interface Campaign {
  id: string;
  name: string;
  stage: "draft" | "active" | "paused" | "completed";
  goal: string;
  startDate: string;
  endDate: string;
  audience: string;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
}

const mockCampaign: Campaign = {
  id: "1",
  name: "Summer Promotion",
  stage: "draft",
  goal: "500",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  audience: "Tech startup founders and CTOs",
};

const mockLeads: Lead[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", company: "TechCorp", title: "CEO" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", company: "InnoVision", title: "Marketing Manager" },
  { id: 3, name: "David Johnson", email: "david.johnson@example.com", company: "GlobalTech", title: "Sales Director" },
];

const launchTasks = [
  { id: 1, title: "Preparing Email Template" },
  { id: 2, title: "Analyzing Target Audience" },
  { id: 3, title: "Scheduling Campaign" },
  { id: 4, title: "Finalizing Settings" },
];

export default function CampaignDetails() {
  const navigate = useNavigate();
  const [mockCampaignState, setMockCampaignState] = useState<Campaign>(mockCampaign);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [hasEmailTemplate, setHasEmailTemplate] = useState(false);
  const readyToLaunch = currentTaskIndex === launchTasks.length;

  useEffect(() => {
    if (isLaunching && currentTaskIndex < launchTasks.length) {
      const timer = setTimeout(() => {
        setCurrentTaskIndex((prevIndex) => prevIndex + 1);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (isLaunching) {
      // Simulate campaign launch completion
      const completionTimer = setTimeout(() => {
        setIsLaunching(false);
        setMockCampaignState((prev) => ({ ...prev, stage: "active" }));
        setCurrentTaskIndex(0);
      }, 2000);

      return () => clearTimeout(completionTimer);
    }
  }, [isLaunching, currentTaskIndex]);

  const handleLaunch = async () => {
    setIsLaunching(true);
  };

  const handlePauseResume = async () => {
    setIsProcessing(true);
    // Simulate pause/resume process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMockCampaignState(prev => ({
      ...prev,
      stage: prev.stage === "active" ? "paused" : "active",
    }));
    setIsProcessing(false);
  };

  const handleCampaignUpdate = (updates: Partial<Campaign>) => {
    setMockCampaignState(prev => ({ ...prev, ...updates }));
  };

  const handleDeleteCampaign = () => {
    // Simulate campaign deletion
    navigate("/");
  };

  const handleLeadsUpdate = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
  };

  const handleTemplateChange = (hasTemplate: boolean) => {
    setHasEmailTemplate(hasTemplate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors animate-fade-in"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 animate-fade-in">
              {mockCampaignState.name}
            </h1>
            <Badge 
              variant={mockCampaignState.stage === "active" ? "default" : mockCampaignState.stage === "paused" ? "secondary" : "outline"}
              className="animate-fade-in"
            >
              {mockCampaignState.stage === "active" ? "Active" : 
               mockCampaignState.stage === "paused" ? "Paused" : 
               mockCampaignState.stage}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            {mockCampaignState.stage === "active" || mockCampaignState.stage === "paused" ? (
              <Button
                onClick={handlePauseResume}
                disabled={isProcessing}
                variant={mockCampaignState.stage === "active" ? "outline" : "default"}
                className={`transition-all duration-200 animate-fade-in ${
                  mockCampaignState.stage === "active" 
                    ? "border-orange-500 text-orange-600 hover:bg-orange-50" 
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {mockCampaignState.stage === "active" ? "Pausing..." : "Resuming..."}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {mockCampaignState.stage === "active" ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause Campaign
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Resume Campaign
                      </>
                    )}
                  </div>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleLaunch}
                disabled={isLaunching || !readyToLaunch}
                className="bg-green-600 hover:bg-green-700 transition-all duration-200 animate-fade-in"
              >
                {isLaunching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Launching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Launch Campaign
                  </div>
                )}
              </Button>
            )}
            <DeleteCampaignDialog 
              campaignName={mockCampaignState.name}
              onDelete={handleDeleteCampaign}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {mockCampaignState.stage === "active" || mockCampaignState.stage === "paused" ? (
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="activity" className="transition-all duration-200">
                Campaign Activity
              </TabsTrigger>
              <TabsTrigger value="settings" className="transition-all duration-200">
                Campaign Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="animate-fade-in">
              <CampaignDashboard campaign={mockCampaignState} leads={leads} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 animate-fade-in">
              <EmailTemplateSection 
                campaign={mockCampaignState} 
                onTemplateChange={handleTemplateChange}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadListSection 
                  campaign={mockCampaignState} 
                  onLeadsUpdate={handleLeadsUpdate}
                />
                <CampaignScheduleSection 
                  campaign={mockCampaignState} 
                  onUpdate={handleCampaignUpdate}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <>
            {isLaunching && (
              <Card className="mb-6 border-blue-200 bg-blue-50 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <h3 className="text-lg font-semibold text-blue-900">Launching Your Campaign</h3>
                  </div>
                  <div className="space-y-3">
                    {launchTasks.map((task, index) => (
                      <div 
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 animate-fade-in ${
                          currentTaskIndex > index ? 'bg-green-100 border border-green-200' :
                          currentTaskIndex === index ? 'bg-blue-100 border border-blue-200' :
                          'bg-white border border-gray-200'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {currentTaskIndex > index ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : currentTaskIndex === index ? (
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`font-medium ${
                          currentTaskIndex > index ? 'text-green-700' :
                          currentTaskIndex === index ? 'text-blue-700' :
                          'text-gray-600'
                        }`}>
                          {task.title}
                        </span>
                        {currentTaskIndex > index && (
                          <Badge variant="secondary" className="ml-auto animate-fade-in">
                            Complete
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ready to Launch Section */}
            {readyToLaunch && !isLaunching && (
              <Card className="mb-6 border-green-200 bg-green-50 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">Ready to Launch!</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Your campaign is configured and ready to go. Click the Launch Campaign button to start sending emails.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Email Template", icon: Mail },
                      { label: "Target Audience", icon: Users },
                      { label: "Schedule", icon: Calendar },
                      { label: "Settings", icon: Settings }
                    ].map((item, index) => (
                      <div 
                        key={item.label}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <item.icon className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campaign Configuration */}
            <div className="space-y-6">
              <EmailTemplateSection 
                campaign={mockCampaignState} 
                onTemplateChange={handleTemplateChange}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadListSection 
                  campaign={mockCampaignState} 
                  onLeadsUpdate={handleLeadsUpdate}
                />
                <CampaignScheduleSection 
                  campaign={mockCampaignState} 
                  onUpdate={handleCampaignUpdate}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
