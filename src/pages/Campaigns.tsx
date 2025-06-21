import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Clock, Send, MessageSquare, CheckCircle, Plus, Filter, Search, Calendar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewCampaignForm } from "@/components/forms/NewCampaignForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: number;
  name: string;
  stage: string;
  sent: number;
  replies: number;
  status: string;
  goal: string;
  progress: number;
  createdAt: string;
  replyRate: number;
}

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Product Demo Outreach",
    stage: "active",
    sent: 45,
    replies: 8,
    status: "In Progress",
    goal: "Get 10 product demos",
    progress: 80,
    createdAt: "2024-01-15",
    replyRate: 17.8,
  },
  {
    id: 2,
    name: "Partnership Proposals", 
    stage: "draft",
    sent: 0,
    replies: 0,
    status: "Draft",
    goal: "Secure 3 partnerships",
    progress: 20,
    createdAt: "2024-01-20",
    replyRate: 0,
  },
  {
    id: 3,
    name: "Investor Outreach",
    stage: "paused",
    sent: 120,
    replies: 15,
    status: "Paused",
    goal: "Connect with 20 investors",
    progress: 60,
    createdAt: "2024-01-10",
    replyRate: 12.5,
  },
  {
    id: 4,
    name: "Customer Success",
    stage: "completed",
    sent: 200,
    replies: 45,
    status: "Completed",
    goal: "Improve retention by 15%",
    progress: 100,
    createdAt: "2024-01-05",
    replyRate: 22.5,
  },
];

const getStageIcon = (stage: string) => {
  switch (stage) {
    case "draft": return Clock;
    case "active": return Send;
    case "paused": return MessageSquare;
    case "completed": return CheckCircle;
    default: return Target;
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "draft": return "bg-gray-100 text-gray-600";
    case "active": return "bg-blue-100 text-blue-600";
    case "paused": return "bg-yellow-100 text-yellow-600";
    case "completed": return "bg-green-100 text-green-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const getBadgeVariant = (stage: string) => {
  switch (stage) {
    case "active": return "default";
    case "completed": return "secondary";
    case "paused": return "outline";
    case "draft": return "outline";
    default: return "outline";
  }
};

const getBadgeClassName = (stage: string) => {
  switch (stage) {
    case "active": return "bg-blue-100 text-blue-600 hover:bg-blue-200";
    case "completed": return "bg-green-100 text-green-600 hover:bg-green-200";
    case "paused": return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200";
    case "draft": return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    default: return "";
  }
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateCampaign = (campaignData: { name: string; goal: string; audience: string }) => {
    const newCampaign: Campaign = {
      id: Math.max(...campaigns.map(c => c.id)) + 1,
      name: campaignData.name,
      stage: "draft",
      sent: 0,
      replies: 0,
      status: "Draft",
      goal: campaignData.goal,
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
      replyRate: 0,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsDialogOpen(false);
  };

  const handleCampaignClick = (campaignId: number) => {
    navigate(`/campaign/${campaignId}`);
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.goal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.stage === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "progress": return b.progress - a.progress;
        case "replyRate": return b.replyRate - a.replyRate;
        case "recent":
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.stage === "active").length,
    draft: campaigns.filter(c => c.stage === "draft").length,
    completed: campaigns.filter(c => c.stage === "completed").length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-8 space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">Campaigns</h1>
                  <p className="text-gray-600 text-lg">
                    Manage and track all your cold email campaigns
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <NewCampaignForm
                      onSubmit={handleCreateCampaign}
                      onCancel={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-900">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-gray-600 text-sm font-medium">Total Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-700">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                        <p className="text-gray-600 text-sm font-medium">Active Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-500">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.draft}</p>
                        <p className="text-gray-600 text-sm font-medium">Draft Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-800">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                        <p className="text-gray-600 text-sm font-medium">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card className="glass-card rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">All Campaigns</CardTitle>
                  <CardDescription className="text-gray-600">
                    Search, filter, and manage your campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search campaigns..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 rounded-xl border-gray-200 focus:ring-black/10 h-12"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-gray-200 h-12">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-gray-200 h-12">
                        <Calendar className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50">
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="replyRate">Reply Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campaigns Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => {
                      const StageIcon = getStageIcon(campaign.stage);
                      return (
                        <Card
                          key={campaign.id}
                          className="glass-card rounded-2xl border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                          onClick={() => handleCampaignClick(campaign.id)}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className={`p-2 rounded-xl ${getStageColor(campaign.stage)}`}>
                                <StageIcon className="w-4 h-4" />
                              </div>
                              <Badge 
                                variant={getBadgeVariant(campaign.stage)}
                                className={`${getBadgeClassName(campaign.stage)} rounded-lg font-medium`}
                              >
                                {campaign.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-gray-700 transition-colors font-bold">
                              {campaign.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                              {campaign.goal}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between text-sm text-gray-600 font-medium">
                                <span>📤 {campaign.sent} sent</span>
                                <span>💬 {campaign.replies} replies</span>
                                <span>📊 {campaign.replyRate}%</span>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                  <span>Progress</span>
                                  <span>{campaign.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${campaign.progress}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="text-xs text-gray-500 font-medium">
                                Created on {new Date(campaign.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Empty state */}
                  {filteredCampaigns.length === 0 && (
                    <div className="text-center py-16">
                      <Target className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">No campaigns found</h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        {searchTerm || statusFilter !== "all" 
                          ? "Try adjusting your search or filter criteria"
                          : "Create your first campaign to get started"
                        }
                      </p>
                      {!searchTerm && statusFilter === "all" && (
                        <Button 
                          onClick={() => setIsDialogOpen(true)}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Campaign
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
