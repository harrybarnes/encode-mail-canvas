import { useState } from "react";
import { Plus, Search, Filter, Grid3X3, List, Calendar, Users, Target, MoreVertical } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewCampaignForm } from "@/components/forms/NewCampaignForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    name: "Q4 Product Launch",
    status: "active",
    leads: 1250,
    sent: 850,
    opens: 340,
    clicks: 85,
    replies: 12,
    created: "2024-01-15",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Summer Promotion",
    status: "completed",
    leads: 2100,
    sent: 1800,
    opens: 950,
    clicks: 240,
    replies: 45,
    created: "2023-06-20",
    lastActivity: "5 months ago"
  },
  {
    id: 3,
    name: "New Year Campaign",
    status: "draft",
    leads: 0,
    sent: 0,
    opens: 0,
    clicks: 0,
    replies: 0,
    created: "2024-02-01",
    lastActivity: "never"
  },
  {
    id: 4,
    name: "Spring Sale",
    status: "paused",
    leads: 800,
    sent: 600,
    opens: 280,
    clicks: 60,
    replies: 8,
    created: "2023-03-10",
    lastActivity: "3 weeks ago"
  },
  {
    id: 5,
    name: "Black Friday Deals",
    status: "active",
    leads: 3200,
    sent: 2900,
    opens: 1500,
    clicks: 420,
    replies: 72,
    created: "2023-11-01",
    lastActivity: "yesterday"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-50 text-green-700 border-green-200";
    case "paused": return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "draft": return "bg-gray-50 text-gray-700 border-gray-200";
    case "completed": return "bg-blue-50 text-blue-700 border-blue-200";
    default: return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const Campaigns = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Campaigns</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your email campaigns</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border border-gray-100 rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">Create New Campaign</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Set up a new email campaign to reach your leads
                </DialogDescription>
              </DialogHeader>
              <NewCampaignForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-0 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all text-sm placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-gray-200 bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-100 rounded-xl">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Campaigns</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("paused")}>Paused</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
                className={`rounded-lg ${view === "grid" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className={`rounded-lg ${view === "list" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 hover:text-black transition-colors">
                      <Link to={`/campaign/${campaign.id}`}>{campaign.name}</Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Created {new Date(campaign.created).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs font-medium border rounded-full px-2 py-1 ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-50 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-100 rounded-xl">
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Pause</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{campaign.leads.toLocaleString()} leads</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>{campaign.sent.toLocaleString()} sent</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-gray-600">
                      {campaign.opens} opens
                    </div>
                    <div className="text-gray-600">
                      {campaign.clicks} clicks
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Last activity: {campaign.lastActivity}
                  </span>
                  <div className="text-xs text-gray-500">
                    {campaign.replies} replies
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first campaign to get started"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white border border-gray-100 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">Create New Campaign</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Set up a new email campaign to reach your leads
                    </DialogDescription>
                  </DialogHeader>
                  <NewCampaignForm />
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Campaigns;
