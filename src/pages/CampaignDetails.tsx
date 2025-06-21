
import { useParams } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { CampaignDashboard } from "@/components/campaign/CampaignDashboard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();

  // Mock campaign data based on the ID
  const mockCampaign = {
    id: Number(id),
    name: `Campaign ${id}`,
    status: "active",
    stage: "active",
    goal: "Get 10 product demos",
    audience: "B2B SaaS founders with 10-50 employees",
    created: "2024-01-15",
    lastActivity: "2 hours ago"
  };

  // Mock leads data
  const mockLeads = [
    { id: 1, name: "John Doe", email: "john@example.com", company: "TechCorp", title: "CEO" },
    { id: 2, name: "Sarah Johnson", email: "sarah@startup.com", company: "StartupXYZ", title: "CTO" },
    { id: 3, name: "Mike Chen", email: "mike@innovate.com", company: "InnovateLabs", title: "Founder" },
    { id: 4, name: "Lisa Park", email: "lisa@growth.com", company: "GrowthCo", title: "VP Sales" },
    { id: 5, name: "David Wilson", email: "david@scale.com", company: "ScaleTech", title: "Head of Marketing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/campaigns">
            <Button variant="ghost" size="sm" className="hover:bg-gray-50 rounded-xl text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
          </Link>
        </div>

        {/* Campaign Dashboard */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <CampaignDashboard campaign={mockCampaign} leads={mockLeads} />
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
