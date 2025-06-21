
import { useParams } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { CampaignDashboard } from "@/components/campaign/CampaignDashboard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CampaignDetails = () => {
  const { id } = useParams();

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
          <CampaignDashboard campaignId={id} />
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
