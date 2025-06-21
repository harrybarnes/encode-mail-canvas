
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Users, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

// Mock campaign data - in real app this would come from backend
const mockCampaigns = [
  {
    id: 1,
    name: "Product Demo Outreach",
    stage: "active",
    sent: 45,
    replies: 8,
    status: "In Progress",
    goal: "Get 10 product demos",
    audience: "B2B SaaS founders with 10-50 employees, looking to improve their sales process",
    progress: 80,
    createdAt: "2024-01-15",
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
  },
];

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const campaign = mockCampaigns.find(c => c.id === parseInt(id || ""));

  if (!campaign) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-slate-50 w-full">
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
                  <Button onClick={() => navigate("/")} variant="outline">
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

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              {/* Header with back button */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/")}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>

              {/* Campaign Header */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(campaign.stage)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-gray-600">Created on {new Date(campaign.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Edit Campaign
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Campaign Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                      <p className="text-gray-600 text-sm">Emails Sent</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{campaign.replies}</p>
                      <p className="text-gray-600 text-sm">Replies Received</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
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

              {/* Campaign Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Goal</h2>
                  <p className="text-gray-700">{campaign.goal}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Target Audience</h2>
                  <p className="text-gray-700">{campaign.audience}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
