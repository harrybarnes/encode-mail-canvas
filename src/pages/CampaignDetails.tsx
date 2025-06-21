import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Users, Clock, Send, Mail, Edit, Save, X, Rocket, Pause, Loader, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EmailTemplateSection } from "@/components/campaign/EmailTemplateSection";
import { LeadListSection } from "@/components/campaign/LeadListSection";
import { CampaignScheduleSection } from "@/components/campaign/CampaignScheduleSection";
import { CampaignDashboard } from "@/components/campaign/CampaignDashboard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { DeleteCampaignDialog } from "@/components/campaign/DeleteCampaignDialog";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
}

// Mock campaign data - in real app this would come from backend
const mockCampaigns = [
  {
    id: 1,
    name: "Product Demo Outreach",
    stage: "draft",
    sent: 0,
    replies: 0,
    status: "Draft",
    goal: "Get 10 product demos",
    audience: "B2B SaaS founders with 10-50 employees, looking to improve their sales process",
    progress: 20,
    createdAt: "2024-01-15",
    startDate: "",
    endDate: "",
  },
  {
    id: 2,
    name: "Partnership Proposals",
    stage: "draft",
    sent: 0,
    replies: 0,
    status: "Draft",
    goal: "Secure 3 partnerships",
    audience: "Marketing agencies with complementary services",
    progress: 20,
    createdAt: "2024-01-20",
    startDate: "",
    endDate: "",
  },
];

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [campaign, setCampaign] = useState(() => 
    mockCampaigns.find(c => c.id === parseInt(id || ""))
  );
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingAudience, setIsEditingAudience] = useState(false);
  const [draftGoal, setDraftGoal] = useState(campaign?.goal || "");
  const [draftAudience, setDraftAudience] = useState(campaign?.audience || "");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasEmailTemplate, setHasEmailTemplate] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  if (!campaign) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-slate-50 w-full">
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">
                <div className="text-center animate-fade-in">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
                  <Button onClick={() => navigate("/")} variant="outline" className="transition-all duration-200 hover:scale-105">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "draft": return "bg-gray-100 text-gray-600";
      case "active": return "bg-blue-100 text-blue-600";
      case "paused": return "bg-yellow-100 text-yellow-600";
      case "completed": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const saveGoal = () => {
    setCampaign(prev => prev ? { ...prev, goal: draftGoal } : null);
    setIsEditingGoal(false);
    toast({
      title: "Goal updated",
      description: "Campaign goal has been successfully updated.",
    });
  };

  const cancelGoalEdit = () => {
    setDraftGoal(campaign?.goal || "");
    setIsEditingGoal(false);
  };

  const startGoalEdit = () => {
    setDraftGoal(campaign?.goal || "");
    setIsEditingGoal(true);
  };

  const saveAudience = () => {
    setCampaign(prev => prev ? { ...prev, audience: draftAudience } : null);
    setIsEditingAudience(false);
    toast({
      title: "Audience updated",
      description: "Target audience has been successfully updated.",
    });
  };

  const cancelAudienceEdit = () => {
    setDraftAudience(campaign?.audience || "");
    setIsEditingAudience(false);
  };

  const startAudienceEdit = () => {
    setDraftAudience(campaign?.audience || "");
    setIsEditingAudience(true);
  };

  const handleScheduleUpdate = (startDate: string, endDate: string) => {
    setCampaign(prev => prev ? { ...prev, startDate, endDate } : null);
    toast({
      title: "Schedule updated",
      description: "Campaign schedule has been successfully updated.",
    });
  };

  const handleLeadsUpdate = (newLeads: Lead[]) => {
    setLeads(newLeads);
  };

  const handleEmailTemplateUpdate = (hasTemplate: boolean) => {
    setHasEmailTemplate(hasTemplate);
  };

  const hasSchedule = campaign.startDate && campaign.endDate;
  const canLaunchCampaign = campaign.stage === "draft" && hasEmailTemplate && leads.length > 0 && hasSchedule;

  const launchCampaign = async () => {
    setIsLaunching(true);
    
    // Simulate campaign launch process
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setCampaign(prev => prev ? { 
      ...prev, 
      stage: "active", 
      status: "In Progress",
      progress: 30
    } : null);
    
    setIsLaunching(false);
    toast({
      title: "Campaign Launched! 🚀",
      description: "Your campaign is now live and emails are being sent.",
    });
  };

  const pauseCampaign = () => {
    setCampaign(prev => prev ? { 
      ...prev, 
      stage: "paused", 
      status: "Paused"
    } : null);
    
    toast({
      title: "Campaign Paused",
      description: "Your campaign has been paused. You can resume it anytime.",
    });
  };

  const resumeCampaign = () => {
    setCampaign(prev => prev ? { 
      ...prev, 
      stage: "active", 
      status: "In Progress"
    } : null);
    
    toast({
      title: "Campaign Resumed",
      description: "Your campaign is now active and running again.",
    });
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-slate-50 w-full">
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 space-y-6 animate-fade-in">
                {/* Header with back button */}
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/")}
                    className="hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>

                {/* Campaign Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getStageColor(campaign.stage)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-gray-600">Created on {new Date(campaign.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-3">
                      <DeleteCampaignDialog 
                        campaignName={campaign.name} 
                        campaignId={campaign.id} 
                      />
                      {campaign.stage === "draft" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Button 
                                onClick={launchCampaign}
                                disabled={isLaunching || !canLaunchCampaign}
                                className={`transition-all duration-300 ${
                                  canLaunchCampaign 
                                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105" 
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {isLaunching ? (
                                  <>
                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    Launching Campaign...
                                  </>
                                ) : (
                                  <>
                                    <Rocket className="w-4 h-4 mr-2" />
                                    Launch Campaign
                                  </>
                                )}
                              </Button>
                            </div>
                          </TooltipTrigger>
                          {!canLaunchCampaign && (
                            <TooltipContent>
                              <p>Complete all setup requirements below to launch your campaign</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )}
                      {campaign.stage === "active" && (
                        <Button onClick={pauseCampaign} variant="outline" className="transition-all duration-200 hover:scale-105">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Campaign
                        </Button>
                      )}
                      {campaign.stage === "paused" && (
                        <Button onClick={resumeCampaign} className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                          <Rocket className="w-4 h-4 mr-2" />
                          Resume Campaign
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Campaign Goal and Audience in Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Campaign Goal */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Campaign Goal</h3>
                        {!isEditingGoal && (
                          <Button onClick={startGoalEdit} variant="ghost" size="sm" className="transition-all duration-200 hover:scale-110">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {isEditingGoal ? (
                        <div className="space-y-3 animate-fade-in">
                          <Input
                            value={draftGoal}
                            onChange={(e) => setDraftGoal(e.target.value)}
                            className="w-full transition-all duration-200 focus:scale-[1.02]"
                            placeholder="Enter campaign goal..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={saveGoal} size="sm" className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={cancelGoalEdit} size="sm" variant="outline" className="transition-all duration-200 hover:scale-105">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100">{campaign.goal}</p>
                      )}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Target Audience</h3>
                        {!isEditingAudience && (
                          <Button onClick={startAudienceEdit} variant="ghost" size="sm" className="transition-all duration-200 hover:scale-110">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {isEditingAudience ? (
                        <div className="space-y-2 animate-fade-in">
                          <Textarea
                            value={draftAudience}
                            onChange={(e) => setDraftAudience(e.target.value)}
                            className="min-h-[80px] transition-all duration-200 focus:scale-[1.02]"
                            placeholder="Describe your target audience..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={saveAudience} size="sm" className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={cancelAudienceEdit} size="sm" variant="outline" className="transition-all duration-200 hover:scale-105">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100">{campaign.audience}</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Campaign Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Launch Requirements */}
                  {campaign.stage === "draft" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
                      <h4 className="font-medium text-blue-900 mb-3">Ready to Launch?</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]">
                          {hasEmailTemplate ? (
                            <Check className="w-5 h-5 text-green-500 animate-scale-in" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={hasEmailTemplate ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            Email template created
                          </span>
                        </div>
                        <div className="flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]">
                          {leads.length > 0 ? (
                            <Check className="w-5 h-5 text-green-500 animate-scale-in" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={leads.length > 0 ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            Target audience generated ({leads.length} leads)
                          </span>
                        </div>
                        <div className="flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]">
                          {hasSchedule ? (
                            <Check className="w-5 h-5 text-green-500 animate-scale-in" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={hasSchedule ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            Campaign schedule configured
                          </span>
                        </div>
                      </div>
                      {!canLaunchCampaign && (
                        <p className="text-xs text-blue-700 mt-3 italic">
                          Complete all requirements above to launch your campaign
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Launching Animation */}
                {isLaunching && (
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center animate-scale-in">
                    <div className="flex flex-col items-center space-y-4">
                      <Loader className="w-16 h-16 text-blue-500 animate-spin" />
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">Launching Your Campaign...</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="animate-fade-in">✓ Validating email templates</p>
                          <p className="animate-fade-in" style={{ animationDelay: '0.5s' }}>✓ Preparing lead list ({leads.length} contacts)</p>
                          <p className="animate-fade-in" style={{ animationDelay: '1s' }}>✓ Setting up delivery schedule</p>
                          <p className="animate-fade-in" style={{ animationDelay: '1.5s' }}>✓ Initializing tracking systems</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Campaign Dashboard for Active and Paused Campaigns */}
                {(campaign.stage === "active" || campaign.stage === "paused") && (
                  <div className="animate-fade-in">
                    <CampaignDashboard campaign={campaign} leads={leads} />
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 hover:scale-110">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                        <p className="text-gray-600 text-sm">Emails Sent</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 hover:scale-110">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{campaign.replies}</p>
                        <p className="text-gray-600 text-sm">Replies Received</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 hover:scale-110">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {campaign.sent > 0 ? ((campaign.replies / campaign.sent) * 100).toFixed(1) : '0'}%
                        </p>
                        <p className="text-gray-600 text-sm">Reply Rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Template Section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <EmailTemplateSection 
                    campaign={campaign} 
                    onTemplateChange={handleEmailTemplateUpdate}
                  />
                </div>

                {/* Lead List Section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <LeadListSection 
                    campaign={campaign} 
                    onLeadsUpdate={handleLeadsUpdate}
                  />
                </div>

                {/* Campaign Schedule Section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CampaignScheduleSection
                    startDate={campaign.startDate}
                    endDate={campaign.endDate}
                    onScheduleUpdate={handleScheduleUpdate}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
